# Tech Stack

This steering file provides a comprehensive overview of the technology stack used in the "Can I Walk My Dog Today?" application. It serves as a reference for development and ensures consistency across the project.

## Frontend Technologies

### Web Application

- **Next.js**: Version 15.4.1
  - React framework for server-rendered applications
  - Using Edge Runtime for API routes
  - Supports React Server Components
- **React**: Version 19.0.0
  - JavaScript library for building user interfaces
  - Using the latest hooks including `useActionState` (replacing `useFormState`)
- **TypeScript**: Version 5.4+
  - Strongly typed programming language that builds on JavaScript
  - Provides type safety across the entire application
- **Tailwind CSS**: Version 4.1.10
  - Utility-first CSS framework
  - Using the new CSS-based configuration approach
  - Requires `@tailwindcss/postcss` for PostCSS integration
- **TanStack Query**: Version 5.0+
  - Data fetching, caching, and state management library
  - Formerly known as React Query

### Mobile Application

- **React Native**: Version 0.80.0
  - Framework for building native mobile applications
  - Compatible with React 19
  - Requires Node.js 20+
- **Expo**: Version 52.0+
  - Platform for making universal React applications
  - Simplifies development and deployment
- **React Navigation**: Version 6.1+
  - Routing and navigation library for React Native
  - Provides stack, tab, and drawer navigation

### UI Components and Visualization

- **Mapbox GL JS**: Version 3.0+
  - Interactive, customizable maps
  - Supports vector tiles and custom styling

## Backend Technologies

- **Node.js**: Version 20
  - JavaScript runtime for server-side code
- **Next.js API Routes**: With Edge Runtime
  - Serverless API endpoints
- **TypeScript**: Latest stable version
  - For type safety in backend code

## Database and Storage

### Database

- **NeonDB**: Latest version
  - Serverless PostgreSQL database
- **Drizzle ORM**: Latest stable version
  - TypeScript ORM for database operations

### Client-Side Storage

- **Web**:
  - Local Storage
  - IndexedDB
- **Mobile**:
  - AsyncStorage
  - SecureStore

## Mobile Technologies

- **WidgetKit**: Latest version
  - For iOS home screen widgets
- **Android Widgets**: Latest implementation
  - For Android home screen widgets
- **React Native**: Latest stable version
  - For cross-platform mobile development

## Testing and Quality Assurance

- **Jest**: Version 29.7.0
  - JavaScript testing framework
  - Supports React 19 and Next.js 15
- **React Testing Library**: Version 14.1.2
  - Testing utilities for React components
  - Compatible with React 19
- **End-to-End Testing**: Playwright 1.40+
  - Modern end-to-end testing framework
  - Supports multiple browsers
- **Accessibility Testing**: WCAG 2.1 AA compliance
  - Using axe-core 4.8.2 for automated testing

## DevOps and Deployment

- **Vercel**: Latest platform version
  - For hosting and serverless function execution
  - Continuous deployment pipeline
- **App Store**: Latest submission requirements
  - For iOS app distribution
- **Google Play Store**: Latest submission requirements
  - For Android app distribution
- **Git**: Latest version
  - For version control

## Third-party Services and APIs

- **Weather API**: Provider not specified
  - Options include OpenWeatherMap, WeatherAPI, etc.
- **App Store In-App Purchase API**: Latest version
  - For iOS monetization
- **Google Play Billing Library**: Latest version
  - For Android monetization
- **Payment Processor**: Not specified
  - Likely Stripe or similar for web purchases

## Development Tools

- **TypeScript**: Latest stable version
  - For type safety across the project
- **ESLint**: Version 9.31.0
  - For code linting and enforcing coding standards
  - Using flat configuration format (eslint.config.mjs)
  - Integrated with unified typescript-eslint v8 package
  - Uses the modern tseslint.config() approach (no separate parser/plugin packages needed)
  - Configured with type-aware linting rules and Project Service API
  - Hierarchical configuration with:
    - Root-level configuration providing common rules for all packages
    - Package-specific configurations extending the root configuration
    - Framework-specific rules preserved (Next.js, React Native)
  - Standardized across all packages (web, mobile, shared)
  - Updated whenever ESLint configurations change
- **Prettier**: Latest stable version (inferred)
  - For code formatting
- **NPM/Yarn**: Latest stable version (inferred)
  - For package management

## MCP Servers

- **Sequential Thinking**: `@modelcontextprotocol/server-sequential-thinking`
  - For step-by-step reasoning
- **Context7**: `@upstash/context7-mcp`
  - For documentation and context retrieval
- **Puppeteer**: `@modelcontextprotocol/server-puppeteer`
  - For browser automation

## Version Management Strategy

- Keep all dependencies updated to their latest stable versions unless specific version constraints exist
- Regularly check for security vulnerabilities in dependencies
- Use Context7 MCP to verify that tools and libraries are up-to-date
- Document any version constraints or compatibility issues in this file

## ESLint Configuration Approach

The project uses a standardized ESLint configuration approach across all packages:

### Configuration Structure

- **Root Configuration**: Located at `eslint.config.mjs` in the project root
  - Provides base rules and settings common to all packages
  - Configures ignores for common directories (node_modules, dist, .next)
  - Uses the unified typescript-eslint package

- **Package-Specific Configurations**: Located in each package directory
  - Web package: `packages/web/eslint.config.mjs`
  - Mobile package: `packages/mobile/eslint.config.mjs`
  - Shared package: `packages/shared/eslint.config.mjs`
  - Each extends the root configuration and adds package-specific rules

### Key Features

- **TypeScript Integration**:
  - All TypeScript files are linted with type-checked rules
  - Uses Project Service API for better TypeScript integration
  - Properly configured with appropriate tsconfig references

- **Framework-Specific Rules**:
  - Next.js-specific rules preserved in the web package
  - React Native-specific rules preserved in the mobile package
  - Package-specific rules properly integrated with the standardized configuration

- **Maintenance**:
  - Common rules defined in one place (root configuration)
  - Package-specific configurations clearly show which rules extend or override the root
  - Documentation updated whenever ESLint configurations change

### Adding New Packages

When adding a new package to the project:

1. Ensure it uses ESLint v9.31.0
2. Add the unified typescript-eslint package as a dependency
3. Create an `eslint.config.mjs` file that extends the root configuration
4. Configure package-specific rules as needed
5. Include type-checked rules if the package uses TypeScript

## Adding New Technologies

When adding new technologies to the project:

1. Update this steering file with the new technology
2. Include the version being used
3. Provide a brief description of its purpose
4. Document any specific configuration requirements
5. Consider compatibility with existing technologies
6. Evaluate the impact on build size and performance
