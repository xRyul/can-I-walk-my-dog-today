/**
 * Shared Package ESLint Configuration
 * 
 * This configuration extends the root ESLint configuration with specific rules
 * for the shared package. The shared package contains common utilities, services,
 * and types used by both the web and mobile applications.
 * 
 * Key features:
 * - Uses type-checked rules for enhanced TypeScript validation
 * - Configures Project Service API for optimal TypeScript integration
 * - Enforces stricter type safety rules appropriate for shared code
 * - Includes special configurations for test files
 * 
 * This configuration is designed to ensure that shared code maintains high
 * quality standards as it's used across multiple packages.
 */

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import { fileURLToPath } from "url";
import { dirname } from "path";

// Get the current directory for TypeScript project resolution
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default tseslint.config(
  // Base ESLint recommended configuration
  // Includes standard JavaScript best practices
  eslint.configs.recommended,
  
  // TypeScript ESLint recommended configurations with type checking
  // These configurations provide increasingly strict TypeScript rules
  tseslint.configs.recommended,          // Basic TypeScript rules
  tseslint.configs.recommendedTypeChecked, // Rules that require type information
  tseslint.configs.stylisticTypeChecked,   // Style rules that require type information
  
  // Configure Project Service API for TypeScript integration
  // This enables more efficient type checking for ESLint
  {
    languageOptions: {
      parserOptions: {
        // Enable Project Service API for better performance and accuracy
        projectService: true,
        // Set the root directory for resolving tsconfig.json
        tsconfigRootDir: __dirname,
      },
    },
  },
  
  // Common ignores for the shared package
  {
    ignores: ["**/node_modules/**", "**/dist/**"],
  },
  
  // Configuration for all JavaScript/TypeScript files
  {
    files: ["**/*.js", "**/*.mjs", "**/*.cjs", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    languageOptions: {
      ecmaVersion: "latest", // Use the latest ECMAScript features
      sourceType: "module",  // Treat all files as ES modules
    },
    linterOptions: {
      // Report unused eslint-disable comments to keep the codebase clean
      reportUnusedDisableDirectives: "error",
    },
  },
  
  // Shared package specific rules for TypeScript files
  // These rules are tailored for the shared package's requirements
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      // Enforce explicit return types on functions and class methods
      // This improves API documentation and type safety for consumers
      "@typescript-eslint/explicit-module-boundary-types": "warn",
      
      // Allow unused variables that start with underscore
      // This is a common convention for intentionally unused variables
      "@typescript-eslint/no-unused-vars": ["error", { 
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_" 
      }],
      
      // Warn on any type usage to maintain type safety
      // Particularly important in shared code used by multiple packages
      "@typescript-eslint/no-explicit-any": "warn",
      
      // Enforce consistent type imports for better code organization
      "@typescript-eslint/consistent-type-imports": ["warn", {
        "prefer": "type-imports",
        "disallowTypeAnnotations": false
      }],
      
      // Enforce strict boolean expressions to prevent common bugs
      // This catches issues like using objects in boolean contexts
      "@typescript-eslint/strict-boolean-expressions": "warn",
      
      // Enforce consistent type assertions for better readability
      // Prefer the 'as' syntax over angle brackets
      "@typescript-eslint/consistent-type-assertions": ["warn", {
        "assertionStyle": "as",
        "objectLiteralTypeAssertions": "allow-as-parameter"
      }],
    },
  },
  
  // Specific rules for test files
  // Test files often need more flexibility with types
  {
    files: ["**/__tests__/**/*.ts", "**/*.test.ts"],
    rules: {
      // Relax some rules for test files to allow for easier mocking
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
    },
  }
);