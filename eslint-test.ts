// Test file for ESLint root configuration with TypeScript
const unusedVariable = "This should trigger a warning";
console.log("This should trigger a warning for console.log");
debugger; // This should trigger a warning

// Duplicate imports (should trigger an error)
import { useState } from 'react';
import { useState as useStateAgain } from 'react';

// Function with unused arguments (should be allowed with _ prefix)
function testFunction(param: number, _ignored: string): number {
  return param + 1;
}

// TypeScript-specific rules
const anyValue: any = "This should trigger a warning for explicit any";

// Should warn about preferring type imports
import { Component } from 'react';
// Should be: import type { Component } from 'react';

export default testFunction;