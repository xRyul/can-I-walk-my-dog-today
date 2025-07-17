import { NextRequest, NextResponse } from 'next/server';
import type { WeatherData } from '@can-i-walk-my-dog-today/shared';

// Use Edge Runtime for optimal serverless performance
export const runtime = 'edge';

/**
 * GET handler for weather API
 * Fetches weather data for a given location and returns it with dog walking recommendations
 * 
 * @param request - The incoming request object
 * @returns NextResponse with weather data and recommendations
 */
export async function GET(request: NextRequest) {
  try {
    // Get location from query parameters
    const { searchParams } = new URL(request.url);
    const location = searchParams.get('location');

    if (!location) {
      return NextResponse.json(
        { error: 'Location parameter is required' },
        { status: 400 }
      );
    }

    // In a real application, we would call a weather API here
    // For now, we'll return mock data
    const mockWeatherData: WeatherData = {
      temperature: 22,
      feelsLike: 24,
      humidity: 65,
      windSpeed: 10,
      description: 'Partly cloudy',
      icon: '03d',
      precipitation: 0,
      location: location,
      timestamp: Date.now(),
    };

    // Determine if it's safe to walk the dog based on weather conditions
    const canWalk = 
      mockWeatherData.temperature > 5 && 
      mockWeatherData.temperature < 30 && 
      mockWeatherData.windSpeed < 20 && 
      mockWeatherData.precipitation < 5;

    return NextResponse.json({
      ...mockWeatherData,
      canWalk,
      recommendation: canWalk 
        ? "It's a great day to walk your dog!" 
        : "It might be better to stay indoors with your dog today.",
      safetyTips: [
        "Always bring water for your dog",
        "Watch for signs of overheating",
        "Avoid hot pavement that could burn paws",
      ],
    });
  } catch (error) {
    console.error('Error in weather API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
}