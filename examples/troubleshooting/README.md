# Troubleshooting Examples

**For complete instructions and guidance, see:** [docs/07-troubleshooting.md](../../docs/07-troubleshooting.md)

This folder contains examples and exercises for diagnosing and solving common issues when GitHub Copilot suggestions don't meet expectations.

## Common Issues & Solutions

### Poor Suggestions
- `fix-suggestions.js` - Examples of refining vague or incorrect prompts
- `context-debug/` - Systematically adding context to improve results

### Style Inconsistencies  
- `style-issues.js` - Handling code style mismatches
- `pattern-consistency.js` - Ensuring consistent patterns across files

### Missing Error Handling
- `error-handling-fixes.js` - Adding comprehensive error handling to suggestions
- `edge-case-scenarios.js` - Covering overlooked edge cases

## Quick Exercise

1. **Identify** the issue with provided "bad" prompts
2. **Apply** troubleshooting strategies from the documentation
3. **Compare** before and after results
4. **Document** which techniques were most effective

## Key Strategies

- **Add specificity** to vague prompts
- **Provide context** through related files and examples
- **Use iterative refinement** to progressively improve results
- **Test different prompting patterns** when one approach fails

**Next:** [Best Practices Examples](../best-practices/)
- Recovery techniques when prompts go wrong

## 🚨 Common Prompting Problems

### 1. **Vague or Generic Prompts**

#### ❌ Problem:
```javascript
// Create a function
// Add validation
// Make it better
```

#### 🔍 Symptoms:
- Generic, boilerplate code
- Missing important edge cases
- Doesn't fit your specific use case
- Requires significant manual editing

#### ✅ Solution - Be Specific:
```javascript
// Create a user registration validation function that:
// - Validates email format using RFC 5322 standard
// - Enforces password requirements (8+ chars, 1 uppercase, 1 number, 1 special)
// - Checks username availability against existing users
// - Returns detailed validation results with field-specific errors
// - Handles international characters in names
```

### 2. **Insufficient Context**

#### ❌ Problem:
```javascript
// Fix this function
function processData(data) {
  return data.map(item => item.value);
}
```

#### 🔍 Symptoms:
- Suggestions don't fit your architecture
- Code style doesn't match your project
- Missing integration with existing systems
- Doesn't handle your specific data format

#### ✅ Solution - Provide Context:
```javascript
// Context: E-commerce product catalog with nested categories
// Current data format: { id, name, price, category: { id, name, parent } }
// Need: Flatten product data for search indexing with Elasticsearch
// Must handle: missing categories, price variations, internationalization
//
// Fix this function to properly transform our product data:
function processData(data) {
  return data.map(item => item.value);
}
```

### 3. **Conflicting Requirements**

#### ❌ Problem:
```javascript
// Create a fast and simple function that handles all edge cases
// and provides comprehensive error handling but keeps it minimal
```

#### 🔍 Symptoms:
- Copilot produces overly complex solutions
- Code doesn't match stated priorities
- Conflicts between "simple" and "comprehensive"

#### ✅ Solution - Prioritize Clearly:
```javascript
// Priority 1: Performance (must handle 10k+ items efficiently)
// Priority 2: Error handling (graceful failures, no crashes)
// Priority 3: Simplicity (prefer readable over clever)
//
// Create a product search function that balances these priorities:
```

### 4. **Wrong Abstraction Level**

#### ❌ Problem:
```javascript
// Build an entire e-commerce system
```

#### 🔍 Symptoms:
- Overwhelming, unusable suggestions
- Too high-level or too detailed for your needs
- Doesn't match your current task focus

#### ✅ Solution - Match the Scope:
```javascript
// Build a product search component for our existing e-commerce React app
// that integrates with our current API endpoints and state management
```

## 🔧 Debugging Poor Suggestions

### Strategy 1: The 5-Why Analysis

When Copilot gives poor suggestions, ask yourself:

1. **Why** didn't this suggestion work?
   - *"It's too generic"*

2. **Why** is it too generic?
   - *"I didn't provide enough context"*

3. **Why** didn't I provide enough context?
   - *"I wasn't sure what context was relevant"*

4. **Why** wasn't I sure about relevant context?
   - *"I didn't think about the broader system integration"*

5. **Why** didn't I consider system integration?
   - *"I focused only on the immediate function, not its usage"*

**Solution:** Provide context about how this code fits into the larger system.

### Strategy 2: Iterative Refinement

#### Round 1 - Basic Prompt:
```javascript
// Create a cache function
```

#### Round 2 - Add Specificity:
```javascript
// Create a memory cache function with TTL (time-to-live) support
```

#### Round 3 - Add Context:
```javascript
// Create a memory cache function for our API response caching system
// with TTL support and automatic cleanup of expired entries
```

#### Round 4 - Add Constraints:
```javascript
// Create a memory cache function for our Node.js API that:
// - Supports TTL with automatic cleanup
// - Handles cache size limits (max 1000 entries)
// - Uses Map for O(1) access time
// - Provides cache hit/miss statistics
// - Integrates with our existing logging system
```

### Strategy 3: Context Elimination

If suggestions are too complex, remove context systematically:

```javascript
// TOO COMPLEX - Remove some requirements:
// Create a user authentication system with OAuth, 2FA, password recovery,
// session management, rate limiting, and audit logging

// SIMPLIFIED - Focus on core need:
// Create a basic user authentication function that validates 
// username/password against our existing user database
```

## 🩹 Recovery Techniques

### When Copilot Suggests Wrong Patterns

#### Problem: Copilot suggests class-based React components when you need functional components

```javascript
// WRONG SUGGESTION:
class UserProfile extends React.Component {
  // ...
}

// RECOVERY TECHNIQUE - Add explicit pattern guidance:
// Create a functional React component using hooks (not class-based):
const UserProfile = ({ userId }) => {
  // Now Copilot will suggest hooks-based approach
};
```

### When Suggestions Don't Match Your Architecture

#### Problem: Copilot suggests direct database queries when you have a service layer

```javascript
// WRONG SUGGESTION:
const user = await db.query('SELECT * FROM users WHERE id = ?', [userId]);

// RECOVERY - Reference existing patterns:
// Following our existing service layer pattern:
// const product = await ProductService.findById(productId);
// const order = await OrderService.create(orderData);
//
// Create user lookup using the same service pattern:
const user = // Copilot will now suggest UserService.findById(userId)
```

### When Context is Misunderstood

#### Problem: Copilot assumes wrong technology stack

```javascript
// If Copilot suggests jQuery when you're using React:

// RECOVERY - Explicitly state your stack:
// Using React with functional components and hooks (no jQuery):
// Create a dynamic form that adds/removes input fields
```

## 🎯 Prompt Improvement Checklist

Before submitting a prompt, check:

### ✅ Clarity
- [ ] Is the request specific and unambiguous?
- [ ] Are requirements clearly prioritized?
- [ ] Have I avoided conflicting instructions?

### ✅ Context  
- [ ] Have I provided relevant technical context?
- [ ] Is the business/domain context clear?
- [ ] Have I referenced existing patterns or examples?

### ✅ Constraints
- [ ] Are technical limitations specified?
- [ ] Have I mentioned performance requirements?
- [ ] Are security/compliance needs addressed?

### ✅ Scope
- [ ] Is the task appropriately sized?
- [ ] Am I asking for the right level of detail?
- [ ] Does this fit with my current workflow?

## 🧪 Practice: Debugging Bad Prompts

### Exercise 1: Fix These Problematic Prompts

**Bad Prompt 1:**
```javascript
// Make this faster
function slowFunction(arr) {
  return arr.filter(x => x > 0).map(x => x * 2).reduce((a, b) => a + b, 0);
}
```

**Your Improved Prompt:**
```javascript
// Context: Processing sensor data arrays (10k-100k numbers)
// Current issue: Function is too slow for real-time dashboard updates
// Need: Optimize for performance, maintain same output format
// Constraints: Must work in browser environment, no external libraries
//
// Optimize this function for large arrays while maintaining readability:
function slowFunction(arr) {
  return arr.filter(x => x > 0).map(x => x * 2).reduce((a, b) => a + b, 0);
}
```

**Bad Prompt 2:**
```javascript
// Add error handling
```

**Your Improved Prompt:**
```javascript
// Add comprehensive error handling to this API endpoint that:
// - Validates input parameters (userId must be valid MongoDB ObjectId)
// - Handles database connection failures gracefully
// - Returns consistent error response format matching our API standards
// - Logs errors for monitoring without exposing sensitive data
// - Implements proper HTTP status codes (400, 404, 500)
//
async function getUserProfile(req, res) {
  const user = await User.findById(req.params.userId);
  res.json(user);
}
```

### Exercise 2: Context Detective

Look at these suggestions and identify what context was missing:

```javascript
// Original prompt: "Create a search function"
// Copilot suggested:
function search(query) {
  return items.filter(item => item.includes(query));
}

// What context was missing?
// - What type of search? (text, products, users?)
// - What data structure?
// - Case sensitivity requirements?
// - Search algorithm preference?
// - Performance requirements?
```

## 📝 Best Practices Summary

### Do:
- ✅ Start with context, then specify requirements
- ✅ Use examples from your existing codebase
- ✅ Be specific about constraints and priorities
- ✅ Iterate and refine your prompts
- ✅ Reference your architecture and patterns

### Don't:
- ❌ Use vague, generic language
- ❌ Assume Copilot knows your specific context
- ❌ Give conflicting or contradictory requirements
- ❌ Ask for everything at once
- ❌ Ignore the suggestions completely if they're not perfect

### Remember:
- **Context is king** - The more relevant context, the better the suggestions
- **Iteration is normal** - Refining prompts is part of the process  
- **Patterns matter** - Reference existing code patterns for consistency
- **Specificity helps** - Detailed requirements lead to better results

## ➡️ Next Steps

Move on to [08-best-practices](../08-best-practices/) for advanced tips and workflows to master your daily Copilot usage.