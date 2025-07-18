// eslint.config.mjs
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  // Base ESLint recommended configuration
  eslint.configs.recommended,
  
  // TypeScript ESLint recommended configuration
  tseslint.configs.recommended,
  
  // Common ignores for all packages
  {
    ignores: ["**/node_modules/**", "**/dist/**", "**/.next/**"],
  },
  
  // Common configuration for all JavaScript/TypeScript files
  {
    files: ["**/*.js", "**/*.mjs", "**/*.cjs", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    linterOptions: {
      reportUnusedDisableDirectives: "error",
    },
    rules: {
      // Common rules for all JavaScript/TypeScript files
      "no-console": ["warn", { allow: ["warn", "error", "info"] }],
      "no-debugger": "warn",
      "no-duplicate-imports": "error",
      "no-unused-vars": ["error", { 
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_" 
      }],
    },
  },
  
  // TypeScript-specific configuration
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      // Override JS rules with TS-specific ones
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["error", { 
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_" 
      }],
      "@typescript-eslint/consistent-type-imports": ["warn", {
        "prefer": "type-imports",
        "disallowTypeAnnotations": false
      }],
      "@typescript-eslint/no-explicit-any": "warn",
    },
  }
);