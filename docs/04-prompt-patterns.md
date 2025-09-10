# Module 4: Proven Prompt Patterns

**Objective:** Apply battle-tested prompt patterns for consistent, high-quality results  
**Time:** 15 minutes  
**Practice Files:** `examples/prompt-patterns/`

## Overview

Master proven prompting patterns that work across different scenarios and consistently produce high-quality code.

## Creating Reusable Prompt Files

### GitHub Prompts Directory

Create a `.github/prompts/` directory to store and share prompt patterns across your team:

#### Setup
1. **Create directory:** `.github/prompts/` in your repository root
2. **Add prompt files** with `.prompt.md` extension
3. **Use descriptive names** like `react-component.prompt.md`, `api-endpoint.prompt.md`, `database-migration.prompt.md`
4. **Choose to which mode the prompt belongs to:** agent, edit, ask
5. **Use a prompt**: CMD + Shift + P → Chat: Run Prompt...

#### Example Prompt Files

**`.github/prompts/react-component.prompt.md`:**
```markdown
# React Component Creation

Create a React component that:
- Uses TypeScript with proper prop definitions
- Implements accessibility features (ARIA labels, keyboard navigation)
- Follows our design system patterns
- Includes error boundaries where appropriate
- Uses our established hooks patterns
- Includes comprehensive PropTypes/TypeScript definitions

## Template
Create a {COMPONENT_NAME} component that:
- Accepts props: {PROP_DEFINITIONS}
- Implements: {FUNCTIONALITY}
- Styling: {STYLING_APPROACH}
- State management: {STATE_REQUIREMENTS}
```

**`.github/prompts/api-endpoint.prompt.md`:**
```markdown
# API Endpoint Creation

Create a {METHOD} endpoint for {RESOURCE} that:
- Validates input using our schema validation patterns
- Implements proper authentication/authorization
- Returns consistent response format: { success, data, message, errors }
- Includes comprehensive error handling
- Adds appropriate logging for monitoring
- Follows RESTful conventions
- Includes rate limiting considerations

## Error Handling Requirements
- 400: Validation errors with field-specific messages
- 401: Authentication failures
- 403: Authorization failures  
- 500: Server errors with generic user messages
```

#### Using Prompt Files
1. **Reference in comments:** `// See .github/prompts/react-component.prompt.md`
2. **Copy and customize** the template for specific use cases
3. **Share with team** for consistent code generation patterns

## Key Prompt Patterns

### 1. Specification Pattern
Perfect for defining requirements clearly:
```javascript
// Create a [SPECIFIC_ITEM] that:
// - [REQUIREMENT_1]
// - [REQUIREMENT_2] 
// - [REQUIREMENT_3]
```

### 2. Context-Setting Pattern
Provide comprehensive background:
```javascript
// Context: [BACKGROUND_INFO]
// Given: [CURRENT_STATE]
// Need: [SPECIFIC_REQUIREMENT]
// 
// [MAIN_PROMPT]
```

### 3. Example-Driven Pattern
Show the pattern to follow:
```javascript
// Following this pattern:
// [EXAMPLE_CODE]
// 
// Create similar [NEW_ITEM] for [USE_CASE]
```

### 4. Constraint Pattern
Define explicit limitations:
```javascript
// Create [ITEM] with these constraints:
// - Must use [TECHNOLOGY]
// - Cannot exceed [LIMITATION]
// - Should prioritize [PRIORITY]
```

## Hands-On Exercises

### Exercise 1: Pattern Practice

Work through the pattern examples in `examples/prompt-patterns/`:

1. **Specification Pattern:** `specification-pattern.jsx`
   - Try the detailed component requirements
   - Notice comprehensive functionality

2. **Example-Driven Pattern:** `example-driven-pattern.js`
   - Follow the established API pattern
   - Create similar functions

3. **Context-Setting Pattern:** `context-setting-pattern.jsx`
   - Use the rich project context
   - Build the collaboration feature

### Exercise 2: Pattern Combination

1. **Open:** `combined-patterns.jsx`
2. **Observe** how multiple patterns work together
3. **Practice** combining patterns for complex requirements

### Exercise 3: Choose Your Pattern

Pick one of these coding tasks and apply the most appropriate pattern:

**Option A: User Registration Form**
1. **Task:** Create a user registration form with validation
2. **Recommended pattern:** Specification Pattern
3. **Your approach:**
   - List detailed requirements (email validation, password strength, error handling)
   - Include accessibility requirements
   - Specify styling approach

**Option B: API Data Fetcher**
1. **Task:** Create a function similar to existing API calls in your project
2. **Recommended pattern:** Example-Driven Pattern
3. **Your approach:**
   - Reference an existing API function as example
   - Create similar function for different endpoint
   - Follow established error handling patterns

**Option C: Shopping Cart Feature**
1. **Task:** Add "quick add to cart" functionality to an e-commerce app
2. **Recommended pattern:** Context-Setting Pattern
3. **Your approach:**
   - Provide background about the e-commerce platform
   - Explain existing cart system
   - Define integration requirements

**Exercise Steps:**
1. **Choose** one task above (or create your own)
2. **First attempt:** Try a basic prompt like `// Create a user registration form`
3. **Apply pattern:** Use your chosen pattern structure with detailed requirements
4. **Compare results:** Notice the quality difference between basic and pattern-based prompts
5. **Document:** Write down which specific improvements you observed

## Pattern Selection Guide

### Use Specification Pattern when:
- Requirements are complex and detailed
- You need precise functionality
- Working on critical business logic

### Use Example-Driven Pattern when:
- Establishing coding patterns
- Creating similar functionality
- Teaching consistent approaches

### Use Context-Setting Pattern when:
- Working in complex projects
- Integrating with existing systems
- Need domain-specific knowledge

### Use Constraint Pattern when:
- Have technical limitations
- Working with specific technologies
- Need to avoid certain approaches

## Advanced Pattern Techniques

### Layered Prompting
Build complex functionality in stages:
```javascript
// Layer 1: Core functionality
// Layer 2: Error handling  
// Layer 3: Performance optimization
// Layer 4: Accessibility
```

### Conditional Logic
```javascript
// Create [COMPONENT] that adapts based on:
// - If [CONDITION_1]: [BEHAVIOR_1]
// - If [CONDITION_2]: [BEHAVIOR_2]  
// - Otherwise: [DEFAULT_BEHAVIOR]
```

### Integration Patterns
```javascript
// Create [NEW_FEATURE] that integrates with:
// - [EXISTING_SYSTEM_1]: [INTEGRATION_DETAILS]
// - [EXISTING_SYSTEM_2]: [INTEGRATION_DETAILS]
```

## Creating Your Own Patterns

### Pattern Development Process
1. **Identify recurring needs** in your projects
2. **Document successful prompts** that work well
3. **Create reusable templates** from successful prompts
4. **Test patterns** across different scenarios
5. **Refine based on results** and team feedback

## Next Steps

Continue to [Module 5: Agent Modes Strategy](./05-agent-modes.md) to learn when and how to use different Copilot agent modes.