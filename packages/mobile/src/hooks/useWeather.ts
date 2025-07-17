import { useQuery } from '@tanstack/react-query';
import { fetchWeatherData } from '../services/weatherService';

/**
 * Custom hook for fetching weather data
 * @param location - The location to fetch weather data for
 * @returns Query result with weather data
 */
export function useWeather(location: string | null) {
  return useQuery({
    queryKey: ['weather', location],
    queryFn: () => fetchWeatherData(location || ''),
    enabled: !!location, // Only fetch if location is provided
    staleTime: 1000 * 60 * 15, // 15 minutes
  });
}