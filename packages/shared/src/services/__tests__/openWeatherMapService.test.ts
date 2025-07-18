/**
 * OpenWeatherMap Service Tests
 * 
 * This file contains tests for the OpenWeatherMap service implementation.
 */

import { OpenWeatherMapService } from '../openWeatherMapService';
import { WeatherServiceErrorType } from '../weatherService';

// Mock fetch globally
global.fetch = jest.fn();
global.AbortController = jest.fn().mockImplementation(() => ({
  signal: {},
  abort: jest.fn()
}));

// Helper to create mock responses
const createMockResponse = (status: number, data: any) => {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: jest.fn().mockResolvedValue(data)
  };
};

// Mock OpenWeatherMap API responses
const mockGeoResponse = [
  {
    name: 'London',
    lat: 51.5074,
    lon: -0.1278,
    country: 'GB'
  }
];

const mockWeatherResponse = {
  lat: 51.5074,
  lon: -0.1278,
  timezone: 'Europe/London',
  timezone_offset: 3600,
  current: {
    dt: 1626432000, // 2021-07-16T12:00:00Z
    sunrise: 1626412800, // 2021-07-16T06:00:00Z
    sunset: 1626469200, // 2021-07-16T21:00:00Z
    temp: 22,
    feels_like: 24,
    pressure: 1012,
    humidity: 65,
    dew_point: 15.2,
    uvi: 5.6,
    clouds: 40,
    visibility: 10000,
    wind_speed: 10,
    wind_deg: 270,
    weather: [
      {
        id: 802,
        main: 'Clouds',
        description: 'Partly cloudy',
        icon: '03d'
      }
    ]
  },
  hourly: [
    {
      dt: 1626435600, // 2021-07-16T13:00:00Z
      temp: 23,
      feels_like: 25,
      pressure: 1012,
      humidity: 63,
      dew_point: 15.5,
      uvi: 5.8,
      clouds: 35,
      visibility: 10000,
      wind_speed: 11,
      wind_deg: 275,
      pop: 0.1,
      weather: [
        {
          id: 802,
          main: 'Clouds',
          description: 'Partly cloudy',
          icon: '03d'
        }
      ]
    }
  ],
  daily: [
    {
      dt: 1626436800, // 2021-07-16T13:20:00Z
      sunrise: 1626412800, // 2021-07-16T06:00:00Z
      sunset: 1626469200, // 2021-07-16T21:00:00Z
      temp: {
        day: 22,
        min: 18,
        max: 25,
        night: 19,
        eve: 23,
        morn: 18
      },
      feels_like: {
        day: 24,
        night: 19,
        eve: 23,
        morn: 18
      },
      pressure: 1012,
      humidity: 60,
      dew_point: 14.5,
      wind_speed: 12,
      wind_deg: 270,
      weather: [
        {
          id: 802,
          main: 'Clouds',
          description: 'Partly cloudy',
          icon: '03d'
        }
      ],
      clouds: 40,
      pop: 0.2,
      uvi: 5.6
    }
  ]
};

describe('OpenWeatherMapService', () => {
  let service: OpenWeatherMapService;
  
  beforeEach(() => {
    jest.clearAllMocks();
    
    service = new OpenWeatherMapService({
      apiKey: 'test-api-key',
      cacheDuration: 15 * 60 * 1000
    });
    
    // Reset the mock implementation for fetch
    (global.fetch as jest.Mock).mockReset();
  });
  
  describe('getWeatherByLocationName', () => {
    it('should fetch weather data by location name', async () => {
      // Mock the geocoding API call
      (global.fetch as jest.Mock).mockResolvedValueOnce(
        createMockResponse(200, mockGeoResponse)
      );
      
      // Mock the weather API call
      (global.fetch as jest.Mock).mockResolvedValueOnce(
        createMockResponse(200, mockWeatherResponse)
      );
      
      const result = await service.getWeatherByLocationName('London');
      
      // Verify the API calls
      expect(global.fetch).toHaveBeenCalledTimes(2);
      expect(global.fetch).toHaveBeenNthCalledWith(
        1,
        expect.stringContaining('/geo/1.0/direct?q=London'),
        expect.any(Object)
      );
      expect(global.fetch).toHaveBeenNthCalledWith(
        2,
        expect.stringContaining('/onecall?lat=51.5074&lon=-0.1278'),
        expect.any(Object)
      );
      
      // Verify the response structure
      expect(result.data).toBeDefined();
      expect(result.data.location.name).toBe('London');
      expect(result.data.location.lat).toBe(51.5074);
      expect(result.data.location.lon).toBe(-0.1278);
      expect(result.data.current).toBeDefined();
      expect(result.data.calculated).toBeDefined();
      expect(result.data.dailyForecast).toHaveLength(1);
      expect(result.data.hourlyForecast.hours).toHaveLength(1);
      expect(result.cache.hit).toBe(false);
    });
    
    it('should return cached data on subsequent calls', async () => {
      // Mock the geocoding API call
      (global.fetch as jest.Mock).mockResolvedValueOnce(
        createMockResponse(200, mockGeoResponse)
      );
      
      // Mock the weather API call
      (global.fetch as jest.Mock).mockResolvedValueOnce(
        createMockResponse(200, mockWeatherResponse)
      );
      
      // First call should fetch fresh data
      const result1 = await service.getWeatherByLocationName('London');
      expect(result1.cache.hit).toBe(false);
      
      // Reset the mock to verify it's not called again
      (global.fetch as jest.Mock).mockReset();
      
      // Second call should use cached data
      const result2 = await service.getWeatherByLocationName('London');
      expect(result2.cache.hit).toBe(true);
      
      // Verify that fetch was not called again
      expect(global.fetch).not.toHaveBeenCalled();
    });
    
    it('should throw an error for unknown locations', async () => {
      // Mock the geocoding API call with empty response
      (global.fetch as jest.Mock).mockResolvedValueOnce(
        createMockResponse(200, [])
      );
      
      await expect(service.getWeatherByLocationName('Unknown Location'))
        .rejects
        .toMatchObject({
          type: WeatherServiceErrorType.LOCATION,
          message: expect.stringContaining('Location not found')
        });
    });
    
    it('should handle API errors', async () => {
      // Mock the geocoding API call with error response
      (global.fetch as jest.Mock).mockResolvedValueOnce(
        createMockResponse(401, { message: 'Invalid API key' })
      );
      
      await expect(service.getWeatherByLocationName('London'))
        .rejects
        .toMatchObject({
          type: WeatherServiceErrorType.API,
          message: expect.stringContaining('API authentication error'),
          statusCode: 401
        });
    });
    
    it('should handle network errors', async () => {
      // Mock the geocoding API call with network error
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));
      
      await expect(service.getWeatherByLocationName('London'))
        .rejects
        .toMatchObject({
          type: WeatherServiceErrorType.NETWORK,
          message: expect.stringContaining('Network error occurred')
        });
    });
    
    it('should handle timeout errors', async () => {
      // Mock AbortController to simulate timeout
      const mockAbort = jest.fn();
      (global.AbortController as jest.Mock).mockImplementationOnce(() => ({
        signal: {},
        abort: mockAbort
      }));
      
      // Mock the fetch to throw AbortError
      const abortError = new Error('The operation was aborted');
      abortError.name = 'AbortError';
      (global.fetch as jest.Mock).mockRejectedValueOnce(abortError);
      
      await expect(service.getWeatherByLocationName('London'))
        .rejects
        .toMatchObject({
          type: WeatherServiceErrorType.TIMEOUT,
          message: expect.stringContaining('Request timed out')
        });
    });
  });
  
  describe('getWeatherByCoordinates', () => {
    it('should fetch weather data by coordinates', async () => {
      // Mock the weather API call
      (global.fetch as jest.Mock).mockResolvedValueOnce(
        createMockResponse(200, mockWeatherResponse)
      );
      
      const result = await service.getWeatherByCoordinates(51.5074, -0.1278);
      
      // Verify the API call
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/onecall?lat=51.5074&lon=-0.1278'),
        expect.any(Object)
      );
      
      // Verify the response structure
      expect(result.data).toBeDefined();
      expect(result.data.location.lat).toBe(51.5074);
      expect(result.data.location.lon).toBe(-0.1278);
      expect(result.data.current).toBeDefined();
      expect(result.data.calculated).toBeDefined();
      expect(result.data.dailyForecast).toHaveLength(1);
      expect(result.data.hourlyForecast.hours).toHaveLength(1);
      expect(result.cache.hit).toBe(false);
    });
    
    it('should return cached data on subsequent calls', async () => {
      // Mock the weather API call
      (global.fetch as jest.Mock).mockResolvedValueOnce(
        createMockResponse(200, mockWeatherResponse)
      );
      
      // First call should fetch fresh data
      const result1 = await service.getWeatherByCoordinates(51.5074, -0.1278);
      expect(result1.cache.hit).toBe(false);
      
      // Reset the mock to verify it's not called again
      (global.fetch as jest.Mock).mockReset();
      
      // Second call should use cached data
      const result2 = await service.getWeatherByCoordinates(51.5074, -0.1278);
      expect(result2.cache.hit).toBe(true);
      
      // Verify that fetch was not called again
      expect(global.fetch).not.toHaveBeenCalled();
    });
    
    it('should handle API errors', async () => {
      // Mock the weather API call with error response
      (global.fetch as jest.Mock).mockResolvedValueOnce(
        createMockResponse(429, { message: 'Rate limit exceeded' })
      );
      
      await expect(service.getWeatherByCoordinates(51.5074, -0.1278))
        .rejects
        .toMatchObject({
          type: WeatherServiceErrorType.API,
          message: expect.stringContaining('API rate limit exceeded'),
          statusCode: 429
        });
    });
  });
  
  describe('heat index calculation', () => {
    it('should calculate heat index correctly', async () => {
      // Mock the weather API call
      (global.fetch as jest.Mock).mockResolvedValueOnce(
        createMockResponse(200, mockWeatherResponse)
      );
      
      const result = await service.getWeatherByCoordinates(51.5074, -0.1278);
      
      // Verify the heat index calculation
      expect(result.data.calculated.heatIndex).toBeDefined();
      expect(result.data.calculated.heatIndexScore).toBe(mockWeatherResponse.current.humidity * mockWeatherResponse.current.temp);
    });
  });
});