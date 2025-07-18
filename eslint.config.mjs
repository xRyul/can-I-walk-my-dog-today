/**
 * Root ESLint Configuration
 * 
 * This is the root-level ESLint configuration that provides a consistent base
 * for all packages in the "Can I Walk My Dog Today?" application. It uses the
 * modern flat configuration format with the unified typescript-eslint approach.
 * 
 * Key features:
 * - Uses ESLint v9.31.0
 * - Implements the unified typescript-eslint package
 * - Provides common rules that apply to all packages
 * - Configures standard ignores for build artifacts and dependencies
 * 
 * This configuration serves as the foundation that package-specific
 * configurations extend and customize as needed.
 */

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  // Base ESLint recommended configuration
  // This includes standard JavaScript best practices
  eslint.configs.recommended,
  
  // TypeScript ESLint recommended configuration
  // Adds TypeScript-specific linting rules without type checking
  tseslint.configs.recommended,
  
  // Common ignores for all packages
  // These patterns are excluded from linting across the entire project
  {
    ignores: ["**/node_modules/**", "**/dist/**", "**/.next/**"],
  },
  
  // Common configuration for all JavaScript/TypeScript files
  // These rules apply to all JS/TS files across all packages
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
    rules: {
      // Common rules for all JavaScript/TypeScript files
      
      // Warn on console usage except for specific methods
      // This helps catch debugging code that shouldn't be committed
      "no-console": ["warn", { allow: ["warn", "error", "info"] }],
      
      // Warn on debugger statements that might be left in the code
      "no-debugger": "warn",
      
      // Prevent duplicate imports which can cause confusion
      "no-duplicate-imports": "error",
      
      // Allow unused variables that start with underscore
      // This is a common convention for intentionally unused variables
      "no-unused-vars": ["error", { 
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_" 
      }],
    },
  },
  
  // TypeScript-specific configuration
  // These rules only apply to TypeScript files
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      // Turn off the JavaScript version of no-unused-vars
      // We use the TypeScript-specific version instead for better accuracy
      "no-unused-vars": "off",
      
      // TypeScript version of the unused vars rule
      // Maintains the same underscore convention as the JS rule
      "@typescript-eslint/no-unused-vars": ["error", { 
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_" 
      }],
      
      // Enforce consistent type imports for better code organization
      // Prefer "import type" syntax for type-only imports
      "@typescript-eslint/consistent-type-imports": ["warn", {
        "prefer": "type-imports",
        "disallowTypeAnnotations": false
      }],
      
      // Discourage the use of "any" type to maintain type safety
      "@typescript-eslint/no-explicit-any": "warn",
    },
  }
);