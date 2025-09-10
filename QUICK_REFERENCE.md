# Quick Reference Guide: Advanced GitHub Copilot Prompting

**Print this page for easy reference during the workshop!**

## 🚀 Essential Prompt Patterns

### 1. Specification Pattern
```javascript
// Create a [SPECIFIC_ITEM] that:
// - [REQUIREMENT_1]
// - [REQUIREMENT_2] 
// - [REQUIREMENT_3]
// - [ADDITIONAL_CONTEXT]
```

### 2. Context-Setting Pattern
```javascript
// Context: [BACKGROUND_INFO]
// Given: [CURRENT_STATE]
// Need: [SPECIFIC_REQUIREMENT]
// 
// [MAIN_PROMPT]
```

### 3. Example-Driven Pattern
```javascript
// Following this pattern:
// [EXAMPLE_CODE]
// 
// Create similar [NEW_ITEM] for [USE_CASE]
```

### 4. Constraint Pattern
```javascript
// Create [ITEM] with these constraints:
// - Must use [TECHNOLOGY]
// - Cannot exceed [LIMITATION]
// - Must avoid [FORBIDDEN_APPROACH]
// - Should prioritize [PRIORITY]
```

## 🔧 Context Checklist

Before writing a prompt, ensure you have:
- [ ] **Technical context** (languages, frameworks, libraries)
- [ ] **Business context** (what the code should accomplish)
- [ ] **Architectural context** (how it fits in the system)
- [ ] **Constraint context** (limitations, requirements, standards)

## 🩹 Troubleshooting Quick Fixes

### Problem: Generic/Poor Suggestions
**Fix:** Add more specific context and requirements

### Problem: Wrong Architecture Pattern
**Fix:** Reference existing code patterns in your prompt

### Problem: Conflicting Requirements
**Fix:** Prioritize requirements clearly (Priority 1, 2, 3...)

### Problem: Wrong Technology Stack
**Fix:** Explicitly state your tech stack in the prompt

## 📝 Effective Prompt Structure

```javascript
// [CONTEXT] - What's the background?
// [REQUIREMENTS] - What specifically do you need?
// [CONSTRAINTS] - What are the limitations?
// [EXAMPLES] - What patterns should be followed?
// 
// [ACTUAL_PROMPT] - The specific request
```

## 💡 Power User Tips

### Context Priming:
- Open related files before coding
- Use descriptive variable names
- Add architectural comments
- Reference design decisions

### Pattern Recognition:
- Establish patterns early in files
- Use consistent naming conventions
- Reference existing implementations
- Build incrementally

### Error Recovery:
- Try different prompt angles
- Add more specific context
- Reference successful examples
- Break down complex requests

## 🔍 Common Prompt Templates

### API Endpoint:
```javascript
// Create [RESOURCE] endpoint that:
// - Follows REST conventions
// - Implements [AUTH_TYPE] authentication
// - Uses our standard error handling
// - Validates input with [VALIDATION_LIBRARY]
// - Returns [RESPONSE_FORMAT] format
```

### React Component:
```javascript
// Create [COMPONENT] component that:
// - Uses TypeScript with proper prop types
// - Implements [DESIGN_SYSTEM] patterns
// - Handles [SPECIFIC_STATES]
// - Follows accessibility guidelines
// - Integrates with [STATE_MANAGEMENT]
```

### Data Processing:
```javascript
// Create [FUNCTION] that processes [DATA_TYPE]:
// - Handles [EDGE_CASES]
// - Optimized for [PERFORMANCE_REQUIREMENT]
// - Uses [PREFERRED_ALGORITHM] approach
// - Returns [OUTPUT_FORMAT]
// - Includes error handling for [ERROR_TYPES]
```

## 🎪 Workshop Exercise Checklist

During exercises, practice:
- [ ] Starting with context
- [ ] Being specific about requirements  
- [ ] Referencing existing patterns
- [ ] Using appropriate agent modes
- [ ] Iterating and refining prompts
- [ ] Combining multiple patterns

## 📚 Remember These Key Principles

1. **Context is King** - More relevant context = better suggestions
2. **Specificity Matters** - Detailed requirements = precise results  
3. **Patterns Over Memory** - Learn flexible approaches, not rigid rules
4. **Iteration is Normal** - Refining prompts is part of the process
5. **Tool Augmentation** - Copilot enhances your thinking, doesn't replace it

---

**Remember:** The goal isn't perfect prompts immediately—it's building skills that compound over time! 🚁