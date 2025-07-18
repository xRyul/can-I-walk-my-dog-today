// This file is for testing ESLint rules
import React from 'react';

// This should trigger the Next.js rule for using <a> instead of Link
export default function TestComponent() {
  return (
    <div>
      <h1>Test Component</h1>
      {/* This should trigger @next/next/no-html-link-for-pages */}
      <a href="/about">About</a>
      
      {/* This should trigger @next/next/no-img-element */}
      <img src="/test.png" alt="Test" />
    </div>
  );
}

// This should trigger the no-unused-vars rule
const unusedVariable = 'test';