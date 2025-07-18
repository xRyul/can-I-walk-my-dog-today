/**
 * Calculation Engine
 * 
 * This file contains utility functions for calculating various weather metrics
 * related to dog walking safety.
 */

/**
 * Calculate heat index using the Rothfusz regression equation
 * 
 * @param temperature - Temperature in Celsius
 * @param humidity - Relative humidity (0-100)
 * @returns Heat index in Celsius
 */
export function calculateHeatIndex(temperature: number, humidity: number): number {
  // Convert Celsius to Fahrenheit for the calculation
  const tempF = (temperature * 9/5) + 32;
  const rh = humidity;

  // Rothfusz regression equation
  let heatIndexF = 0.5 * (tempF + 61.0 + ((tempF - 68.0) * 1.2) + (rh * 0.094));

  // If the heat index is greater than 80F, use the full regression equation
  if (heatIndexF > 80) {
    heatIndexF = -42.379 + 
                 2.04901523 * tempF + 
                 10.14333127 * rh - 
                 0.22475541 * tempF * rh - 
                 0.00683783 * tempF * tempF - 
                 0.05481717 * rh * rh + 
                 0.00122874 * tempF * tempF * rh + 
                 0.00085282 * tempF * rh * rh - 
                 0.00000199 * tempF * tempF * rh * rh;
  }

  // Convert back to Celsius
  return (heatIndexF - 32) * 5/9;
}

/**
 * Calculate heat index score
 * 
 * @param temperature - Temperature in Celsius
 * @param humidity - Relative humidity (0-100)
 * @returns Heat index score (Humidity % × Temperature °C)
 */
export function calculateHeatIndexScore(temperature: number, humidity: number): number {
  return humidity * temperature;
}

/**
 * Calculate apparent temperature using the Australian Bureau of Meteorology formula
 * 
 * @param temperature - Temperature in Celsius
 * @param humidity - Relative humidity (0-100)
 * @param windSpeed - Wind speed in meters per second
 * @returns Apparent temperature in Celsius
 */
export function calculateApparentTemperature(
  temperature: number, 
  humidity: number, 
  windSpeed: number
): number {
  // Calculate water vapor pressure (hPa)
  const e = calculateWaterVaporPressure(temperature, humidity);
  
  // Australian Bureau of Meteorology formula
  const apparentTemperature = temperature + 0.33 * e - 0.70 * windSpeed - 4.00;
  
  return apparentTemperature;
}

/**
 * Calculate water vapor pressure from humidity
 * 
 * @param temperature - Temperature in Celsius
 * @param humidity - Relative humidity (0-100)
 * @returns Water vapor pressure in hPa
 */
export function calculateWaterVaporPressure(temperature: number, humidity: number): number {
  // Calculate saturation vapor pressure first
  const saturationVaporPressure = 6.105 * Math.exp((17.27 * temperature) / (237.7 + temperature));
  
  // Calculate actual vapor pressure
  const vaporPressure = (humidity / 100) * saturationVaporPressure;
  
  return vaporPressure;
}

/**
 * Estimate WBGT (Wet Bulb Globe Temperature) when direct measurement is not available
 * 
 * @param temperature - Temperature in Celsius
 * @param humidity - Relative humidity (0-100)
 * @param windSpeed - Wind speed in meters per second
 * @param solarRadiation - Solar radiation in W/m² (optional)
 * @returns Estimated WBGT in Celsius
 */
export function estimateWBGT(
  temperature: number, 
  humidity: number, 
  windSpeed: number,
  solarRadiation?: number
): number {
  // Calculate wet bulb temperature
  const wetBulbTemp = calculateWetBulbTemperature(temperature, humidity);
  
  // If solar radiation is available, use it to estimate globe temperature
  let globeTemp = temperature;
  if (solarRadiation !== undefined) {
    // Simple estimation of globe temperature based on solar radiation
    // This is a simplified model and not as accurate as actual measurements
    globeTemp = temperature + (solarRadiation / 1000) * 3;
  } else {
    // If no solar radiation data, estimate based on temperature and humidity
    // This is a very rough approximation
    globeTemp = temperature * 1.1;
  }
  
  // WBGT outdoor = 0.7 * wet bulb temp + 0.2 * globe temp + 0.1 * dry bulb temp
  const wbgt = 0.7 * wetBulbTemp + 0.2 * globeTemp + 0.1 * temperature;
  
  return wbgt;
}

/**
 * Calculate wet bulb temperature
 * 
 * @param temperature - Temperature in Celsius
 * @param humidity - Relative humidity (0-100)
 * @returns Wet bulb temperature in Celsius
 */
export function calculateWetBulbTemperature(temperature: number, humidity: number): number {
  // This is a simplified calculation of wet bulb temperature
  // For more accuracy, iterative methods should be used
  
  // Calculate vapor pressure (not directly used in this simplified formula but kept for reference)
  // const vaporPressure = calculateWaterVaporPressure(temperature, humidity);
  
  // Simplified formula for wet bulb temperature
  const wetBulbTemp = temperature * Math.atan(0.151977 * Math.sqrt(humidity + 8.313659)) 
                    + Math.atan(temperature + humidity) 
                    - Math.atan(humidity - 1.676331) 
                    + 0.00391838 * Math.pow(humidity, 3/2) * Math.atan(0.023101 * humidity) 
                    - 4.686035;
  
  return wetBulbTemp;
}

/**
 * Evaluate weather conditions against safety thresholds
 * 
 * @param temperature - Temperature in Celsius
 * @param humidity - Relative humidity (0-100)
 * @param heatIndex - Heat index in Celsius
 * @param heatIndexScore - Heat index score
 * @param apparentTemperature - Apparent temperature in Celsius
 * @param activityType - Type of activity ('general_walking', 'canicross', 'bikejoring', 'scooter_rig')
 * @returns Safety level ('safe', 'caution', 'unsafe')
 */
export function evaluateSafetyLevel(
  temperature: number,
  humidity: number,
  heatIndex: number,
  heatIndexScore: number,
  apparentTemperature: number,
  activityType: 'general_walking' | 'canicross' | 'bikejoring' | 'scooter_rig'
): 'safe' | 'caution' | 'unsafe' {
  // Default thresholds based on the design document
  const thresholds = {
    general_walking: {
      maxSafeTemperature: 25,
      maxCautionTemperature: 30,
      maxSafeHeatIndex: 27,
      maxCautionHeatIndex: 32,
      maxSafeHeatIndexScore: 800,
      maxCautionHeatIndexScore: 1000
    },
    canicross: {
      maxSafeApparentTemperature: 18,
      maxCautionApparentTemperature: 21.5
    },
    bikejoring: {
      maxSafeApparentTemperature: 15,
      maxCautionApparentTemperature: 17.5
    },
    scooter_rig: {
      maxSafeApparentTemperature: 10,
      maxCautionApparentTemperature: 14.5
    }
  };
  
  // Evaluate based on activity type
  if (activityType === 'general_walking') {
    // For general walking, consider multiple factors
    if (
      temperature > thresholds.general_walking.maxCautionTemperature ||
      heatIndex > thresholds.general_walking.maxCautionHeatIndex ||
      heatIndexScore > thresholds.general_walking.maxCautionHeatIndexScore
    ) {
      return 'unsafe';
    } else if (
      temperature > thresholds.general_walking.maxSafeTemperature ||
      heatIndex > thresholds.general_walking.maxSafeHeatIndex ||
      heatIndexScore > thresholds.general_walking.maxSafeHeatIndexScore
    ) {
      return 'caution';
    } else {
      return 'safe';
    }
  } else {
    // For other activities, primarily use apparent temperature
    const activityThresholds = thresholds[activityType];
    
    if (apparentTemperature > activityThresholds.maxCautionApparentTemperature) {
      return 'unsafe';
    } else if (apparentTemperature > activityThresholds.maxSafeApparentTemperature) {
      return 'caution';
    } else {
      return 'safe';
    }
  }
}