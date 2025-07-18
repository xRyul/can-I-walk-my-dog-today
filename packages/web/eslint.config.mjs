/**
 * Web Package ESLint Configuration
 * 
 * This configuration extends the root ESLint configuration with specific rules
 * for the web package, which uses Next.js. It preserves Next.js-specific rules
 * while maintaining consistency with the project's standardized approach.
 * 
 * Key features:
 * - Uses type-checked rules for enhanced TypeScript validation
 * - Configures Project Service API for optimal TypeScript integration
 * - Includes Next.js-specific rules and settings
 * - Provides special configurations for the App Router
 * - Includes special configurations for test files
 * 
 * This configuration ensures that the web package follows both project-wide
 * standards and Next.js best practices.
 */

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import { fileURLToPath } from "url";
import { dirname } from "path";
import nextPlugin from '@next/eslint-plugin-next';

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
  
  // Common ignores for the web package
  // Includes Next.js-specific build directories
  {
    ignores: ["**/node_modules/**", "**/dist/**", "**/.next/**"],
  },
  
  // Configuration for all JavaScript/TypeScript files
  {
    files: ["**/*.js", "**/*.mjs", "**/*.cjs", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    languageOptions: {
      ecmaVersion: "latest", // Use the latest ECMAScript features
      sourceType: "module",  // Treat all files as ES modules
      // Define globals commonly used in Next.js applications
      globals: {
        module: "readonly",
        require: "readonly",
        process: "readonly",
        __dirname: "readonly",
        __filename: "readonly"
      }
    },
    linterOptions: {
      // Report unused eslint-disable comments to keep the codebase clean
      reportUnusedDisableDirectives: "error",
    },
  },
  
  // Next.js specific configuration
  // These rules are specific to Next.js best practices
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    plugins: {
      // Include the Next.js ESLint plugin for framework-specific rules
      '@next/next': nextPlugin,
    },
    rules: {
      // Next.js specific rules
      
      // Not needed in Next.js as JSX is automatically imported
      "react/react-in-jsx-scope": "off",
      
      // We're using TypeScript instead of PropTypes
      "react/prop-types": "off",
      
      // Next.js plugin rules for best practices and performance
      
      // Enforce using Link component instead of plain <a> tags for internal navigation
      "@next/next/no-html-link-for-pages": "error",
      
      // Encourage using next/image instead of plain <img> tags
      "@next/next/no-img-element": "warn",
      
      // Prevent unnecessary polyfills that increase bundle size
      "@next/next/no-unwanted-polyfillio": "warn",
      
      // Prevent synchronous scripts that can block rendering
      "@next/next/no-sync-scripts": "error",
      
      // Prevent title tags in _document.js (should be in _app.js or page components)
      "@next/next/no-title-in-document-head": "error",
      
      // Ensure Google Fonts use display=swap for better performance
      "@next/next/google-font-display": "warn",
      
      // Ensure preconnect is used with Google Fonts for better performance
      "@next/next/google-font-preconnect": "warn",
      
      // Ensure Google Analytics uses the Next.js Script component
      "@next/next/next-script-for-ga": "warn",
      
      // Ensure before-interactive scripts are only in _document.js
      "@next/next/no-before-interactive-script-outside-document": "warn",
      
      // Prevent using <style> or <link rel="stylesheet"> (use CSS Modules or styled-jsx)
      "@next/next/no-css-tags": "warn",
      
      // Prevent using <head> directly (use next/head instead)
      "@next/next/no-head-element": "warn",
      
      // Prevent custom fonts in pages (use _document.js or _app.js)
      "@next/next/no-page-custom-font": "warn",
      
      // Prevent styled-jsx in _document.js
      "@next/next/no-styled-jsx-in-document": "warn",
      
      // Catch common typos in Next.js features
      "@next/next/no-typos": "warn",
    },
    settings: {
      // Automatically detect React version
      react: {
        version: "detect",
      },
      // Set the root directory for Next.js-specific features
      next: {
        rootDir: __dirname,
      },
    },
  },
  
  // TypeScript-specific configuration
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
      "@typescript-eslint/consistent-type-imports": ["warn", {
        "prefer": "type-imports",
        "disallowTypeAnnotations": false
      }],
      
      // Discourage the use of "any" type to maintain type safety
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
  
  // Specific rules for test files
  // Test files often need more flexibility with types
  {
    files: ["**/__tests__/**/*.ts", "**/*.test.ts", "**/__tests__/**/*.tsx", "**/*.test.tsx"],
    rules: {
      // Relax some rules for test files to allow for easier mocking
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
    },
  },
  
  // App directory specific rules
  // These rules are specific to Next.js App Router
  {
    files: ["**/app/**/*.ts", "**/app/**/*.tsx"],
    rules: {
      // Enforce using next/head instead of <head> in App Router
      // This is particularly important in the App Router architecture
      "@next/next/no-head-element": "error",
    },
  }
);