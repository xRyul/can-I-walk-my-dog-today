"use client";

import { useState } from "react";
import type {
  WeatherData,
  DogWalkingRecommendation,
} from "@can-i-walk-my-dog-today/shared";

export default function Home() {
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] =
    useState<DogWalkingRecommendation | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!location) return;

    setLoading(true);
    try {
      const response = await fetch(
        `/api/weather?location=${encodeURIComponent(location)}`
      );
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">
          Can I Walk My Dog Today?
        </h1>

        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex gap-2">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter your location"
              className="flex-1 p-2 border rounded"
              required
            />
            <button
              type="submit"
              className="bg-primary-600 text-white px-4 py-2 rounded"
              disabled={loading}
            >
              {loading ? "Checking..." : "Check"}
            </button>
          </div>
        </form>

        {weatherData && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">
              Weather in {weatherData.weatherData.location}
            </h2>
            <p className="text-lg">
              Temperature: {weatherData.weatherData.temperature}°C
            </p>
            <p className="text-lg">
              Conditions: {weatherData.weatherData.description}
            </p>
            <p className="text-lg">
              Wind Speed: {weatherData.weatherData.windSpeed} km/h
            </p>
            <p className="text-lg">
              Humidity: {weatherData.weatherData.humidity}%
            </p>

            <div className="mt-6 p-4 bg-primary-50 rounded">
              <h3 className="text-xl font-bold mb-2">Recommendation</h3>
              <p className="text-lg">
                {weatherData.canWalk
                  ? "It's a great day to walk your dog!"
                  : "It might be better to stay indoors with your dog today."}
              </p>
              <p className="mt-2">{weatherData.recommendation}</p>
              {weatherData.safetyTips.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-semibold">Safety Tips:</h4>
                  <ul className="list-disc pl-5 mt-2">
                    {weatherData.safetyTips.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
