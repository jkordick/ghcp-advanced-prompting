# Module 2: Context Engineering

**Objective:** Master providing context to GitHub Copilot through strategic workspace organization  
**Time:** 15 minutes  
**Practice Files:** `examples/context-engineering/`

## Overview

Learn how GitHub Copilot uses surrounding code, file structure, and workspace organization to provide better suggestions.

## Key Concepts

### Context Sources
1. **Current file content** - Variables, functions, imports
2. **Open tabs** - Related files in your editor
3. **Project structure** - Folder organization, naming conventions
4. **File relationships** - Imports, exports, dependencies

### Strategic Context Placement
- Open related files before coding
- Use descriptive variable and function names
- Organize code in logical, hierarchical structures
- Reference existing patterns in comments

## Hands-On Exercises

### Exercise 1: File Organization Impact

1. **Open:** `examples/context-engineering/ecommerce-app/components/ProductCard.jsx`
2. **Add this prompt** at the bottom: `// Create a price formatting helper function`
3. **Observe** how Copilot suggests currency formatting (context from file location and existing imports)
4. **Compare:** Close the file, open `examples/context-engineering/context-examples.js` and try the same prompt
5. **Notice** how different file contexts produce different suggestions

### Exercise 2: Multi-File Context

1. **Open these files simultaneously:**
   - `examples/context-engineering/blog-system/types.ts`
   - `examples/context-engineering/blog-system/api-service.ts`
   - `examples/context-engineering/blog-system/PostEditor.jsx`
2. **In PostEditor.jsx, add:** `// Create a function to save post draft`
3. **Observe** how Copilot leverages the `Post` interface from types.ts and API patterns from api-service.ts
4. **Test:** Close types.ts and try the same prompt - notice the difference in suggestion quality

### Exercise 3: Context Patterns

1. **Open:** `examples/context-engineering/context-examples.js`
2. **Scroll to the "Naming Conventions" section**
3. **Add this prompt:** `// Create another user validation function`
4. **Notice** how Copilot follows the established camelCase and validation patterns
5. **Experiment:** Change existing function names to snake_case and try the prompt again
6. **Observe** how Copilot adapts to the new naming convention

## Context Engineering Techniques

### 1. Strategic File Opening
Open files in this order for maximum context:
1. Types/interfaces
2. Constants/configuration
3. Utilities/helpers
4. Services/business logic
5. Components/UI

### 2. Naming for Context
- Use descriptive, domain-specific names
- Follow consistent conventions
- Include type hints in variable names

### 3. Pattern Establishment
- Create clear code patterns early
- Use consistent error handling approaches
- Establish architectural conventions

## Best Practices

- **Context is cumulative** - Each well-named file adds to the overall understanding
- **Consistency matters** - Regular patterns lead to predictable suggestions
- **Strategic placement** - Put context where Copilot can easily find it
- **Reference existing code** - Point to established patterns in your prompts

## Next Steps

Continue to [Module 3: Copilot Instructions Mastery](./03-copilot-instructions.md) to learn workspace-level instruction techniques.