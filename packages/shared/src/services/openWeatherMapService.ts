/**
 * OpenWeatherMap API Service Implementation
 * 
 * This file implements the weather service interface using the OpenWeatherMap API.
 * It provides concrete implementations for fetching weather data from OpenWeatherMap.
 */

import { 
  BaseWeatherService, 
  WeatherServiceOptions,
  WeatherServiceResponse,
  WeatherServiceErrorType
} from './weatherService';
import { 
  CompleteWeatherData, 
  CurrentWeather,
  CalculatedWeatherMetrics,
  DailyForecast,
  ForecastDataPoint,
  Location,
  // WeatherApiResponse is used as a type in the rawResponse property
  type WeatherApiResponse
} from '../types/weather';

/**
 * OpenWeatherMap API specific options
 */
export interface OpenWeatherMapOptions extends WeatherServiceOptions {
  /** Base URL for the OpenWeatherMap API */
  baseUrl?: string;
}

/**
 * OpenWeatherMap API service implementation
 */
export class OpenWeatherMapService extends BaseWeatherService {
  /**
   * Create a new OpenWeatherMapService instance
   * 
   * @param options - Service options
   */
  constructor(options: OpenWeatherMapOptions) {
    super({
      ...options,
      baseUrl: options.baseUrl || 'https://api.openweathermap.org/data/3.0'
    });
  }

  /**
   * Get weather data by location name
   * 
   * @param locationName - Location name to get weather for
   * @returns Promise resolving to weather service response
   */
  async getWeatherByLocationName(locationName: string): Promise<WeatherServiceResponse> {
    const cacheKey = this.getCacheKeyForLocationName(locationName);
    
    // Check cache first
    const cachedData = this.getCachedData(cacheKey);
    if (cachedData) {
      return {
        ...cachedData,
        cache: {
          ...cachedData.cache,
          hit: true
        }
      };
    }

    try {
      // First, geocode the location name to get coordinates
      const geoUrl = `${this.options.baseUrl}/geo/1.0/direct?q=${encodeURIComponent(locationName)}&limit=1&appid=${this.options.apiKey}`;
      
      const geoResponse = await this.fetchWithTimeout(geoUrl);
      
      if (!geoResponse.ok) {
        throw this.handleHttpError(geoResponse);
      }
      
      const geoData = await geoResponse.json();
      
      if (!geoData || geoData.length === 0) {
        throw this.createError(
          WeatherServiceErrorType.LOCATION,
          `Location not found: ${locationName}`
        );
      }
      
      const { lat, lon, name, country } = geoData[0];
      
      // Now get weather data using the coordinates
      return this.getWeatherByCoordinates(lat, lon, { name, country });
    } catch (error) {
      if (this.isWeatherServiceError(error)) {
        throw error;
      }
      
      throw this.createError(
        WeatherServiceErrorType.UNKNOWN,
        `Failed to get weather for location: ${locationName}`,
        error
      );
    }
  }

  /**
   * Get weather data by coordinates
   * 
   * @param lat - Latitude coordinate
   * @param lon - Longitude coordinate
   * @param locationInfo - Optional additional location information
   * @returns Promise resolving to weather service response
   */
  async getWeatherByCoordinates(
    lat: number, 
    lon: number, 
    locationInfo?: Partial<Location>
  ): Promise<WeatherServiceResponse> {
    const cacheKey = this.getCacheKeyForCoordinates(lat, lon);
    
    // Check cache first
    const cachedData = this.getCachedData(cacheKey);
    if (cachedData) {
      return {
        ...cachedData,
        cache: {
          ...cachedData.cache,
          hit: true
        }
      };
    }

    try {
      // Fetch current weather and forecast in one call
      const url = `${this.options.baseUrl}/onecall?lat=${lat}&lon=${lon}&units=${this.options.units}&appid=${this.options.apiKey}&exclude=minutely`;
      
      const response = await this.fetchWithTimeout(url);
      
      if (!response.ok) {
        throw this.handleHttpError(response);
      }
      
      const data = await response.json();
      
      // Transform the API response to our data model
      const weatherData = this.transformWeatherData(data, lat, lon, locationInfo);
      
      // Create the response object
      const weatherResponse: WeatherServiceResponse = {
        data: weatherData,
        rawResponse: {
          data,
          provider: 'OpenWeatherMap',
          fetchedAt: Date.now()
        },
        cache: {
          hit: false,
          timestamp: Date.now(),
          expiresAt: Date.now() + (this.options.cacheDuration || 15 * 60 * 1000)
        }
      };
      
      // Cache the response
      this.setCachedData(cacheKey, weatherResponse);
      
      return weatherResponse;
    } catch (error) {
      if (this.isWeatherServiceError(error)) {
        throw error;
      }
      
      throw this.createError(
        WeatherServiceErrorType.UNKNOWN,
        `Failed to get weather for coordinates: ${lat},${lon}`,
        error
      );
    }
  }

  /**
   * Transform OpenWeatherMap API response to our data model
   * 
   * @param data - Raw API response data
   * @param lat - Latitude coordinate
   * @param lon - Longitude coordinate
   * @param locationInfo - Optional additional location information
   * @returns Transformed weather data
   */
  private transformWeatherData(
    data: any, 
    lat: number, 
    lon: number, 
    locationInfo?: Partial<Location>
  ): CompleteWeatherData {
    // Create location object
    const location: Location = {
      name: locationInfo?.name || data.timezone.split('/').pop().replace('_', ' '),
      lat,
      lon,
      timezone: data.timezone,
      country: locationInfo?.country
    };

    // Transform current weather
    const current: CurrentWeather = {
      timestamp: data.current.dt * 1000,
      temperature: data.current.temp,
      feelsLike: data.current.feels_like,
      humidity: data.current.humidity,
      windSpeed: data.current.wind_speed,
      windDirection: data.current.wind_deg,
      pressure: data.current.pressure,
      description: data.current.weather[0].description,
      icon: data.current.weather[0].icon,
      uvIndex: data.current.uvi,
      precipitation: data.current.rain ? data.current.rain['1h'] : 0,
      cloudCover: data.current.clouds,
      visibility: data.current.visibility
    };

    // Calculate derived metrics
    const calculated: CalculatedWeatherMetrics = {
      heatIndex: this.calculateHeatIndex(current.temperature, current.humidity),
      heatIndexScore: current.humidity * current.temperature,
      apparentTemperature: current.feelsLike
    };

    // Transform daily forecast
    const dailyForecast: DailyForecast[] = data.daily.map((day: any) => ({
      date: new Date(day.dt * 1000).toISOString().split('T')[0],
      timestamp: day.dt * 1000,
      minTemperature: day.temp.min,
      maxTemperature: day.temp.max,
      humidity: day.humidity,
      windSpeed: day.wind_speed,
      description: day.weather[0].description,
      icon: day.weather[0].icon,
      sunrise: day.sunrise * 1000,
      sunset: day.sunset * 1000,
      precipitation: day.rain || 0,
      precipitationProbability: day.pop,
      uvIndex: day.uvi
    }));

    // Transform hourly forecast
    const hourlyForecast = {
      hours: data.hourly.map((hour: any): ForecastDataPoint => ({
        timestamp: hour.dt * 1000,
        temperature: hour.temp,
        feelsLike: hour.feels_like,
        humidity: hour.humidity,
        windSpeed: hour.wind_speed,
        windDirection: hour.wind_deg,
        pressure: hour.pressure,
        description: hour.weather[0].description,
        icon: hour.weather[0].icon,
        precipitation: hour.rain ? hour.rain['1h'] : 0,
        precipitationProbability: hour.pop,
        cloudCover: hour.clouds,
        visibility: hour.visibility,
        uvIndex: hour.uvi
      }))
    };

    return {
      location,
      current,
      calculated,
      dailyForecast,
      hourlyForecast
    };
  }

  /**
   * Calculate heat index using the Rothfusz regression equation
   * 
   * @param temperature - Temperature in Celsius
   * @param humidity - Relative humidity (0-100)
   * @returns Heat index in Celsius
   */
  private calculateHeatIndex(temperature: number, humidity: number): number {
    // Convert Celsius to Fahrenheit for the calculation
    const tempF = (temperature * 9/5) + 32;
    const rh = humidity;

    // Rothfusz regression equation
    let heatIndexF = 0.5 * (tempF + 61.0 + ((tempF - 68.0) * 1.2) + (rh * 0.094));

    // If the heat index is greater than 80F, use the full regression equation
    if (heatIndexF > 80) {
      heatIndexF = -42.379 + 
                   2.04901523 * tempF + 
                   10.14333127 * rh - 
                   0.22475541 * tempF * rh - 
                   0.00683783 * tempF * tempF - 
                   0.05481717 * rh * rh + 
                   0.00122874 * tempF * tempF * rh + 
                   0.00085282 * tempF * rh * rh - 
                   0.00000199 * tempF * tempF * rh * rh;
    }

    // Convert back to Celsius
    return (heatIndexF - 32) * 5/9;
  }

  /**
   * Fetch with timeout
   * 
   * @param url - URL to fetch
   * @param options - Fetch options
   * @returns Promise resolving to fetch response
   */
  private async fetchWithTimeout(url: string, options: RequestInit = {}): Promise<Response> {
    const timeout = this.options.timeout || 10000;
    
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      
      clearTimeout(id);
      return response;
    } catch (error: unknown) {
      clearTimeout(id);
      
      if (error instanceof Error && error.name === 'AbortError') {
        throw this.createError(
          WeatherServiceErrorType.TIMEOUT,
          `Request timed out after ${timeout}ms`
        );
      }
      
      throw this.createError(
        WeatherServiceErrorType.NETWORK,
        'Network error occurred',
        error
      );
    }
  }

  /**
   * Handle HTTP error response
   * 
   * @param response - HTTP response object
   * @returns Weather service error
   */
  private handleHttpError(response: Response): Error {
    const { status } = response;
    
    let errorType: WeatherServiceErrorType;
    let message: string;
    
    switch (status) {
      case 401:
      case 403:
        errorType = WeatherServiceErrorType.API;
        message = 'API authentication error';
        break;
      
      case 404:
        errorType = WeatherServiceErrorType.LOCATION;
        message = 'Location not found';
        break;
      
      case 429:
        errorType = WeatherServiceErrorType.API;
        message = 'API rate limit exceeded';
        break;
      
      case 500:
      case 502:
      case 503:
      case 504:
        errorType = WeatherServiceErrorType.API;
        message = 'API server error';
        break;
      
      default:
        errorType = WeatherServiceErrorType.UNKNOWN;
        message = `API error: ${status}`;
    }
    
    const error = this.createError(errorType, message, null, status);
    return new Error(error.message);
  }

  /**
   * Check if an error is a WeatherServiceError
   * 
   * @param error - Error to check
   * @returns Whether the error is a WeatherServiceError
   */
  private isWeatherServiceError(error: any): boolean {
    return error && error.type && Object.values(WeatherServiceErrorType).includes(error.type);
  }
}