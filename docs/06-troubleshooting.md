# Module 6: Troubleshooting & Common Issues

**Duration**: 10 minutes  
**Focus**: Problem-solving when Copilot suggestions don't meet expectations

## Learning Objectives

By the end of this module, participants will be able to:
- **Diagnose** common issues with Copilot suggestions
- **Apply** troubleshooting strategies to improve results
- **Optimize** their workspace for better Copilot performance
- **Handle** edge cases and unexpected suggestions

## When Copilot Doesn't Cooperate

### Common Issues and Solutions

#### 1. **Poor or Irrelevant Suggestions**

**Problem**: Copilot generates code that doesn't match your intent.

**Troubleshooting Steps**:
```javascript
// ❌ Vague prompt
// Create a function

// ✅ Specific prompt  
// Create an async function that validates user email format,
// checks for uniqueness in database, and returns validation result
// with detailed error messages for different failure scenarios
```

**Solution Strategies**:
- Add more context and specificity
- Include examples of expected behavior
- Reference existing patterns in your codebase
- Break complex requests into smaller steps

#### 2. **Inconsistent Code Style**

**Problem**: Generated code doesn't match your project's conventions.

**Troubleshooting Steps**:
1. **Check .copilot-instructions.md** - Are your style guidelines clear?
2. **Open related files** - Provide style context
3. **Use explicit style prompts**

```javascript
// Following our established pattern (camelCase, async/await, JSDoc):
/**
 * Retrieves user profile data with caching
 * @param {string} userId - The user identifier
 * @returns {Promise<UserProfile>} User profile object
 */
```

#### 3. **Missing Error Handling**

**Problem**: Generated code lacks proper error handling.

**Solution**:
```javascript
// Create user registration function with comprehensive error handling:
// - Validation errors (return 400 with field-specific messages)
// - Database errors (return 500 with generic message)
// - Email service errors (log but don't fail registration)
// - Network timeouts (implement retry with exponential backoff)
```

#### 4. **Performance Issues**

**Problem**: Generated code doesn't consider performance implications.

**Solution**:
```javascript
// Create a user search function optimized for performance:
// - Use database indexes efficiently
// - Implement query result caching (Redis, 5min TTL)
// - Add pagination to limit result sets
// - Use debouncing for search-as-you-type
// - Include performance monitoring hooks
```

## Practice Exercises

### Exercise 1: Fixing Bad Suggestions

**Scenario**: You get a suggestion that's syntactically correct but doesn't meet your needs.

**Files**: `examples/troubleshooting/fix-suggestions.js`

**Your Task**:
1. Use the provided "bad" prompt
2. Identify what's wrong with the result
3. Refine your prompt using troubleshooting strategies
4. Compare the improved results

### Exercise 2: Context Debugging

**Scenario**: Copilot isn't picking up on your project patterns.

**Files**: `examples/troubleshooting/context-debug/`

**Your Task**:
1. Try generating code without context
2. Systematically add context (imports, related files, instructions)
3. Observe how suggestions improve
4. Document which context elements made the biggest difference

### Exercise 3: Suggestion Refinement

**Scenario**: Initial suggestion is close but needs refinement.

**Strategy**: Progressive prompt refinement
```javascript
// Round 1: Basic prompt
// Create a shopping cart function

// Round 2: Add specific requirements  
// Create a shopping cart function that adds items with quantity validation

// Round 3: Add business rules
// Create a shopping cart function that adds items with quantity validation,
// checks inventory availability, and calculates total with taxes and discounts

// Round 4: Add error handling and edge cases
// Extend the shopping cart function to handle out-of-stock items,
// invalid quantities, and guest vs authenticated user scenarios
```

## Advanced Troubleshooting Techniques

### 1. **Context Layering**

When suggestions aren't improving, systematically add context:

```javascript
// Layer 1: File-level context
import { User, Product, CartItem } from './types';
import { validateQuantity, checkInventory } from './utils';

// Layer 2: Business context
// Our e-commerce platform serves 10k+ daily users
// Average cart has 3-5 items, max allowed is 20 items
// We support both guest and authenticated shopping

// Layer 3: Technical context  
// Using React with Redux Toolkit for state management
// REST API with Express.js backend
// PostgreSQL with Redis caching layer

// Layer 4: Specific requirements
// Create addToCart function following the above context
```

### 2. **Iterative Prompt Engineering**

```javascript
// Iteration 1: Start simple
// Create user authentication middleware

// Iteration 2: Add specifics based on initial result
// Create user authentication middleware that validates JWT tokens
// and extracts user info for request context

// Iteration 3: Add missing requirements
// Extend the auth middleware to handle token refresh,
// rate limiting, and security logging

// Iteration 4: Handle edge cases
// Add comprehensive error handling for expired tokens,
// malformed requests, and database connection failures
```

### 3. **Pattern Reinforcement**

When Copilot doesn't follow your patterns:

```javascript
// Show the pattern explicitly:
// Example of our standard API response format:
// const successResponse = { success: true, data: result, message: 'Operation completed' };
// const errorResponse = { success: false, error: 'Error details', message: 'User-friendly message' };

// Following the above pattern, create a user creation endpoint
// that returns appropriate success/error responses
```

## Workspace Optimization

### File Organization for Better Context

```
project/
├── .copilot-instructions.md          # Project-wide guidelines
├── src/
│   ├── types/                        # Keep types visible
│   │   ├── index.ts                  # Export all types
│   │   └── user.ts                   
│   ├── utils/                        # Common utilities
│   │   ├── validation.ts             # Reusable patterns
│   │   └── api.ts                    
│   └── components/                   
│       └── auth/
│           ├── .copilot-instructions.md  # Domain-specific rules
│           └── LoginForm.tsx         
```

### .copilot-instructions.md Debugging

**Check if your instructions are working**:

1. **Create a test file** in the same directory
2. **Use a generic prompt** that should trigger your instructions
3. **Verify** the suggestions follow your guidelines
4. **Refine instructions** if needed

**Example test**:
```javascript
// Generic prompt that should trigger auth instructions:
// Create a login function

// Expected: Should follow your auth patterns
// Actual: Does it match your .copilot-instructions.md?
```

## Common Anti-Patterns

### ❌ What NOT to Do

```javascript
// Don't: Use overly generic prompts
// Create a function

// Don't: Assume Copilot knows your business logic
// Handle the payment

// Don't: Ignore errors in suggestions
// (Accept buggy code without refinement)

// Don't: Give up after first bad suggestion
// (Try different approaches)
```

### ✅ Best Practices

```javascript
// Do: Provide specific, actionable prompts
// Create an async function that processes credit card payments
// using Stripe API with proper error handling and logging

// Do: Include business context
// For our subscription service, create a payment handler that
// supports monthly/yearly billing cycles with proration

// Do: Iterate and refine
// (Build on suggestions, add requirements progressively)

// Do: Use multiple approaches
// (Try different prompt patterns if one doesn't work)
```

## Quick Reference: Troubleshooting Checklist

When Copilot suggestions aren't helpful:

- [ ] **Prompt specificity**: Is your prompt detailed enough?
- [ ] **Context availability**: Are related files open in the editor?
- [ ] **Instructions clarity**: Are your .copilot-instructions.md files clear?
- [ ] **Pattern examples**: Have you shown Copilot the pattern you want?
- [ ] **Error handling**: Did you specify error handling requirements?
- [ ] **Business rules**: Did you include relevant business context?
- [ ] **Technical constraints**: Are technology choices clear?

## Advanced Optional Exercises

For participants who want to dive deeper into troubleshooting techniques, these advanced exercises cover specific problem areas:

### Exercise 4: Style Consistency Issues
**File**: `examples/troubleshooting/style-issues.js`

**Scenario**: You have a project with established coding conventions, but Copilot suggestions don't match your style.

**Practice Areas**:
- Enforcing naming conventions (camelCase vs snake_case)
- Maintaining consistent patterns across components
- Technology-specific style requirements (React, TypeScript, etc.)
- ESLint integration and rule compliance

### Exercise 5: Architectural Pattern Enforcement
**File**: `examples/troubleshooting/pattern-consistency.js`

**Scenario**: Different files in your project use inconsistent approaches for similar functionality.

**Practice Areas**:
- Service layer patterns and API consistency
- Component architecture patterns
- Validation pattern standardization
- Error handling pattern enforcement
- Cross-file template enforcement

### Exercise 6: Comprehensive Error Handling
**File**: `examples/troubleshooting/error-handling-fixes.js`

**Scenario**: Copilot provides functional code but lacks robust error handling.

**Practice Areas**:
- Input validation and sanitization
- Network error handling with retries
- File operation error management
- Database operation fault tolerance
- User authentication error scenarios

### Exercise 7: Edge Case Coverage
**File**: `examples/troubleshooting/edge-case-scenarios.js`

**Scenario**: Initial suggestions work for happy path scenarios but fail with edge cases.

**Practice Areas**:
- Null/undefined input handling
- Data type validation and conversion
- Boundary condition testing
- Unicode and internationalization
- Performance with large datasets
- Security considerations

**How to Use These Exercises**:
1. **Study the examples** to understand common problem patterns
2. **Practice the techniques** in your own projects
3. **Compare before/after** results to see improvements
4. **Adapt the patterns** to your specific use cases

## Key Takeaways

1. **Most issues stem from insufficient context** - Add more specific details
2. **Iterative refinement works better** than expecting perfection immediately
3. **Show don't tell** - Provide examples of what you want
4. **Context is cumulative** - Build up context systematically
5. **File organization matters** - Structure your project for better context
6. **Instructions need testing** - Verify your .copilot-instructions.md work

## Next Steps

- **Practice troubleshooting** with the provided exercises
- **Try the advanced exercises** if you want deeper practice
- **Refine your .copilot-instructions.md** files

---

**💡 Remember**: Troubleshooting is a skill that improves with practice. Most "Copilot problems" are actually prompting opportunities!