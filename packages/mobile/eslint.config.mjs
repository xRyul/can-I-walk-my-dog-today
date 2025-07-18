/**
 * Mobile Package ESLint Configuration
 * 
 * This configuration extends the root ESLint configuration with specific rules
 * for the mobile package, which uses React Native and Expo. It preserves React Native
 * specific rules while maintaining consistency with the project's standardized approach.
 * 
 * Key features:
 * - Uses type-checked rules for enhanced TypeScript validation
 * - Configures Project Service API for optimal TypeScript integration
 * - Includes React Native-specific rules and settings
 * - Enforces mobile development best practices
 * 
 * This configuration ensures that the mobile package follows both project-wide
 * standards and React Native best practices.
 */

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import { fileURLToPath } from "url";
import { dirname } from "path";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import reactNativePlugin from "eslint-plugin-react-native";

// Get the current directory for TypeScript project resolution
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Note: We're not directly importing the root config as it would cause circular dependencies
// Instead, we're replicating the common configuration patterns from the root config

export default tseslint.config(
  // Base configurations - following the standardized approach from root config
  // Includes standard JavaScript best practices
  eslint.configs.recommended,
  
  // Type-checked rules for better TypeScript integration (Requirement 2.1)
  // These configurations provide increasingly strict TypeScript rules
  tseslint.configs.recommendedTypeChecked, // Rules that require type information
  tseslint.configs.stylisticTypeChecked,   // Style rules that require type information

  // TypeScript configuration with Project Service API (Requirement 2.2)
  // This enables more efficient type checking for ESLint
  {
    languageOptions: {
      parserOptions: {
        // Using Project Service API for better TypeScript integration
        // This improves performance and accuracy of type-checked rules
        projectService: true,
        // Set the root directory for resolving tsconfig.json
        tsconfigRootDir: __dirname,
      },
    },
  },

  // React and React Native configuration (Requirement 3.2)
  // These rules are specific to React Native development
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    plugins: {
      // Include React and React Native specific plugins
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "react-native": reactNativePlugin, // React Native specific plugin
    },
    settings: {
      // Automatically detect React version
      react: {
        version: "detect",
      },
    },
    rules: {
      // React rules
      
      // Not needed in React 19+ as JSX is automatically imported
      "react/react-in-jsx-scope": "off",
      
      // We're using TypeScript instead of PropTypes
      "react/prop-types": "off",
      
      // TypeScript handles undefined variables better than ESLint
      "no-undef": "off",

      // React Native specific rules (Requirement 3.2)
      
      // Detects unused StyleSheet rules to keep styles clean
      // This helps prevent style bloat and improves performance
      "react-native/no-unused-styles": "error",
      
      // Prevents inline styles in components for better maintainability
      // Encourages using StyleSheet for better performance
      "react-native/no-inline-styles": "warn",
      
      // Prevents color literals in styles for better maintainability
      // Encourages using a theme or constants for colors
      "react-native/no-color-literals": "warn",
      
      // Ensures text is wrapped in Text components
      // This is important for accessibility and platform consistency
      "react-native/no-raw-text": [
        "error",
        {
          skip: ["Text"], // Allow raw text in Text components
        },
      ],
      
      // Prevents style arrays with a single element for better performance
      // This optimizes the style resolution process
      "react-native/no-single-element-style-arrays": "error",
    },
  },

  // TypeScript-specific rules
  // These rules apply only to TypeScript files
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      // Enforce explicit return types on functions and class methods
      // This improves API documentation and type safety
      "@typescript-eslint/explicit-module-boundary-types": "warn",
      
      // Allow unused variables that start with underscore
      // This is a common convention for intentionally unused variables
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
    },
  }
);
