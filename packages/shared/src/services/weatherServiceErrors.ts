/**
 * Weather Service Error Handling Utilities
 * 
 * This file provides utilities for handling and formatting weather service errors.
 */

import { WeatherServiceError, WeatherServiceErrorType } from './weatherService';

/**
 * Custom error class for weather service errors
 */
export class WeatherServiceException extends Error {
  /** Error type */
  type: WeatherServiceErrorType;
  /** Original error object */
  originalError?: unknown;
  /** HTTP status code (if applicable) */
  statusCode?: number;

  /**
   * Create a new WeatherServiceException
   * 
   * @param error - Weather service error object
   */
  constructor(error: WeatherServiceError) {
    super(error.message);
    this.name = 'WeatherServiceException';
    this.type = error.type;
    this.originalError = error.originalError;
    this.statusCode = error.statusCode;
  }
}

/**
 * Get a user-friendly error message for a weather service error
 * 
 * @param error - Weather service error
 * @returns User-friendly error message
 */
export function getUserFriendlyErrorMessage(error: WeatherServiceError): string {
  switch (error.type) {
    case WeatherServiceErrorType.NETWORK:
      return 'Unable to connect to weather service. Please check your internet connection and try again.';
    
    case WeatherServiceErrorType.API:
      if (error.statusCode === 401 || error.statusCode === 403) {
        return 'Authentication error with weather service. Please try again later.';
      }
      if (error.statusCode === 429) {
        return 'Weather service request limit exceeded. Please try again later.';
      }
      return 'Weather service error. Please try again later.';
    
    case WeatherServiceErrorType.LOCATION:
      return 'Location not found. Please check the spelling or try a different location.';
    
    case WeatherServiceErrorType.VALIDATION:
      return 'Invalid weather data received. Please try again later.';
    
    case WeatherServiceErrorType.TIMEOUT:
      return 'Weather service request timed out. Please try again later.';
    
    case WeatherServiceErrorType.UNKNOWN:
    default:
      return 'An unexpected error occurred. Please try again later.';
  }
}

/**
 * Determine if an error is retryable
 * 
 * @param error - Weather service error
 * @returns Whether the error is retryable
 */
export function isRetryableError(error: WeatherServiceError): boolean {
  switch (error.type) {
    case WeatherServiceErrorType.NETWORK:
    case WeatherServiceErrorType.TIMEOUT:
      return true;
    
    case WeatherServiceErrorType.API:
      // Don't retry authentication errors or rate limiting
      if (error.statusCode === 401 || error.statusCode === 403 || error.statusCode === 429) {
        return false;
      }
      // Retry server errors
      return error.statusCode ? error.statusCode >= 500 : false;
    
    case WeatherServiceErrorType.LOCATION:
    case WeatherServiceErrorType.VALIDATION:
    case WeatherServiceErrorType.UNKNOWN:
    default:
      return false;
  }
}

/**
 * Log a weather service error
 * 
 * @param error - Weather service error
 * @param context - Additional context information
 */
export function logWeatherServiceError(error: WeatherServiceError, context?: Record<string, unknown>): void {
  console.error(
    `[WeatherService] ${error.type} Error: ${error.message}`,
    {
      type: error.type,
      statusCode: error.statusCode,
      context,
      originalError: error.originalError
    }
  );
}