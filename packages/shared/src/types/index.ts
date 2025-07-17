/**
 * Weather data interface
 * Represents the weather data returned from the API
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