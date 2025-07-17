/**
 * User preferences models
 * These interfaces define the structure of user preferences and profiles
 */

import { Location, TemperatureUnit } from './weather';

/**
 * Dog coat type enumeration
 */
export enum DogCoatType {
  /** Short coat (e.g., Boxer, Beagle) */
  SHORT = 'short',
  /** Medium coat (e.g., Border Collie, Australian Shepherd) */
  MEDIUM = 'medium',
  /** Long coat (e.g., Golden Retriever, Shih Tzu) */
  LONG = 'long',
  /** Double coat (e.g., Husky, Malamute) */
  DOUBLE = 'double',
  /** Wire coat (e.g., Jack Russell Terrier, Schnauzer) */
  WIRE = 'wire',
  /** Curly coat (e.g., Poodle, Bichon Frise) */
  CURLY = 'curly',
  /** Hairless (e.g., Chinese Crested, Xoloitzcuintli) */
  HAIRLESS = 'hairless'
}

/**
 * Dog coat color enumeration
 */
export enum DogCoatColor {
  /** White or cream colored coat */
  WHITE = 'white',
  /** Light colored coat (tan, yellow, etc.) */
  LIGHT = 'light',
  /** Medium colored coat (brown, red, etc.) */
  MEDIUM = 'medium',
  /** Dark colored coat (black, dark brown, etc.) */
  DARK = 'dark',
  /** Mixed colors */
  MIXED = 'mixed'
}

/**
 * Dog health factor enumeration
 */
export enum DogHealthFactor {
  /** Brachycephalic (flat-faced) breeds */
  BRACHYCEPHALIC = 'brachycephalic',
  /** Overweight */
  OVERWEIGHT = 'overweight',
  /** Heart condition */
  HEART_CONDITION = 'heart_condition',
  /** Respiratory issues */
  RESPIRATORY_ISSUES = 'respiratory_issues',
  /** Arthritis or joint issues */
  ARTHRITIS = 'arthritis',
  /** Elderly */
  ELDERLY = 'elderly',
  /** Puppy */
  PUPPY = 'puppy',
  /** Pregnant or nursing */
  PREGNANT_NURSING = 'pregnant_nursing',
  /** Recent surgery or illness */
  RECENT_SURGERY_ILLNESS = 'recent_surgery_illness',
  /** Heat acclimated */
  HEAT_ACCLIMATED = 'heat_acclimated',
  /** Cold acclimated */
  COLD_ACCLIMATED = 'cold_acclimated'
}

/**
 * Dog size enumeration
 */
export enum DogSize {
  /** Toy breeds (up to 10 pounds) */
  TOY = 'toy',
  /** Small breeds (11-25 pounds) */
  SMALL = 'small',
  /** Medium breeds (26-50 pounds) */
  MEDIUM = 'medium',
  /** Large breeds (51-90 pounds) */
  LARGE = 'large',
  /** Giant breeds (over 90 pounds) */
  GIANT = 'giant'
}

/**
 * Dog profile interface
 * Represents a dog's characteristics that affect heat tolerance
 */
export interface DogProfile {
  /** Unique identifier for the dog profile */
  id: string;
  /** Dog's name */
  name: string;
  /** Dog's breed or mix */
  breed?: string;
  /** Dog's size category */
  size: DogSize;
  /** Dog's age in years */
  age: number;
  /** Dog's coat type */
  coatType: DogCoatType;
  /** Dog's coat color */
  coatColor: DogCoatColor;
  /** Health factors that affect heat tolerance */
  healthFactors: DogHealthFactor[];
  /** Whether the dog is acclimated to heat */
  isHeatAcclimated: boolean;
  /** Notes about the dog */
  notes?: string;
  /** Date when the profile was created */
  createdAt: number;
  /** Date when the profile was last updated */
  updatedAt: number;
}

/**
 * Location history entry interface
 * Represents a saved or recent location
 */
export interface LocationHistoryEntry {
  /** Location information */
  location: Location;
  /** Whether this is a favorite/saved location */
  isFavorite: boolean;
  /** Custom name for this location (e.g., "Home", "Work") */
  customName?: string;
  /** Date when this location was last used */
  lastUsed: number;
}

/**
 * Display preferences interface
 * Represents user preferences for the application display
 */
export interface DisplayPreferences {
  /** Temperature unit preference */
  temperatureUnit: TemperatureUnit;
  /** Whether to show the heat index */
  showHeatIndex: boolean;
  /** Whether to show the apparent temperature */
  showApparentTemperature: boolean;
  /** Whether to show the WBGT */
  showWBGT: boolean;
  /** Whether to use dark mode */
  useDarkMode: boolean;
  /** Whether to show detailed explanations */
  showDetailedExplanations: boolean;
  /** Whether to show educational content */
  showEducationalContent: boolean;
}

/**
 * Activity preferences interface
 * Represents user preferences for different activities
 */
export interface ActivityPreferences {
  /** Whether the user does general walking */
  doesGeneralWalking: boolean;
  /** Whether the user does canicross */
  doesCanicross: boolean;
  /** Whether the user does bikejoring */
  doesBikejoring: boolean;
  /** Whether the user does scooter/rig activities */
  doesScooterRig: boolean;
  /** Custom safety thresholds for activities */
  customThresholds?: {
    /** Custom general walking thresholds */
    generalWalking?: {
      /** Maximum temperature (°C) for safe walking */
      maxSafeTemperature?: number;
      /** Maximum temperature (°C) for cautious walking */
      maxCautionTemperature?: number;
    };
    /** Custom canicross thresholds */
    canicross?: {
      /** Maximum apparent temperature (°C) for safe activity */
      maxSafeApparentTemperature?: number;
      /** Maximum apparent temperature (°C) for cautious activity */
      maxCautionApparentTemperature?: number;
    };
    /** Custom bikejoring thresholds */
    bikejoring?: {
      /** Maximum apparent temperature (°C) for safe activity */
      maxSafeApparentTemperature?: number;
      /** Maximum apparent temperature (°C) for cautious activity */
      maxCautionApparentTemperature?: number;
    };
    /** Custom scooter/rig thresholds */
    scooterRig?: {
      /** Maximum apparent temperature (°C) for safe activity */
      maxSafeApparentTemperature?: number;
      /** Maximum apparent temperature (°C) for cautious activity */
      maxCautionApparentTemperature?: number;
    };
  };
}

/**
 * Notification preferences interface
 * Represents user preferences for notifications
 */
export interface NotificationPreferences {
  /** Whether to enable notifications */
  enableNotifications: boolean;
  /** Whether to notify about dangerous conditions */
  notifyDangerousConditions: boolean;
  /** Whether to notify about optimal walking times */
  notifyOptimalTimes: boolean;
  /** Whether to notify about forecast changes */
  notifyForecastChanges: boolean;
  /** Quiet hours start time (24-hour format, e.g., 22 for 10 PM) */
  quietHoursStart?: number;
  /** Quiet hours end time (24-hour format, e.g., 7 for 7 AM) */
  quietHoursEnd?: number;
}

/**
 * Subscription status interface
 * Represents the user's subscription status
 */
export interface SubscriptionStatus {
  /** Whether the user has an active subscription */
  isSubscribed: boolean;
  /** Subscription type */
  subscriptionType: 'free' | 'trial' | 'paid';
  /** Date when the subscription started */
  startDate?: number;
  /** Date when the subscription expires */
  expiryDate?: number;
  /** Whether the subscription will auto-renew */
  autoRenew?: boolean;
  /** Promo code used (if any) */
  promoCode?: string;
}

/**
 * Complete user preferences interface
 * Combines all user preference data
 */
export interface UserPreferences {
  /** Unique identifier for the user */
  userId: string;
  /** Dog profiles */
  dogProfiles: DogProfile[];
  /** Currently selected dog profile ID */
  currentDogProfileId?: string;
  /** Location history */
  locationHistory: LocationHistoryEntry[];
  /** Default location */
  defaultLocation?: Location;
  /** Display preferences */
  displayPreferences: DisplayPreferences;
  /** Activity preferences */
  activityPreferences: ActivityPreferences;
  /** Notification preferences */
  notificationPreferences: NotificationPreferences;
  /** Subscription status */
  subscriptionStatus: SubscriptionStatus;
  /** Date when preferences were last updated */
  lastUpdated: number;
}

/**
 * User input validation error
 * Represents an error that occurred during user input validation
 */
export interface UserInputValidationError {
  /** Field that failed validation */
  field: string;
  /** Error message */
  message: string;
  /** Value that failed validation */
  value: any;
}

/**
 * Validates a dog profile
 * @param profile - The dog profile to validate
 * @returns Array of validation errors, empty if valid
 */
export function validateDogProfile(profile: Partial<DogProfile>): UserInputValidationError[] {
  const errors: UserInputValidationError[] = [];

  if (!profile.id) {
    errors.push({
      field: 'id',
      message: 'Dog profile ID is required',
      value: profile.id
    });
  }

  if (!profile.name) {
    errors.push({
      field: 'name',
      message: 'Dog name is required',
      value: profile.name
    });
  }

  if (!profile.size) {
    errors.push({
      field: 'size',
      message: 'Dog size is required',
      value: profile.size
    });
  } else if (!Object.values(DogSize).includes(profile.size as DogSize)) {
    errors.push({
      field: 'size',
      message: 'Invalid dog size',
      value: profile.size
    });
  }

  if (profile.age === undefined || profile.age === null) {
    errors.push({
      field: 'age',
      message: 'Dog age is required',
      value: profile.age
    });
  } else if (profile.age < 0 || profile.age > 30) {
    errors.push({
      field: 'age',
      message: 'Dog age must be between 0 and 30 years',
      value: profile.age
    });
  }

  if (!profile.coatType) {
    errors.push({
      field: 'coatType',
      message: 'Dog coat type is required',
      value: profile.coatType
    });
  } else if (!Object.values(DogCoatType).includes(profile.coatType as DogCoatType)) {
    errors.push({
      field: 'coatType',
      message: 'Invalid dog coat type',
      value: profile.coatType
    });
  }

  if (!profile.coatColor) {
    errors.push({
      field: 'coatColor',
      message: 'Dog coat color is required',
      value: profile.coatColor
    });
  } else if (!Object.values(DogCoatColor).includes(profile.coatColor as DogCoatColor)) {
    errors.push({
      field: 'coatColor',
      message: 'Invalid dog coat color',
      value: profile.coatColor
    });
  }

  if (!profile.healthFactors || !Array.isArray(profile.healthFactors)) {
    errors.push({
      field: 'healthFactors',
      message: 'Health factors must be an array',
      value: profile.healthFactors
    });
  } else {
    for (const factor of profile.healthFactors) {
      if (!Object.values(DogHealthFactor).includes(factor as DogHealthFactor)) {
        errors.push({
          field: 'healthFactors',
          message: `Invalid health factor: ${factor}`,
          value: factor
        });
      }
    }
  }

  if (profile.isHeatAcclimated === undefined) {
    errors.push({
      field: 'isHeatAcclimated',
      message: 'Heat acclimation status is required',
      value: profile.isHeatAcclimated
    });
  }

  return errors;
}

/**
 * Validates location history entry
 * @param entry - The location history entry to validate
 * @returns Array of validation errors, empty if valid
 */
export function validateLocationHistoryEntry(entry: Partial<LocationHistoryEntry>): UserInputValidationError[] {
  const errors: UserInputValidationError[] = [];

  if (!entry.location) {
    errors.push({
      field: 'location',
      message: 'Location is required',
      value: entry.location
    });
  } else if (!entry.location.name || entry.location.lat === undefined || entry.location.lon === undefined) {
    errors.push({
      field: 'location',
      message: 'Location must have name, latitude, and longitude',
      value: entry.location
    });
  }

  if (entry.isFavorite === undefined) {
    errors.push({
      field: 'isFavorite',
      message: 'Favorite status is required',
      value: entry.isFavorite
    });
  }

  if (!entry.lastUsed) {
    errors.push({
      field: 'lastUsed',
      message: 'Last used timestamp is required',
      value: entry.lastUsed
    });
  }

  return errors;
}

/**
 * Validates display preferences
 * @param preferences - The display preferences to validate
 * @returns Array of validation errors, empty if valid
 */
export function validateDisplayPreferences(preferences: Partial<DisplayPreferences>): UserInputValidationError[] {
  const errors: UserInputValidationError[] = [];

  if (!preferences.temperatureUnit) {
    errors.push({
      field: 'temperatureUnit',
      message: 'Temperature unit is required',
      value: preferences.temperatureUnit
    });
  } else if (preferences.temperatureUnit !== 'celsius' && preferences.temperatureUnit !== 'fahrenheit') {
    errors.push({
      field: 'temperatureUnit',
      message: 'Temperature unit must be either celsius or fahrenheit',
      value: preferences.temperatureUnit
    });
  }

  const booleanFields: (keyof DisplayPreferences)[] = [
    'showHeatIndex',
    'showApparentTemperature',
    'showWBGT',
    'useDarkMode',
    'showDetailedExplanations',
    'showEducationalContent'
  ];

  for (const field of booleanFields) {
    if (preferences[field] === undefined) {
      errors.push({
        field,
        message: `${field} preference is required`,
        value: preferences[field]
      });
    }
  }

  return errors;
}

/**
 * Validates activity preferences
 * @param preferences - The activity preferences to validate
 * @returns Array of validation errors, empty if valid
 */
export function validateActivityPreferences(preferences: Partial<ActivityPreferences>): UserInputValidationError[] {
  const errors: UserInputValidationError[] = [];

  const booleanFields: (keyof ActivityPreferences)[] = [
    'doesGeneralWalking',
    'doesCanicross',
    'doesBikejoring',
    'doesScooterRig'
  ];

  for (const field of booleanFields) {
    if (preferences[field] === undefined) {
      errors.push({
        field,
        message: `${field} preference is required`,
        value: preferences[field]
      });
    }
  }

  // Custom thresholds are optional, but if provided, validate their values
  if (preferences.customThresholds) {
    const { customThresholds } = preferences;
    
    if (customThresholds.generalWalking) {
      if (customThresholds.generalWalking.maxSafeTemperature !== undefined && 
          customThresholds.generalWalking.maxCautionTemperature !== undefined &&
          customThresholds.generalWalking.maxSafeTemperature > customThresholds.generalWalking.maxCautionTemperature) {
        errors.push({
          field: 'customThresholds.generalWalking',
          message: 'Safe temperature threshold cannot be higher than caution threshold',
          value: customThresholds.generalWalking
        });
      }
    }

    if (customThresholds.canicross) {
      if (customThresholds.canicross.maxSafeApparentTemperature !== undefined && 
          customThresholds.canicross.maxCautionApparentTemperature !== undefined &&
          customThresholds.canicross.maxSafeApparentTemperature > customThresholds.canicross.maxCautionApparentTemperature) {
        errors.push({
          field: 'customThresholds.canicross',
          message: 'Safe temperature threshold cannot be higher than caution threshold',
          value: customThresholds.canicross
        });
      }
    }

    if (customThresholds.bikejoring) {
      if (customThresholds.bikejoring.maxSafeApparentTemperature !== undefined && 
          customThresholds.bikejoring.maxCautionApparentTemperature !== undefined &&
          customThresholds.bikejoring.maxSafeApparentTemperature > customThresholds.bikejoring.maxCautionApparentTemperature) {
        errors.push({
          field: 'customThresholds.bikejoring',
          message: 'Safe temperature threshold cannot be higher than caution threshold',
          value: customThresholds.bikejoring
        });
      }
    }

    if (customThresholds.scooterRig) {
      if (customThresholds.scooterRig.maxSafeApparentTemperature !== undefined && 
          customThresholds.scooterRig.maxCautionApparentTemperature !== undefined &&
          customThresholds.scooterRig.maxSafeApparentTemperature > customThresholds.scooterRig.maxCautionApparentTemperature) {
        errors.push({
          field: 'customThresholds.scooterRig',
          message: 'Safe temperature threshold cannot be higher than caution threshold',
          value: customThresholds.scooterRig
        });
      }
    }
  }

  return errors;
}

/**
 * Validates notification preferences
 * @param preferences - The notification preferences to validate
 * @returns Array of validation errors, empty if valid
 */
export function validateNotificationPreferences(preferences: Partial<NotificationPreferences>): UserInputValidationError[] {
  const errors: UserInputValidationError[] = [];

  const booleanFields: (keyof NotificationPreferences)[] = [
    'enableNotifications',
    'notifyDangerousConditions',
    'notifyOptimalTimes',
    'notifyForecastChanges'
  ];

  for (const field of booleanFields) {
    if (preferences[field] === undefined) {
      errors.push({
        field,
        message: `${field} preference is required`,
        value: preferences[field]
      });
    }
  }

  // Quiet hours are optional, but if one is provided, both should be provided
  if ((preferences.quietHoursStart !== undefined && preferences.quietHoursEnd === undefined) ||
      (preferences.quietHoursStart === undefined && preferences.quietHoursEnd !== undefined)) {
    errors.push({
      field: 'quietHours',
      message: 'Both quiet hours start and end must be provided',
      value: { start: preferences.quietHoursStart, end: preferences.quietHoursEnd }
    });
  }

  // Validate quiet hours values if provided
  if (preferences.quietHoursStart !== undefined && preferences.quietHoursEnd !== undefined) {
    if (preferences.quietHoursStart < 0 || preferences.quietHoursStart > 23) {
      errors.push({
        field: 'quietHoursStart',
        message: 'Quiet hours start must be between 0 and 23',
        value: preferences.quietHoursStart
      });
    }

    if (preferences.quietHoursEnd < 0 || preferences.quietHoursEnd > 23) {
      errors.push({
        field: 'quietHoursEnd',
        message: 'Quiet hours end must be between 0 and 23',
        value: preferences.quietHoursEnd
      });
    }
  }

  return errors;
}

/**
 * Validates subscription status
 * @param status - The subscription status to validate
 * @returns Array of validation errors, empty if valid
 */
export function validateSubscriptionStatus(status: Partial<SubscriptionStatus>): UserInputValidationError[] {
  const errors: UserInputValidationError[] = [];

  if (status.isSubscribed === undefined) {
    errors.push({
      field: 'isSubscribed',
      message: 'Subscription status is required',
      value: status.isSubscribed
    });
  }

  if (!status.subscriptionType) {
    errors.push({
      field: 'subscriptionType',
      message: 'Subscription type is required',
      value: status.subscriptionType
    });
  } else if (!['free', 'trial', 'paid'].includes(status.subscriptionType)) {
    errors.push({
      field: 'subscriptionType',
      message: 'Subscription type must be free, trial, or paid',
      value: status.subscriptionType
    });
  }

  // If paid or trial, start and expiry dates should be provided
  if (status.subscriptionType === 'paid' || status.subscriptionType === 'trial') {
    if (!status.startDate) {
      errors.push({
        field: 'startDate',
        message: 'Start date is required for paid or trial subscriptions',
        value: status.startDate
      });
    }

    if (!status.expiryDate) {
      errors.push({
        field: 'expiryDate',
        message: 'Expiry date is required for paid or trial subscriptions',
        value: status.expiryDate
      });
    }

    if (status.startDate && status.expiryDate && status.startDate > status.expiryDate) {
      errors.push({
        field: 'dates',
        message: 'Start date cannot be after expiry date',
        value: { start: status.startDate, expiry: status.expiryDate }
      });
    }

    if (status.subscriptionType === 'paid' && status.autoRenew === undefined) {
      errors.push({
        field: 'autoRenew',
        message: 'Auto-renew status is required for paid subscriptions',
        value: status.autoRenew
      });
    }
  }

  return errors;
}

/**
 * Validates complete user preferences
 * @param preferences - The user preferences to validate
 * @returns Array of validation errors, empty if valid
 */
export function validateUserPreferences(preferences: Partial<UserPreferences>): UserInputValidationError[] {
  const errors: UserInputValidationError[] = [];

  if (!preferences.userId) {
    errors.push({
      field: 'userId',
      message: 'User ID is required',
      value: preferences.userId
    });
  }

  if (!preferences.dogProfiles || !Array.isArray(preferences.dogProfiles)) {
    errors.push({
      field: 'dogProfiles',
      message: 'Dog profiles must be an array',
      value: preferences.dogProfiles
    });
  } else {
    preferences.dogProfiles.forEach((profile, index) => {
      const profileErrors = validateDogProfile(profile);
      profileErrors.forEach(error => {
        errors.push({
          field: `dogProfiles[${index}].${error.field}`,
          message: error.message,
          value: error.value
        });
      });
    });
  }

  if (preferences.currentDogProfileId && 
      preferences.dogProfiles && 
      !preferences.dogProfiles.some(profile => profile.id === preferences.currentDogProfileId)) {
    errors.push({
      field: 'currentDogProfileId',
      message: 'Current dog profile ID must match an existing dog profile',
      value: preferences.currentDogProfileId
    });
  }

  if (!preferences.locationHistory || !Array.isArray(preferences.locationHistory)) {
    errors.push({
      field: 'locationHistory',
      message: 'Location history must be an array',
      value: preferences.locationHistory
    });
  } else {
    preferences.locationHistory.forEach((entry, index) => {
      const entryErrors = validateLocationHistoryEntry(entry);
      entryErrors.forEach(error => {
        errors.push({
          field: `locationHistory[${index}].${error.field}`,
          message: error.message,
          value: error.value
        });
      });
    });
  }

  if (!preferences.displayPreferences) {
    errors.push({
      field: 'displayPreferences',
      message: 'Display preferences are required',
      value: preferences.displayPreferences
    });
  } else {
    const displayErrors = validateDisplayPreferences(preferences.displayPreferences);
    displayErrors.forEach(error => {
      errors.push({
        field: `displayPreferences.${error.field}`,
        message: error.message,
        value: error.value
      });
    });
  }

  if (!preferences.activityPreferences) {
    errors.push({
      field: 'activityPreferences',
      message: 'Activity preferences are required',
      value: preferences.activityPreferences
    });
  } else {
    const activityErrors = validateActivityPreferences(preferences.activityPreferences);
    activityErrors.forEach(error => {
      errors.push({
        field: `activityPreferences.${error.field}`,
        message: error.message,
        value: error.value
      });
    });
  }

  if (!preferences.notificationPreferences) {
    errors.push({
      field: 'notificationPreferences',
      message: 'Notification preferences are required',
      value: preferences.notificationPreferences
    });
  } else {
    const notificationErrors = validateNotificationPreferences(preferences.notificationPreferences);
    notificationErrors.forEach(error => {
      errors.push({
        field: `notificationPreferences.${error.field}`,
        message: error.message,
        value: error.value
      });
    });
  }

  if (!preferences.subscriptionStatus) {
    errors.push({
      field: 'subscriptionStatus',
      message: 'Subscription status is required',
      value: preferences.subscriptionStatus
    });
  } else {
    const subscriptionErrors = validateSubscriptionStatus(preferences.subscriptionStatus);
    subscriptionErrors.forEach(error => {
      errors.push({
        field: `subscriptionStatus.${error.field}`,
        message: error.message,
        value: error.value
      });
    });
  }

  if (!preferences.lastUpdated) {
    errors.push({
      field: 'lastUpdated',
      message: 'Last updated timestamp is required',
      value: preferences.lastUpdated
    });
  }

  return errors;
}