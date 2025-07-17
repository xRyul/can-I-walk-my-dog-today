# Coding Standards

This steering file provides guidance on coding standards to be followed across the project.

## Core Principles

- **KISS (Keep It Simple, Stupid)**: Favor the simplest solution that meets the requirements
- **DRY (Don't Repeat Yourself)**: Avoid code duplication; extract reusable logic
- **YAGNI (You Ain't Gonna Need It)**: Don't implement features unless currently required
- **SOLID Principles**: Design code for maintainability, testability, and extensibility

## General Guidelines

- Use meaningful variable and function names that clearly describe their purpose
- Write unit tests for all new functionality
- Keep functions small and focused on a single responsibility
- Write self-documenting code with clear intent
- Use consistent indentation and formatting
- Follow iterative development approach with small, incremental steps

## JavaScript/TypeScript Guidelines

- Use TypeScript for all new code
- Prefer const over let, avoid var
- Use async/await instead of raw promises when possible
- Use optional chaining (?.) and nullish coalescing (??) operators
- Follow ESLint rules configured for the project
- Use functional programming patterns where appropriate

## React Guidelines

- Use functional components with hooks
- Keep components small and focused
- Use React.memo for performance optimization when needed
- Follow the container/presentational component pattern
- Use proper React key props in lists
- Manage global state with Context API or Redux

## Testing Guidelines

- Write unit tests with Jest
- Use React Testing Library for component tests
- Aim for high test coverage on critical paths
- Mock external dependencies in tests
