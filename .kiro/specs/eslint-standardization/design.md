# Design Document: ESLint Standardization

## Overview

This document outlines the design for standardizing ESLint configurations across all packages in the "Can I Walk My Dog Today?" application. The goal is to create a consistent, maintainable, and effective linting setup that leverages modern ESLint features and TypeScript integration while preserving package-specific requirements.

## Architecture

The ESLint configuration architecture will follow a hierarchical approach:

1. **Root Configuration**: Provides base rules and settings common to all packages
2. **Package-Specific Configurations**: Extend the root configuration and add package-specific rules
3. **Unified TypeScript Integration**: Consistent TypeScript linting across all packages

This architecture allows for centralized management of common rules while maintaining flexibility for package-specific needs.

## Components and Interfaces

### Root ESLint Configuration

The root configuration will be defined in `eslint.config.mjs` at the project root and will:

- Use the unified typescript-eslint package
- Implement the tseslint.config() helper function
- Include basic JavaScript and TypeScript rules
- Configure ignores for common directories (node_modules, dist, .next)
- Provide a foundation that package configurations can extend

```javascript
// eslint.config.mjs (root)
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    ignores: ["**/node_modules/**", "**/dist/**", "**/.next/**"],
  },
  // Common rules for all packages
  {
    files: ["**/*.js", "**/*.mjs", "**/*.cjs", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    rules: {
      // Common rules here
    }
  }
);
```

### Package-Specific Configurations

Each package will have its own `eslint.config.mjs` that extends the root configuration and adds package-specific rules:

#### Mobile Package

```javascript
// packages/mobile/eslint.config.mjs
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
      },
    },
  },
  // React Native specific configuration
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    plugins: {
      react: (await import("eslint-plugin-react")).default,
      "react-hooks": (await import("eslint-plugin-react-hooks")).default,
      "react-native": (await import("eslint-plugin-react-native")).default,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      // React Native specific rules
    },
  }
);
```

#### Web Package

```javascript
// packages/web/eslint.config.mjs
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
      },
    },
  },
  // Next.js specific configuration
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    // Next.js specific rules and settings
  }
);
```

#### Shared Package

```javascript
// packages/shared/eslint.config.mjs
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
      },
    },
  },
  // Shared package specific rules
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      // Shared package specific rules
    },
  }
);
```

### Dependencies Management

Each package's `package.json` will be updated to include:

- ESLint v9.31.0
- The unified typescript-eslint package
- Package-specific ESLint plugins (e.g., eslint-plugin-react-native for mobile)

## Data Models

### ESLint Configuration Object Structure

```typescript
interface ESLintConfig {
  files?: string[];
  ignores?: string[];
  languageOptions?: {
    parser?: any;
    parserOptions?: {
      projectService?: boolean | {
        allowDefaultProject?: string[];
      };
      tsconfigRootDir?: string;
    };
    globals?: Record<string, string>;
  };
  plugins?: Record<string, any>;
  settings?: Record<string, any>;
  rules?: Record<string, any>;
  linterOptions?: {
    reportUnusedDisableDirectives?: boolean | "error" | "warn";
  };
}
```

## Error Handling

- ESLint configurations will include appropriate error levels (error, warn, off) for different rule types
- Type-checked rules will be properly configured to avoid false positives
- Package-specific error handling will be maintained

## Testing Strategy

1. **Linting Tests**: Run ESLint on each package to verify configurations work correctly
2. **Integration Tests**: Ensure root and package configurations work together properly
3. **Rule Coverage Tests**: Verify that all required rules are applied correctly
4. **Edge Case Tests**: Test linting on complex code patterns to ensure rules work as expected

## Implementation Considerations

### Migration Strategy

1. Update dependencies in all package.json files first
2. Implement the root configuration
3. Update each package configuration one at a time
4. Test each package after updating its configuration
5. Update documentation to reflect the new standardized approach

### Performance Considerations

- Use specific file patterns in ESLint configurations to avoid unnecessary processing
- Configure type-checked rules efficiently to minimize performance impact
- Use the Project Service API for better TypeScript integration performance

### Maintenance Considerations

- Document the ESLint configuration approach thoroughly
- Use consistent naming and structure across all configurations
- Include comments in configuration files to explain key decisions