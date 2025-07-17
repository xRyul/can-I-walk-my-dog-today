/**
 * Weather data interfaces
 * These interfaces define the structure of weather data used throughout the application
 */

/**
 * Location interface
 * Represents a geographical location with coordinates and metadata
 */
export interface Location {
  /** Location name (city, address, etc.) */
  name: string;
  /** Latitude coordinate */
  lat: number;
  /** Longitude coordinate */
  lon: number;
  /** Timezone identifier (e.g., 'Europe/London') */
  timezone?: string;
  /** Country code (ISO 3166-1 alpha-2) */
  country?: string;
}

/**
 * Current weather data interface
 * Represents the current weather conditions at a specific location
 */
export interface CurrentWeather {
  /** Unix timestamp of the data point */
  timestamp: number;
  /** Current temperature in Celsius */
  temperature: number;
  /** Feels like temperature in Celsius */
  feelsLike: number;
  /** Humidity percentage (0-100) */
  humidity: number;
  /** Wind speed in meters per second */
  windSpeed: number;
  /** Wind direction in degrees (0-360) */
  windDirection?: number;
  /** Atmospheric pressure in hPa */
  pressure?: number;
  /** Weather condition description */
  description: string;
  /** Weather condition icon code */
  icon: string;
  /** UV index */
  uvIndex?: number;
  /** Precipitation amount in mm for the last hour */
  precipitation: number;
  /** Cloud coverage percentage (0-100) */
  cloudCover?: number;
  /** Visibility in meters */
  visibility?: number;
  /** Solar radiation in W/m² (if available) */
  solarRadiation?: number;
}

/**
 * Forecast data point interface
 * Represents a single point in a weather forecast
 */
export interface ForecastDataPoint extends CurrentWeather {
  /** Probability of precipitation (0-1) */
  precipitationProbability?: number;
}

/**
 * Daily forecast interface
 * Represents forecast data for a full day
 */
export interface DailyForecast {
  /** Date of the forecast in YYYY-MM-DD format */
  date: string;
  /** Unix timestamp for the start of the day */
  timestamp: number;
  /** Minimum temperature in Celsius */
  minTemperature: number;
  /** Maximum temperature in Celsius */
  maxTemperature: number;
  /** Average humidity percentage (0-100) */
  humidity: number;
  /** Average wind speed in meters per second */
  windSpeed: number;
  /** Weather condition description */
  description: string;
  /** Weather condition icon code */
  icon: string;
  /** Sunrise time as Unix timestamp */
  sunrise?: number;
  /** Sunset time as Unix timestamp */
  sunset?: number;
  /** Precipitation amount in mm */
  precipitation: number;
  /** Probability of precipitation (0-1) */
  precipitationProbability?: number;
  /** UV index */
  uvIndex?: number;
}

/**
 * Hourly forecast interface
 * Represents forecast data for specific hours
 */
export interface HourlyForecast {
  /** Array of hourly forecast data points */
  hours: ForecastDataPoint[];
}

/**
 * Complete weather data interface
 * Combines current weather and forecast data
 */
export interface CompleteWeatherData {
  /** Location information */
  location: Location;
  /** Current weather conditions */
  current: CurrentWeather;
  /** Calculated weather metrics */
  calculated: CalculatedWeatherMetrics;
  /** Daily forecast for upcoming days */
  dailyForecast: DailyForecast[];
  /** Hourly forecast for upcoming hours */
  hourlyForecast: HourlyForecast;
}

/**
 * Calculated weather metrics interface
 * Contains derived weather metrics used for safety evaluations
 */
export interface CalculatedWeatherMetrics {
  /** Heat index in Celsius */
  heatIndex: number;
  /** Heat index score (Humidity % × Temperature °C) */
  heatIndexScore: number;
  /** Apparent temperature in Celsius */
  apparentTemperature: number;
  /** Wet Bulb Globe Temperature in Celsius (if available) */
  wbgt?: number;
}

/**
 * Weather API response interface
 * Represents the raw response from a weather API
 */
export interface WeatherApiResponse {
  /** Raw API response data */
  data: any;
  /** API provider name */
  provider: string;
  /** Timestamp when the data was fetched */
  fetchedAt: number;
}

/**
 * Weather data validation error
 * Represents an error that occurred during weather data validation
 */
export interface WeatherDataValidationError {
  /** Field that failed validation */
  field: string;
  /** Error message */
  message: string;
  /** Value that failed validation */
  value: any;
}

/**
 * Weather unit system
 * Defines the unit system for weather data
 */
export type WeatherUnitSystem = 'metric' | 'imperial';

/**
 * Temperature unit
 * Defines the unit for temperature values
 */
export type TemperatureUnit = 'celsius' | 'fahrenheit';