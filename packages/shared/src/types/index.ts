/**
 * Export all types from the weather module
 */
export * from './weather';

/**
 * Export all types from the recommendation module
 */
export * from './recommendation';

/**
 * Export all types from the user module
 */
export * from './user';

/**
 * Legacy interfaces - kept for backward compatibility
 * New code should use the more detailed interfaces from './weather', './recommendation', and './user'
 */

/**
 * Weather data interface
 * Represents the weather data returned from the API
 * @deprecated Use CompleteWeatherData from './weather' instead
 */
export interface WeatherData {
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
  precipitation: number;
  location: string;
  timestamp: number;
}

/**
 * Dog walking recommendation interface
 * Represents the recommendation for walking a dog based on weather conditions
 * @deprecated Use CompleteRecommendationData from './recommendation' instead
 */
export interface DogWalkingRecommendation {
  canWalk: boolean;
  recommendation: string;
  safetyTips: string[];
  weatherData: WeatherData;
}

/**
 * User preferences interface
 * Represents user preferences for dog walking conditions
 * @deprecated Use UserPreferences from './user' instead
 */
export interface UserPreferences {
  dogSize: 'small' | 'medium' | 'large';
  dogAge: number;
  maxTemperature: number;
  minTemperature: number;
  maxWindSpeed: number;
  maxPrecipitation: number;
  location: string;
}