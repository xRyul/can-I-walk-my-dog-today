/**
 * Weather Service Interface
 * 
 * This file defines the abstract interface for weather data retrieval services.
 * It provides a consistent API for fetching weather data regardless of the
 * underlying weather data provider.
 */

import { 
  Location, 
  CompleteWeatherData, 
  WeatherApiResponse,
  WeatherUnitSystem
} from '../types/weather';

/**
 * Weather service options interface
 */
export interface WeatherServiceOptions {
  /** API key for the weather service */
  apiKey: string;
  /** Base URL for API requests */
  baseUrl?: string;
  /** Unit system to use (metric or imperial) */
  units?: WeatherUnitSystem;
  /** Cache duration in milliseconds */
  cacheDuration?: number;
  /** Timeout for API requests in milliseconds */
  timeout?: number;
}

/**
 * Weather service error types
 */
export enum WeatherServiceErrorType {
  /** Network-related errors */
  NETWORK = 'NETWORK',
  /** API-related errors (rate limiting, invalid key, etc.) */
  API = 'API',
  /** Invalid location errors */
  LOCATION = 'LOCATION',
  /** Data validation errors */
  VALIDATION = 'VALIDATION',
  /** Timeout errors */
  TIMEOUT = 'TIMEOUT',
  /** Unknown errors */
  UNKNOWN = 'UNKNOWN'
}

/**
 * Weather service error interface
 */
export interface WeatherServiceError {
  /** Error type */
  type: WeatherServiceErrorType;
  /** Error message */
  message: string;
  /** Original error object */
  originalError?: unknown;
  /** HTTP status code (if applicable) */
  statusCode?: number;
}

/**
 * Weather service response interface
 */
export interface WeatherServiceResponse {
  /** Weather data */
  data: CompleteWeatherData;
  /** Raw API response */
  rawResponse: WeatherApiResponse;
  /** Cache information */
  cache: {
    /** Whether the data was retrieved from cache */
    hit: boolean;
    /** When the data was cached */
    timestamp: number;
    /** When the cache will expire */
    expiresAt: number;
  };
}

/**
 * Weather service interface
 * 
 * This interface defines the methods that all weather service implementations must provide.
 */
export interface IWeatherService {
  /**
   * Get current weather and forecast for a location by name
   * 
   * @param locationName - The name of the location (e.g., "London", "New York")
   * @returns Promise resolving to weather service response
   * @throws WeatherServiceError if the request fails
   */
  getWeatherByLocationName(locationName: string): Promise<WeatherServiceResponse>;

  /**
   * Get current weather and forecast for a location by coordinates
   * 
   * @param lat - Latitude coordinate
   * @param lon - Longitude coordinate
   * @returns Promise resolving to weather service response
   * @throws WeatherServiceError if the request fails
   */
  getWeatherByCoordinates(lat: number, lon: number): Promise<WeatherServiceResponse>;

  /**
   * Get current weather and forecast for a location object
   * 
   * @param location - Location object with coordinates
   * @returns Promise resolving to weather service response
   * @throws WeatherServiceError if the request fails
   */
  getWeatherByLocation(location: Location): Promise<WeatherServiceResponse>;

  /**
   * Clear the cache for a specific location
   * 
   * @param location - Location to clear cache for (if omitted, clears all cache)
   * @returns Promise resolving when cache is cleared
   */
  clearCache(location?: Location | string): Promise<void>;
}

/**
 * Abstract base class for weather services
 * 
 * This class provides common functionality for weather service implementations.
 */
export abstract class BaseWeatherService implements IWeatherService {
  protected options: WeatherServiceOptions;
  protected cache: Map<string, { data: WeatherServiceResponse; expiresAt: number }> = new Map();

  /**
   * Create a new BaseWeatherService instance
   * 
   * @param options - Weather service options
   */
  constructor(options: WeatherServiceOptions) {
    this.options = {
      cacheDuration: 15 * 60 * 1000, // 15 minutes default
      timeout: 10000, // 10 seconds default
      units: 'metric', // metric by default
      ...options
    };
  }

  /**
   * Get current weather and forecast for a location by name
   * 
   * @param locationName - The name of the location (e.g., "London", "New York")
   * @returns Promise resolving to weather service response
   * @throws WeatherServiceError if the request fails
   */
  abstract getWeatherByLocationName(locationName: string): Promise<WeatherServiceResponse>;

  /**
   * Get current weather and forecast for a location by coordinates
   * 
   * @param lat - Latitude coordinate
   * @param lon - Longitude coordinate
   * @returns Promise resolving to weather service response
   * @throws WeatherServiceError if the request fails
   */
  abstract getWeatherByCoordinates(lat: number, lon: number): Promise<WeatherServiceResponse>;

  /**
   * Get current weather and forecast for a location object
   * 
   * @param location - Location object with coordinates
   * @returns Promise resolving to weather service response
   * @throws WeatherServiceError if the request fails
   */
  getWeatherByLocation(location: Location): Promise<WeatherServiceResponse> {
    return this.getWeatherByCoordinates(location.lat, location.lon);
  }

  /**
   * Clear the cache for a specific location
   * 
   * @param location - Location to clear cache for (if omitted, clears all cache)
   * @returns Promise resolving when cache is cleared
   */
  async clearCache(location?: Location | string): Promise<void> {
    if (!location) {
      this.cache.clear();
      return;
    }

    const cacheKey = typeof location === 'string' 
      ? this.getCacheKeyForLocationName(location)
      : this.getCacheKeyForCoordinates(location.lat, location.lon);
    
    this.cache.delete(cacheKey);
  }

  /**
   * Get a cache key for a location name
   * 
   * @param locationName - Location name
   * @returns Cache key string
   */
  protected getCacheKeyForLocationName(locationName: string): string {
    return `name:${locationName.toLowerCase()}`;
  }

  /**
   * Get a cache key for coordinates
   * 
   * @param lat - Latitude
   * @param lon - Longitude
   * @returns Cache key string
   */
  protected getCacheKeyForCoordinates(lat: number, lon: number): string {
    // Round coordinates to 4 decimal places for consistent caching
    const roundedLat = Math.round(lat * 10000) / 10000;
    const roundedLon = Math.round(lon * 10000) / 10000;
    return `coords:${roundedLat},${roundedLon}`;
  }

  /**
   * Check if data for a cache key is available and not expired
   * 
   * @param cacheKey - Cache key to check
   * @returns Cached response or null if not found or expired
   */
  protected getCachedData(cacheKey: string): WeatherServiceResponse | null {
    const cached = this.cache.get(cacheKey);
    
    if (!cached) {
      return null;
    }

    if (cached.expiresAt < Date.now()) {
      this.cache.delete(cacheKey);
      return null;
    }

    return cached.data;
  }

  /**
   * Store data in the cache
   * 
   * @param cacheKey - Cache key
   * @param data - Data to cache
   */
  protected setCachedData(cacheKey: string, data: WeatherServiceResponse): void {
    const expiresAt = Date.now() + (this.options.cacheDuration || 15 * 60 * 1000);
    
    this.cache.set(cacheKey, {
      data: {
        ...data,
        cache: {
          ...data.cache,
          expiresAt
        }
      },
      expiresAt
    });
  }

  /**
   * Create a weather service error
   * 
   * @param type - Error type
   * @param message - Error message
   * @param originalError - Original error object
   * @param statusCode - HTTP status code (if applicable)
   * @returns Weather service error object
   */
  protected createError(
    type: WeatherServiceErrorType,
    message: string,
    originalError?: unknown,
    statusCode?: number
  ): WeatherServiceError {
    return {
      type,
      message,
      originalError,
      statusCode
    };
  }
}