// eslint.config.mjs
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default tseslint.config(
  // Base ESLint recommended configuration
  eslint.configs.recommended,
  
  // TypeScript ESLint recommended configurations with type checking
  tseslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  
  // Configure Project Service API for TypeScript integration
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
      },
    },
  },
  
  // Common ignores
  {
    ignores: ["**/node_modules/**", "**/dist/**"],
  },
  
  // Configuration for all JavaScript/TypeScript files
  {
    files: ["**/*.js", "**/*.mjs", "**/*.cjs", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    linterOptions: {
      reportUnusedDisableDirectives: "error",
    },
  },
  
  // Shared package specific rules for TypeScript files
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      // Enforce explicit return types on functions and class methods
      "@typescript-eslint/explicit-module-boundary-types": "warn",
      
      // Allow unused variables that start with underscore
      "@typescript-eslint/no-unused-vars": ["error", { 
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_" 
      }],
      
      // Warn on any type usage
      "@typescript-eslint/no-explicit-any": "warn",
      
      // Enforce consistent type imports
      "@typescript-eslint/consistent-type-imports": ["warn", {
        "prefer": "type-imports",
        "disallowTypeAnnotations": false
      }],
      
      // Enforce strict boolean expressions
      "@typescript-eslint/strict-boolean-expressions": "warn",
      
      // Enforce consistent type assertions
      "@typescript-eslint/consistent-type-assertions": ["warn", {
        "assertionStyle": "as",
        "objectLiteralTypeAssertions": "allow-as-parameter"
      }],
    },
  },
  
  // Specific rules for test files
  {
    files: ["**/__tests__/**/*.ts", "**/*.test.ts"],
    rules: {
      // Relax some rules for test files
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
    },
  }
);