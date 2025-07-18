// Test file for ESLint root configuration
const unusedVariable = "This should trigger a warning";
console.log("This should trigger a warning for console.log");
debugger; // This should trigger a warning

// Duplicate imports (should trigger an error)
import { useState } from 'react';
import { useState as useStateAgain } from 'react';

// Function with unused arguments (should be allowed with _ prefix)
function testFunction(param, _ignored) {
  return param + 1;
}

export default testFunction;