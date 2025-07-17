---
inclusion: fileMatch
fileMatchPattern: '*.tsx|*.jsx'
---

# React Component Guidelines

This steering file provides specific guidance for React component files.

## Component Structure

- Use functional components with hooks instead of class components
- Keep components focused on a single responsibility
- Extract reusable logic into custom hooks
- Split large components into smaller, more manageable pieces
- Use proper TypeScript interfaces for props and state

## Component Organization

```tsx
// Imports
import React, { useState, useEffect } from 'react';
import { SomeComponent } from './SomeComponent';

// Types/Interfaces
interface Props {
  title: string;
  onAction: () => void;
}

// Component
export const MyComponent: React.FC<Props> = ({ title, onAction }) => {
  // State hooks
  const [isActive, setIsActive] = useState(false);
  
  // Effect hooks
  useEffect(() => {
    // Side effects here
  }, []);
  
  // Event handlers
  const handleClick = () => {
    setIsActive(!isActive);
    onAction();
  };
  
  // Helper functions
  const getClassName = () => isActive ? 'active' : 'inactive';
  
  // Render
  return (
    <div className={getClassName()}>
      <h2>{title}</h2>
      <button onClick={handleClick}>Toggle</button>
    </div>
  );
};
```

## Performance Optimization

- Use React.memo for components that render often with the same props
- Use useCallback for functions passed as props to memoized components
- Use useMemo for expensive calculations
- Avoid unnecessary re-renders by keeping state as local as possible
- Use proper key props in lists (avoid using index as key when possible)

## Styling Approaches

- Prefer CSS modules or styled-components for component styling
- Keep styles close to the components they apply to
- Use theme variables for consistent styling
- Consider responsive design from the start

## Naming Conventions

- **Files**: Use explicit and self-explanatory filenames that reflect their contents
  - Component files should be named after the component they contain (e.g., `Button.tsx`, `UserProfile.tsx`)
  - For specialized components, use prefixes that indicate their purpose (e.g., `button_Submit.tsx`, `form_Login.tsx`)
- **Components**: Use PascalCase for component names (e.g., `SubmitButton`, `UserProfile`)
- **Variables/Props**: Use camelCase and descriptive names that clearly indicate purpose

## Documentation

- Add JSDoc comments for component props and important functions
- Include a brief description at the top of each component explaining its purpose
- Document complex logic or algorithms with step-by-step explanations
- Provide context for why certain patterns or libraries were chosen
- Write code as if explaining to someone learning React

```tsx
/**
 * UserProfile - Displays and allows editing of user information
 * 
 * This component handles both display and edit modes for user profiles.
 * We chose to combine these modes in one component because:
 * 1. They share the same data model
 * 2. The toggle between modes is frequent
 * 3. It simplifies state management
 * 
 * @param {User} user - The user object containing profile information
 * @param {boolean} editable - Whether the profile should be editable
 * @param {Function} onSave - Callback function when profile is saved
 */
```