import { 
  Location, 
  CurrentWeather, 
  ForecastDataPoint, 
  DailyForecast,
  CompleteWeatherData,
  CalculatedWeatherMetrics,
  WeatherDataValidationError
} from '../types/weather';

/**
 * Validates a location object
 * @param location - The location object to validate
 * @returns Array of validation errors, empty if valid
 */
export function validateLocation(location: Partial<Location>): WeatherDataValidationError[] {
  const errors: WeatherDataValidationError[] = [];

  if (!location.name) {
    errors.push({
      field: 'name',
      message: 'Location name is required',
      value: location.name
    });
  }

  if (location.lat === undefined || location.lat === null) {
    errors.push({
      field: 'lat',
      message: 'Latitude is required',
      value: location.lat
    });
  } else if (location.lat < -90 || location.lat > 90) {
    errors.push({
      field: 'lat',
      message: 'Latitude must be between -90 and 90',
      value: location.lat
    });
  }

  if (location.lon === undefined || location.lon === null) {
    errors.push({
      field: 'lon',
      message: 'Longitude is required',
      value: location.lon
    });
  } else if (location.lon < -180 || location.lon > 180) {
    errors.push({
      field: 'lon',
      message: 'Longitude must be between -180 and 180',
      value: location.lon
    });
  }

  return errors;
}

/**
 * Validates a current weather object
 * @param weather - The current weather object to validate
 * @returns Array of validation errors, empty if valid
 */
export function validateCurrentWeather(weather: Partial<CurrentWeather>): WeatherDataValidationError[] {
  const errors: WeatherDataValidationError[] = [];

  if (!weather.timestamp) {
    errors.push({
      field: 'timestamp',
      message: 'Timestamp is required',
      value: weather.timestamp
    });
  }

  if (weather.temperature === undefined || weather.temperature === null) {
    errors.push({
      field: 'temperature',
      message: 'Temperature is required',
      value: weather.temperature
    });
  }

  if (weather.humidity === undefined || weather.humidity === null) {
    errors.push({
      field: 'humidity',
      message: 'Humidity is required',
      value: weather.humidity
    });
  } else if (weather.humidity < 0 || weather.humidity > 100) {
    errors.push({
      field: 'humidity',
      message: 'Humidity must be between 0 and 100',
      value: weather.humidity
    });
  }

  if (weather.windSpeed === undefined || weather.windSpeed === null) {
    errors.push({
      field: 'windSpeed',
      message: 'Wind speed is required',
      value: weather.windSpeed
    });
  } else if (weather.windSpeed < 0) {
    errors.push({
      field: 'windSpeed',
      message: 'Wind speed cannot be negative',
      value: weather.windSpeed
    });
  }

  if (!weather.description) {
    errors.push({
      field: 'description',
      message: 'Weather description is required',
      value: weather.description
    });
  }

  if (!weather.icon) {
    errors.push({
      field: 'icon',
      message: 'Weather icon is required',
      value: weather.icon
    });
  }

  if (weather.precipitation === undefined || weather.precipitation === null) {
    errors.push({
      field: 'precipitation',
      message: 'Precipitation is required',
      value: weather.precipitation
    });
  } else if (weather.precipitation < 0) {
    errors.push({
      field: 'precipitation',
      message: 'Precipitation cannot be negative',
      value: weather.precipitation
    });
  }

  // Optional fields with constraints
  if (weather.windDirection !== undefined && (weather.windDirection < 0 || weather.windDirection > 360)) {
    errors.push({
      field: 'windDirection',
      message: 'Wind direction must be between 0 and 360 degrees',
      value: weather.windDirection
    });
  }

  if (weather.uvIndex !== undefined && weather.uvIndex < 0) {
    errors.push({
      field: 'uvIndex',
      message: 'UV index cannot be negative',
      value: weather.uvIndex
    });
  }

  if (weather.cloudCover !== undefined && (weather.cloudCover < 0 || weather.cloudCover > 100)) {
    errors.push({
      field: 'cloudCover',
      message: 'Cloud cover must be between 0 and 100',
      value: weather.cloudCover
    });
  }

  if (weather.visibility !== undefined && weather.visibility < 0) {
    errors.push({
      field: 'visibility',
      message: 'Visibility cannot be negative',
      value: weather.visibility
    });
  }

  if (weather.solarRadiation !== undefined && weather.solarRadiation < 0) {
    errors.push({
      field: 'solarRadiation',
      message: 'Solar radiation cannot be negative',
      value: weather.solarRadiation
    });
  }

  return errors;
}

/**
 * Validates a forecast data point
 * @param forecast - The forecast data point to validate
 * @returns Array of validation errors, empty if valid
 */
export function validateForecastDataPoint(forecast: Partial<ForecastDataPoint>): WeatherDataValidationError[] {
  const errors = validateCurrentWeather(forecast);

  if (forecast.precipitationProbability !== undefined && 
      (forecast.precipitationProbability < 0 || forecast.precipitationProbability > 1)) {
    errors.push({
      field: 'precipitationProbability',
      message: 'Precipitation probability must be between 0 and 1',
      value: forecast.precipitationProbability
    });
  }

  return errors;
}

/**
 * Validates a daily forecast
 * @param forecast - The daily forecast to validate
 * @returns Array of validation errors, empty if valid
 */
export function validateDailyForecast(forecast: Partial<DailyForecast>): WeatherDataValidationError[] {
  const errors: WeatherDataValidationError[] = [];

  if (!forecast.date) {
    errors.push({
      field: 'date',
      message: 'Date is required',
      value: forecast.date
    });
  } else if (!/^\d{4}-\d{2}-\d{2}$/.test(forecast.date)) {
    errors.push({
      field: 'date',
      message: 'Date must be in YYYY-MM-DD format',
      value: forecast.date
    });
  }

  if (!forecast.timestamp) {
    errors.push({
      field: 'timestamp',
      message: 'Timestamp is required',
      value: forecast.timestamp
    });
  }

  if (forecast.minTemperature === undefined || forecast.minTemperature === null) {
    errors.push({
      field: 'minTemperature',
      message: 'Minimum temperature is required',
      value: forecast.minTemperature
    });
  }

  if (forecast.maxTemperature === undefined || forecast.maxTemperature === null) {
    errors.push({
      field: 'maxTemperature',
      message: 'Maximum temperature is required',
      value: forecast.maxTemperature
    });
  }

  if (forecast.minTemperature !== undefined && forecast.maxTemperature !== undefined && 
      forecast.minTemperature > forecast.maxTemperature) {
    errors.push({
      field: 'temperature',
      message: 'Minimum temperature cannot be greater than maximum temperature',
      value: { min: forecast.minTemperature, max: forecast.maxTemperature }
    });
  }

  // Check other required fields
  if (forecast.humidity === undefined || forecast.humidity === null) {
    errors.push({
      field: 'humidity',
      message: 'Humidity is required',
      value: forecast.humidity
    });
  } else if (forecast.humidity < 0 || forecast.humidity > 100) {
    errors.push({
      field: 'humidity',
      message: 'Humidity must be between 0 and 100',
      value: forecast.humidity
    });
  }

  if (forecast.windSpeed === undefined || forecast.windSpeed === null) {
    errors.push({
      field: 'windSpeed',
      message: 'Wind speed is required',
      value: forecast.windSpeed
    });
  } else if (forecast.windSpeed < 0) {
    errors.push({
      field: 'windSpeed',
      message: 'Wind speed cannot be negative',
      value: forecast.windSpeed
    });
  }

  if (!forecast.description) {
    errors.push({
      field: 'description',
      message: 'Weather description is required',
      value: forecast.description
    });
  }

  if (!forecast.icon) {
    errors.push({
      field: 'icon',
      message: 'Weather icon is required',
      value: forecast.icon
    });
  }

  if (forecast.precipitation === undefined || forecast.precipitation === null) {
    errors.push({
      field: 'precipitation',
      message: 'Precipitation is required',
      value: forecast.precipitation
    });
  } else if (forecast.precipitation < 0) {
    errors.push({
      field: 'precipitation',
      message: 'Precipitation cannot be negative',
      value: forecast.precipitation
    });
  }

  // Optional fields with constraints
  if (forecast.precipitationProbability !== undefined && 
      (forecast.precipitationProbability < 0 || forecast.precipitationProbability > 1)) {
    errors.push({
      field: 'precipitationProbability',
      message: 'Precipitation probability must be between 0 and 1',
      value: forecast.precipitationProbability
    });
  }

  if (forecast.sunrise !== undefined && forecast.sunset !== undefined && 
      forecast.sunrise > forecast.sunset) {
    errors.push({
      field: 'sunriseSunset',
      message: 'Sunrise time cannot be after sunset time',
      value: { sunrise: forecast.sunrise, sunset: forecast.sunset }
    });
  }

  return errors;
}

/**
 * Validates calculated weather metrics
 * @param metrics - The calculated weather metrics to validate
 * @returns Array of validation errors, empty if valid
 */
export function validateCalculatedMetrics(metrics: Partial<CalculatedWeatherMetrics>): WeatherDataValidationError[] {
  const errors: WeatherDataValidationError[] = [];

  if (metrics.heatIndex === undefined || metrics.heatIndex === null) {
    errors.push({
      field: 'heatIndex',
      message: 'Heat index is required',
      value: metrics.heatIndex
    });
  }

  if (metrics.heatIndexScore === undefined || metrics.heatIndexScore === null) {
    errors.push({
      field: 'heatIndexScore',
      message: 'Heat index score is required',
      value: metrics.heatIndexScore
    });
  } else if (metrics.heatIndexScore < 0) {
    errors.push({
      field: 'heatIndexScore',
      message: 'Heat index score cannot be negative',
      value: metrics.heatIndexScore
    });
  }

  if (metrics.apparentTemperature === undefined || metrics.apparentTemperature === null) {
    errors.push({
      field: 'apparentTemperature',
      message: 'Apparent temperature is required',
      value: metrics.apparentTemperature
    });
  }

  return errors;
}

/**
 * Validates complete weather data
 * @param weatherData - The complete weather data to validate
 * @returns Array of validation errors, empty if valid
 */
export function validateCompleteWeatherData(weatherData: Partial<CompleteWeatherData>): WeatherDataValidationError[] {
  const errors: WeatherDataValidationError[] = [];

  // Validate location
  if (!weatherData.location) {
    errors.push({
      field: 'location',
      message: 'Location is required',
      value: weatherData.location
    });
  } else {
    errors.push(...validateLocation(weatherData.location));
  }

  // Validate current weather
  if (!weatherData.current) {
    errors.push({
      field: 'current',
      message: 'Current weather is required',
      value: weatherData.current
    });
  } else {
    errors.push(...validateCurrentWeather(weatherData.current));
  }

  // Validate calculated metrics
  if (!weatherData.calculated) {
    errors.push({
      field: 'calculated',
      message: 'Calculated metrics are required',
      value: weatherData.calculated
    });
  } else {
    errors.push(...validateCalculatedMetrics(weatherData.calculated));
  }

  // Validate daily forecast
  if (!weatherData.dailyForecast || !Array.isArray(weatherData.dailyForecast)) {
    errors.push({
      field: 'dailyForecast',
      message: 'Daily forecast array is required',
      value: weatherData.dailyForecast
    });
  } else if (weatherData.dailyForecast.length === 0) {
    errors.push({
      field: 'dailyForecast',
      message: 'Daily forecast array cannot be empty',
      value: weatherData.dailyForecast
    });
  } else {
    weatherData.dailyForecast.forEach((forecast, index) => {
      const forecastErrors = validateDailyForecast(forecast);
      forecastErrors.forEach(error => {
        errors.push({
          field: `dailyForecast[${index}].${error.field}`,
          message: error.message,
          value: error.value
        });
      });
    });
  }

  // Validate hourly forecast
  if (!weatherData.hourlyForecast) {
    errors.push({
      field: 'hourlyForecast',
      message: 'Hourly forecast is required',
      value: weatherData.hourlyForecast
    });
  } else if (!weatherData.hourlyForecast.hours || !Array.isArray(weatherData.hourlyForecast.hours)) {
    errors.push({
      field: 'hourlyForecast.hours',
      message: 'Hourly forecast hours array is required',
      value: weatherData.hourlyForecast.hours
    });
  } else if (weatherData.hourlyForecast.hours.length === 0) {
    errors.push({
      field: 'hourlyForecast.hours',
      message: 'Hourly forecast hours array cannot be empty',
      value: weatherData.hourlyForecast.hours
    });
  } else {
    weatherData.hourlyForecast.hours.forEach((hour, index) => {
      const hourErrors = validateForecastDataPoint(hour);
      hourErrors.forEach(error => {
        errors.push({
          field: `hourlyForecast.hours[${index}].${error.field}`,
          message: error.message,
          value: error.value
        });
      });
    });
  }

  return errors;
}

/**
 * Converts temperature from Celsius to Fahrenheit
 * @param celsius - Temperature in Celsius
 * @returns Temperature in Fahrenheit
 */
export function celsiusToFahrenheit(celsius: number): number {
  return (celsius * 9/5) + 32;
}

/**
 * Converts temperature from Fahrenheit to Celsius
 * @param fahrenheit - Temperature in Fahrenheit
 * @returns Temperature in Celsius
 */
export function fahrenheitToCelsius(fahrenheit: number): number {
  return (fahrenheit - 32) * 5/9;
}

/**
 * Formats temperature according to the specified unit
 * @param temperature - Temperature in Celsius
 * @param unit - Temperature unit ('celsius' or 'fahrenheit')
 * @returns Formatted temperature string with unit
 */
export function formatTemperature(temperature: number, unit: 'celsius' | 'fahrenheit'): string {
  if (unit === 'fahrenheit') {
    return `${Math.round(celsiusToFahrenheit(temperature))}°F`;
  }
  return `${Math.round(temperature)}°C`;
}