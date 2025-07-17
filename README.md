# Can I Walk My Dog Today?

A cross-platform application to check if weather conditions are safe for walking your dog.

## Project Structure

This is a monorepo containing three packages:

- `packages/web`: Next.js 15 web application
- `packages/mobile`: React Native mobile application with Expo
- `packages/shared`: Shared code between web and mobile

## Requirements

- Node.js 20+
- npm 10+

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the web application:

```bash
npm run web
```

3. Start the mobile application:

```bash
npm run mobile
```

## Technologies Used

- **Web**: Next.js 15, React 19, Tailwind CSS 4, TanStack Query 5
- **Mobile**: React Native 0.80, Expo 52, React Navigation 6
- **Shared**: TypeScript 5.4
- **API**: Next.js API Routes with Edge Runtime
- **Deployment**: Vercel

## Development

- Run `npm run build:shared` to build the shared package
- Run `npm run build:web` to build the web application
- Run `npm test` to run tests for all packages