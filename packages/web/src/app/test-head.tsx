// This file is for testing Next.js App Router specific ESLint rules
import React from 'react';

export default function TestHead() {
  return (
    // This should trigger @next/next/no-head-element in app directory
    <head>
      <title>Test Page</title>
    </head>
  );
}