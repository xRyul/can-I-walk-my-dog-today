import { WeatherData } from '@can-i-walk-my-dog-today/shared';

/**
 * Fetches weather data for a given location
 * @param location - The location to fetch weather data for
 * @returns Promise with weather data and recommendations
 */
export async function fetchWeatherData(location: string): Promise<WeatherData & { canWalk: boolean; recommendation: string }> {
  try {
    // In a real app, this would be an API call to your backend
    // For now, we'll simulate a response
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock weather data
    const mockWeatherData: WeatherData & { canWalk: boolean; recommendation: string } = {
      temperature: 22,
      feelsLike: 24,
      humidity: 65,
      windSpeed: 10,
      description: 'Partly cloudy',
      icon: '03d',
      precipitation: 0,
      location: location,
      timestamp: Date.now(),
      canWalk: true,
      recommendation: "It's a great day to walk your dog!"
    };
    
    return mockWeatherData;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw new Error('Failed to fetch weather data');
  }
}