// ============================================================================
// TROUBLESHOOTING EXERCISE: Fixing Bad Suggestions
// ============================================================================
// 
// This file contains examples of problematic prompts and their improved versions.
// Practice identifying issues and applying troubleshooting strategies.

// ============================================================================
// EXERCISE 1: Vague Prompts
// ============================================================================

// ❌ BAD PROMPT - Try this first and observe the generic result:
// Create a function

// Expected Issues:
// - Generic, non-specific code
// - Missing business context
// - No error handling
// - Doesn't fit specific use case

// ✅ IMPROVED PROMPT - Try this after the bad prompt:
// Create a user registration validation function for our e-commerce platform that:
// - Validates email format using RFC 5322 standard
// - Enforces password requirements (8+ chars, 1 uppercase, 1 number, 1 special char)
// - Checks username availability against existing user database
// - Returns detailed validation results with field-specific error messages
// - Handles international characters in user names
// - Integrates with our existing User model and database service

// ============================================================================
// EXERCISE 2: Missing Context
// ============================================================================

// ❌ BAD PROMPT - Try this and notice how it doesn't fit your architecture:
// Add authentication to this endpoint
async function getUserData(req, res) {
  const userData = await database.users.find({ active: true });
  res.json(userData);
}

// Expected Issues:
// - Assumes authentication pattern you don't use
// - Doesn't match your middleware structure
// - Missing your specific security requirements

// ✅ IMPROVED PROMPT - Provide architectural context:
// Add authentication to this Express.js endpoint following our patterns:
// - Use our existing JWT middleware (require valid token in Authorization header)
// - Extract user info from token and add to req.user
// - Return 401 with our standard error format for invalid/missing tokens
// - Include rate limiting (max 100 requests per hour per user)
// - Log authentication attempts for security monitoring
// - Follow our existing error response structure: { success: false, error: string, message: string }
//
async function getUserData(req, res) {
  const userData = await database.users.find({ active: true });
  res.json(userData);
}

// ============================================================================
// EXERCISE 3: Performance Issues
// ============================================================================

// ❌ BAD PROMPT - Results in inefficient code:
// Make this search faster
function searchProducts(query) {
  return products.filter(p => p.name.includes(query) || p.description.includes(query));
}

// Expected Issues:
// - No consideration of data size
// - Missing indexing strategy
// - No caching mechanism
// - Inefficient string matching

// ✅ IMPROVED PROMPT - Specify performance requirements:
// Optimize this product search function for our e-commerce catalog (50k+ products):
// - Implement efficient text search using indexed fields
// - Add result caching with Redis (5-minute TTL)
// - Use fuzzy matching for typo tolerance
// - Limit results to 50 items with pagination support
// - Include search analytics tracking
// - Handle special characters and international text
// - Prioritize exact matches over partial matches
// - Must respond within 100ms for good user experience
//
function searchProducts(query) {
  return products.filter(p => p.name.includes(query) || p.description.includes(query));
}

// ============================================================================
// EXERCISE 4: Wrong Abstraction Level
// ============================================================================

// ❌ BAD PROMPT - Too broad, results in overwhelming suggestions:
// Build a complete user management system

// Expected Issues:
// - Scope too large
// - Missing specific requirements
// - Doesn't match current development phase

// ✅ IMPROVED PROMPT - Right-sized scope:
// Create a user profile update function for our existing React user management component that:
// - Updates user profile fields (name, email, bio, avatar)
// - Validates changes before submitting to API
// - Handles form submission states (loading, success, error)
// - Integrates with our existing UserContext and validation utilities
// - Shows success notification using our toast system
// - Reverts to previous values on API errors
// - Follows our existing form component patterns

// ============================================================================
// EXERCISE 5: Style Inconsistencies
// ============================================================================

// ❌ BAD PROMPT - Doesn't specify coding style:
// Create error handling for API calls

// Expected Issues:
// - May use different error handling pattern than your project
// - Inconsistent naming conventions
// - Missing your logging/monitoring integration

// ✅ IMPROVED PROMPT - Specify style and patterns:
// Create error handling for API calls following our established patterns:
// - Use async/await (not Promises with .then/.catch)
// - Implement try-catch blocks with specific error types
// - Use camelCase naming convention
// - Include JSDoc documentation with @param and @returns
// - Log errors using our Winston logger (logger.error)
// - Return consistent error objects: { success: false, error: Error, message: string }
// - Include retry logic with exponential backoff for network errors
// - Follow our existing APIService class patterns

// ============================================================================
// YOUR TURN: Practice Problems
// ============================================================================

// PRACTICE 1: Improve this vague prompt
// ❌ BAD: "Add validation"

// Write your improved prompt here:
// ✅ IMPROVED: 


// PRACTICE 2: Add missing context to this prompt
// ❌ BAD: "Create a modal component"

// Write your improved prompt here:
// ✅ IMPROVED: 


// PRACTICE 3: Fix the scope of this overly broad prompt
// ❌ BAD: "Build a real-time chat application"

// Write your improved prompt here:
// ✅ IMPROVED: 


// ============================================================================
// TROUBLESHOOTING CHECKLIST
// ============================================================================
//
// When your Copilot suggestions aren't helpful, check:
//
// □ SPECIFICITY: Is my prompt detailed enough?
// □ CONTEXT: Have I provided relevant background?
// □ SCOPE: Is the task appropriately sized?
// □ PATTERNS: Have I referenced existing code patterns?
// □ CONSTRAINTS: Are limitations and requirements clear?
// □ EXAMPLES: Have I shown what I want?
//
// Remember: Most "bad" suggestions are actually "insufficient prompt" problems!