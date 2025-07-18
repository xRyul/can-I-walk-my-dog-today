/**
 * This file contains intentional ESLint violations to test the ESLint configuration
 */

// Missing return type (should trigger @typescript-eslint/explicit-module-boundary-types)
export function missingReturnType(value: string) {
  return value.toUpperCase();
}

// Using any type (should trigger @typescript-eslint/no-explicit-any)
export function usingAnyType(value: any) {
  return value.someProperty;
}

// Unused variable (should trigger @typescript-eslint/no-unused-vars)
export function unusedVariable() {
  const unusedVar = 'This variable is not used';
  return 'result';
}

// Unused variable with underscore prefix (should NOT trigger @typescript-eslint/no-unused-vars)
export function unusedVariableWithUnderscore() {
  const _unusedVar = 'This variable is not used but has underscore prefix';
  return 'result';
}

// Non-strict boolean expression (should trigger @typescript-eslint/strict-boolean-expressions)
export function nonStrictBoolean(value: string | null) {
  if (value) {
    return true;
  }
  return false;
}

// Inconsistent type assertion (should trigger @typescript-eslint/consistent-type-assertions)
export function inconsistentTypeAssertion(value: unknown) {
  const result = <string>value;
  return result;
}

// Type import (should be fine with @typescript-eslint/consistent-type-imports)
import { WeatherServiceOptions } from '../types/weather';

// Value import (should trigger @typescript-eslint/consistent-type-imports)
import { WeatherServiceErrorType } from '../services/weatherService';