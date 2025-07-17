/**
 * Recommendation data models
 * These interfaces define the structure of activity recommendations based on weather conditions
 */

/**
 * Safety level enumeration
 * Defines the safety levels for dog activities
 */
export enum SafetyLevel {
  /** Safe to proceed with normal activity */
  SAFE = 'safe',
  /** Proceed with caution, modify activity */
  CAUTION = 'caution',
  /** Unsafe, avoid activity */
  UNSAFE = 'unsafe'
}

/**
 * Activity type enumeration
 * Defines the types of activities that can be recommended
 */
export enum ActivityType {
  /** General walking */
  GENERAL_WALKING = 'general_walking',
  /** Canicross (running with dogs) */
  CANICROSS = 'canicross',
  /** Bikejoring (biking with dogs) */
  BIKEJORING = 'bikejoring',
  /** Scooter or rig activities with dogs */
  SCOOTER_RIG = 'scooter_rig'
}

/**
 * Base recommendation interface
 * Common properties for all recommendations
 */
export interface BaseRecommendation {
  /** Safety level of the activity */
  safetyLevel: SafetyLevel;
  /** Primary recommendation message */
  recommendation: string;
  /** Detailed explanation of the recommendation */
  explanation: string;
  /** Timestamp when the recommendation was generated */
  timestamp: number;
  /** Weather metrics that influenced this recommendation */
  influencingFactors: {
    /** Primary weather metric that influenced the recommendation */
    primaryFactor: string;
    /** Value of the primary factor */
    primaryValue: number;
    /** Additional factors that influenced the recommendation */
    additionalFactors?: Record<string, number>;
  };
}

/**
 * Activity-specific recommendation interface
 * Extends the base recommendation with activity-specific details
 */
export interface ActivityRecommendation extends BaseRecommendation {
  /** Type of activity this recommendation is for */
  activityType: ActivityType;
  /** Maximum recommended duration in minutes (if applicable) */
  maxDuration?: number;
  /** Maximum recommended distance in kilometers (if applicable) */
  maxDistance?: number;
  /** Specific safety tips for this activity */
  safetyTips: string[];
  /** Threshold values used to determine safety level */
  thresholds: {
    /** Threshold for safe conditions */
    safe: number;
    /** Threshold for caution conditions */
    caution: number;
    /** Threshold for unsafe conditions */
    unsafe: number;
  };
}

/**
 * Optimal time recommendation interface
 * Represents a recommended time period for dog activities
 */
export interface OptimalTimeRecommendation {
  /** Start time as Unix timestamp */
  startTime: number;
  /** End time as Unix timestamp */
  endTime: number;
  /** Safety level during this time period */
  safetyLevel: SafetyLevel;
  /** Recommendation message for this time period */
  recommendation: string;
  /** Weather conditions during this time period */
  conditions: {
    /** Average temperature in Celsius */
    avgTemperature: number;
    /** Average humidity percentage */
    avgHumidity: number;
    /** Average heat index in Celsius */
    avgHeatIndex: number;
    /** Other relevant conditions */
    [key: string]: number | string;
  };
}

/**
 * Complete recommendation data interface
 * Combines all recommendations for different activities
 */
export interface CompleteRecommendationData {
  /** General walking recommendation */
  generalWalking: ActivityRecommendation;
  /** Activity-specific recommendations */
  activities: {
    /** Canicross recommendation */
    canicross: ActivityRecommendation;
    /** Bikejoring recommendation */
    bikejoring: ActivityRecommendation;
    /** Scooter/Rig recommendation */
    scooterRig: ActivityRecommendation;
  };
  /** Optimal times for activities in the forecast period */
  optimalTimes: OptimalTimeRecommendation[];
  /** Warning messages if conditions are dangerous */
  warnings: string[];
  /** Timestamp when these recommendations were generated */
  generatedAt: number;
  /** Version of the recommendation algorithm used */
  algorithmVersion: string;
}

/**
 * Safety threshold configuration interface
 * Defines the thresholds for different safety levels for each activity
 */
export interface SafetyThresholds {
  /** General walking thresholds */
  generalWalking: {
    /** Maximum temperature (°C) for safe walking */
    maxSafeTemperature: number;
    /** Maximum temperature (°C) for cautious walking */
    maxCautionTemperature: number;
    /** Maximum heat index for safe walking */
    maxSafeHeatIndex: number;
    /** Maximum heat index for cautious walking */
    maxCautionHeatIndex: number;
    /** Maximum heat index score for safe walking */
    maxSafeHeatIndexScore: number;
    /** Maximum heat index score for cautious walking */
    maxCautionHeatIndexScore: number;
  };
  /** Canicross thresholds */
  canicross: {
    /** Maximum apparent temperature (°C) for safe activity */
    maxSafeApparentTemperature: number;
    /** Maximum apparent temperature (°C) for cautious activity */
    maxCautionApparentTemperature: number;
  };
  /** Bikejoring thresholds */
  bikejoring: {
    /** Maximum apparent temperature (°C) for safe activity */
    maxSafeApparentTemperature: number;
    /** Maximum apparent temperature (°C) for cautious activity */
    maxCautionApparentTemperature: number;
  };
  /** Scooter/Rig thresholds */
  scooterRig: {
    /** Maximum apparent temperature (°C) for safe activity */
    maxSafeApparentTemperature: number;
    /** Maximum apparent temperature (°C) for cautious activity */
    maxCautionApparentTemperature: number;
  };
}

/**
 * Default safety thresholds based on the design document
 */
export const DEFAULT_SAFETY_THRESHOLDS: SafetyThresholds = {
  generalWalking: {
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
  scooterRig: {
    maxSafeApparentTemperature: 10,
    maxCautionApparentTemperature: 14.5
  }
};