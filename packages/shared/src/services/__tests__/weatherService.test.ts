/**
 * Weather Service Tests
 * 
 * This file contains tests for the weather service interface and base class.
 */

import { 
  BaseWeatherService, 
  IWeatherService, 
  WeatherServiceOptions,
  WeatherServiceResponse,
  WeatherServiceErrorType
} from '../weatherService';
import { CompleteWeatherData, Location, WeatherApiResponse } from '../../types/weather';

// Mock implementation of BaseWeatherService for testing
class MockWeatherService extends BaseWeatherService {
  public mockResponses: Map<string, WeatherServiceResponse> = new Map();
  public mockErrors: Map<string, Error> = new Map();
  public requestLog: string[] = [];

  constructor(options: WeatherServiceOptions) {
    super(options);
  }

  async getWeatherByLocationName(locationName: string): Promise<WeatherServiceResponse> {
    this.requestLog.push(`getWeatherByLocationName:${locationName}`);
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

    // Check if we should throw an error
    const error = this.mockErrors.get(locationName);
    if (error) {
      throw error;
    }

    // Get mock response
    const response = this.mockResponses.get(locationName);
    if (!response) {
      throw this.createError(
        WeatherServiceErrorType.LOCATION,
        `Location not found: ${locationName}`
      );
    }

    // Cache the response
    const responseWithCacheInfo: WeatherServiceResponse = {
      ...response,
      cache: {
        hit: false,
        timestamp: Date.now(),
        expiresAt: Date.now() + (this.options.cacheDuration || 15 * 60 * 1000)
      }
    };
    
    this.setCachedData(cacheKey, responseWithCacheInfo);
    return responseWithCacheInfo;
  }

  async getWeatherByCoordinates(lat: number, lon: number): Promise<WeatherServiceResponse> {
    this.requestLog.push(`getWeatherByCoordinates:${lat},${lon}`);
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

    // Check if we should throw an error
    const coordKey = `${lat},${lon}`;
    const error = this.mockErrors.get(coordKey);
    if (error) {
      throw error;
    }

    // Get mock response
    const response = this.mockResponses.get(coordKey);
    if (!response) {
      throw this.createError(
        WeatherServiceErrorType.LOCATION,
        `Location not found: ${lat},${lon}`
      );
    }

    // Cache the response
    const responseWithCacheInfo: WeatherServiceResponse = {
      ...response,
      cache: {
        hit: false,
        timestamp: Date.now(),
        expiresAt: Date.now() + (this.options.cacheDuration || 15 * 60 * 1000)
      }
    };
    
    this.setCachedData(cacheKey, responseWithCacheInfo);
    return responseWithCacheInfo;
  }

  // Expose protected methods for testing
  public exposedGetCacheKeyForLocationName(locationName: string): string {
    return this.getCacheKeyForLocationName(locationName);
  }

  public exposedGetCacheKeyForCoordinates(lat: number, lon: number): string {
    return this.getCacheKeyForCoordinates(lat, lon);
  }

  public exposedGetCachedData(cacheKey: string): WeatherServiceResponse | null {
    return this.getCachedData(cacheKey);
  }

  public exposedSetCachedData(cacheKey: string, data: WeatherServiceResponse): void {
    this.setCachedData(cacheKey, data);
  }
}

// Mock data for tests
const mockLocation: Location = {
  name: 'London',
  lat: 51.5074,
  lon: -0.1278,
  timezone: 'Europe/London',
  country: 'GB'
};

const mockWeatherData: CompleteWeatherData = {
  location: mockLocation,
  current: {
    timestamp: Date.now(),
    temperature: 22,
    feelsLike: 24,
    humidity: 65,
    windSpeed: 10,
    description: 'Partly cloudy',
    icon: '03d',
    precipitation: 0
  },
  calculated: {
    heatIndex: 24,
    heatIndexScore: 1430, // 65% * 22°C
    apparentTemperature: 23
  },
  dailyForecast: [
    {
      date: '2025-07-17',
      timestamp: Date.now(),
      minTemperature: 18,
      maxTemperature: 25,
      humidity: 60,
      windSpeed: 12,
      description: 'Partly cloudy',
      icon: '03d',
      precipitation: 0
    }
  ],
  hourlyForecast: {
    hours: [
      {
        timestamp: Date.now() + 3600000,
        temperature: 23,
        feelsLike: 25,
        humidity: 63,
        windSpeed: 11,
        description: 'Partly cloudy',
        icon: '03d',
        precipitation: 0
      }
    ]
  }
};

const mockApiResponse: WeatherApiResponse = {
  data: { /* raw API data would go here */ },
  provider: 'MockWeatherProvider',
  fetchedAt: Date.now()
};

const mockServiceResponse: WeatherServiceResponse = {
  data: mockWeatherData,
  rawResponse: mockApiResponse,
  cache: {
    hit: false,
    timestamp: Date.now(),
    expiresAt: Date.now() + 15 * 60 * 1000
  }
};

describe('BaseWeatherService', () => {
  let weatherService: MockWeatherService;

  beforeEach(() => {
    weatherService = new MockWeatherService({
      apiKey: 'test-api-key',
      cacheDuration: 15 * 60 * 1000
    });
    
    // Set up mock responses
    weatherService.mockResponses.set('london', mockServiceResponse);
    weatherService.mockResponses.set('51.5074,-0.1278', mockServiceResponse);
  });

  describe('getWeatherByLocationName', () => {
    it('should fetch weather data by location name', async () => {
      const result = await weatherService.getWeatherByLocationName('london');
      
      expect(result.data).toEqual(mockWeatherData);
      expect(result.rawResponse).toEqual(mockApiResponse);
      expect(result.cache.hit).toBe(false);
      expect(weatherService.requestLog).toContain('getWeatherByLocationName:london');
    });

    it('should return cached data on subsequent calls', async () => {
      // First call should fetch fresh data
      const result1 = await weatherService.getWeatherByLocationName('london');
      expect(result1.cache.hit).toBe(false);
      
      // Second call should use cached data
      const result2 = await weatherService.getWeatherByLocationName('london');
      expect(result2.cache.hit).toBe(true);
      
      // Should only make one actual request
      expect(weatherService.requestLog.filter(log => log === 'getWeatherByLocationName:london').length).toBe(2);
    });

    it('should throw an error for unknown locations', async () => {
      await expect(weatherService.getWeatherByLocationName('unknown-location'))
        .rejects
        .toMatchObject({
          type: WeatherServiceErrorType.LOCATION,
          message: expect.stringContaining('Location not found')
        });
    });

    it('should throw custom errors', async () => {
      const customError = new Error('API rate limit exceeded');
      weatherService.mockErrors.set('error-location', customError);
      
      await expect(weatherService.getWeatherByLocationName('error-location'))
        .rejects
        .toBe(customError);
    });
  });

  describe('getWeatherByCoordinates', () => {
    it('should fetch weather data by coordinates', async () => {
      const result = await weatherService.getWeatherByCoordinates(51.5074, -0.1278);
      
      expect(result.data).toEqual(mockWeatherData);
      expect(result.rawResponse).toEqual(mockApiResponse);
      expect(result.cache.hit).toBe(false);
      expect(weatherService.requestLog).toContain('getWeatherByCoordinates:51.5074,-0.1278');
    });

    it('should return cached data on subsequent calls', async () => {
      // First call should fetch fresh data
      const result1 = await weatherService.getWeatherByCoordinates(51.5074, -0.1278);
      expect(result1.cache.hit).toBe(false);
      
      // Second call should use cached data
      const result2 = await weatherService.getWeatherByCoordinates(51.5074, -0.1278);
      expect(result2.cache.hit).toBe(true);
      
      // Should only make one actual request
      expect(weatherService.requestLog.filter(log => log === 'getWeatherByCoordinates:51.5074,-0.1278').length).toBe(2);
    });

    it('should throw an error for unknown coordinates', async () => {
      await expect(weatherService.getWeatherByCoordinates(0, 0))
        .rejects
        .toMatchObject({
          type: WeatherServiceErrorType.LOCATION,
          message: expect.stringContaining('Location not found')
        });
    });
  });

  describe('getWeatherByLocation', () => {
    it('should call getWeatherByCoordinates with location coordinates', async () => {
      await weatherService.getWeatherByLocation(mockLocation);
      
      expect(weatherService.requestLog).toContain('getWeatherByCoordinates:51.5074,-0.1278');
    });
  });

  describe('clearCache', () => {
    it('should clear all cache when no location is provided', async () => {
      // Populate cache
      await weatherService.getWeatherByLocationName('london');
      await weatherService.getWeatherByCoordinates(51.5074, -0.1278);
      
      // Clear cache
      await weatherService.clearCache();
      
      // Verify cache is cleared
      const londonCacheKey = weatherService.exposedGetCacheKeyForLocationName('london');
      const coordsCacheKey = weatherService.exposedGetCacheKeyForCoordinates(51.5074, -0.1278);
      
      expect(weatherService.exposedGetCachedData(londonCacheKey)).toBeNull();
      expect(weatherService.exposedGetCachedData(coordsCacheKey)).toBeNull();
    });

    it('should clear cache for a specific location name', async () => {
      // Populate cache
      await weatherService.getWeatherByLocationName('london');
      await weatherService.getWeatherByCoordinates(51.5074, -0.1278);
      
      // Clear cache for london
      await weatherService.clearCache('london');
      
      // Verify london cache is cleared but coords cache remains
      const londonCacheKey = weatherService.exposedGetCacheKeyForLocationName('london');
      const coordsCacheKey = weatherService.exposedGetCacheKeyForCoordinates(51.5074, -0.1278);
      
      expect(weatherService.exposedGetCachedData(londonCacheKey)).toBeNull();
      expect(weatherService.exposedGetCachedData(coordsCacheKey)).not.toBeNull();
    });

    it('should clear cache for a specific location object', async () => {
      // Populate cache
      await weatherService.getWeatherByLocationName('london');
      await weatherService.getWeatherByCoordinates(51.5074, -0.1278);
      
      // Clear cache for coordinates
      await weatherService.clearCache({ lat: 51.5074, lon: -0.1278, name: 'London' });
      
      // Verify coords cache is cleared but london cache remains
      const londonCacheKey = weatherService.exposedGetCacheKeyForLocationName('london');
      const coordsCacheKey = weatherService.exposedGetCacheKeyForCoordinates(51.5074, -0.1278);
      
      expect(weatherService.exposedGetCachedData(londonCacheKey)).not.toBeNull();
      expect(weatherService.exposedGetCachedData(coordsCacheKey)).toBeNull();
    });
  });

  describe('cache handling', () => {
    it('should expire cache after the specified duration', async () => {
      // Create service with short cache duration
      const shortCacheService = new MockWeatherService({
        apiKey: 'test-api-key',
        cacheDuration: 100 // 100ms
      });
      shortCacheService.mockResponses.set('london', mockServiceResponse);
      
      // First call should fetch fresh data
      const result1 = await shortCacheService.getWeatherByLocationName('london');
      expect(result1.cache.hit).toBe(false);
      
      // Wait for cache to expire
      await new Promise(resolve => setTimeout(resolve, 150));
      
      // Second call should fetch fresh data again
      const result2 = await shortCacheService.getWeatherByLocationName('london');
      expect(result2.cache.hit).toBe(false);
    });

    it('should round coordinates for consistent caching', async () => {
      // These coordinates should map to the same cache key
      await weatherService.getWeatherByCoordinates(51.5074, -0.1278);
      await weatherService.getWeatherByCoordinates(51.50742, -0.12781);
      
      // Should only make one actual request to the API
      expect(weatherService.requestLog.filter(log => 
        log.startsWith('getWeatherByCoordinates:')
      ).length).toBe(2);
      
      // Second call should be a cache hit
      const coordsCacheKey = weatherService.exposedGetCacheKeyForCoordinates(51.5074, -0.1278);
      const cachedData = weatherService.exposedGetCachedData(coordsCacheKey);
      expect(cachedData?.cache.hit).toBe(true);
    });
  });
});