# Module 3: Copilot Instructions Mastery

**Objective:** Create effective workspace-level instructions that guide Copilot's behavior  
**Time:** 15 minutes  
**Practice Files:** `examples/copilot-instructions/`

## Overview

Learn to create `copilot-instructions.md` files that provide persistent context about your project's patterns, standards, and requirements. `copilot-instructions.md` files always need to be located in the `.github` folder at the root of your repository.

## Key Concepts

### Instruction Scope
- **Workspace-level:** Root directory instructions for general patterns
- **Project-specific:** Folder-level instructions for specific contexts
- **Hierarchical:** More specific instructions override general ones

### Effective Instructions Include
- Code style and architectural patterns
- Business rules and domain knowledge
- Security and compliance requirements
- Framework-specific conventions

## Hands-On Exercises

### Exercise 1: Examine Existing Instructions

1. **Open and read:** `example.copilot-instructions.md` in the root directory
2. **Notice:** General project-wide guidelines for the workshop
3. **Open:** `examples/copilot-instructions/react-app/example.copilot-instructions.md`
4. **Compare:** How React-specific patterns are defined
5. **Open:** `examples/copilot-instructions/api-service/example.copilot-instructions.md`
6. **Identify:** Backend-specific conventions and patterns
7. **Key observation:** How instructions become more specific at deeper folder levels

### Exercise 2: Test Instruction Effectiveness

1. **Create file:** `examples/copilot-instructions/react-app/test-component.jsx`
2. **Add this exact prompt:**
   ```javascript
   // Create a function to handle user authentication
   ```
3. **Observe:** React-specific suggestions (hooks, components, JSX patterns)
4. **Create file:** `examples/copilot-instructions/api-service/test-auth.js`
5. **Use the same prompt** and notice API-specific suggestions (middleware, JWT, express patterns)
6. **Create file:** `test-generic.js` in the root directory
7. **Use the same prompt** and compare how general instructions affect suggestions
8. **Document:** Which location produced the most relevant code for each context

### Exercise 3: Write Your Own Instructions

1. **Choose a scenario:** Pick one of these project types:
   - Mobile app with React Native
   - Data analysis with Python
   - Desktop app with Electron
2. **Create file:** `examples/copilot-instructions/[your-project-type]/example.copilot-instructions.md`
3. **Include these sections:**
   ```markdown
   # [Your Project Type] Instructions
   
   ## Technology Stack
   - [List your specific tools/frameworks]
   
   ## Code Standards
   - [Your preferred patterns]
   
   ## Architecture Guidelines
   - [How you structure projects]
   
   ## Domain-Specific Rules
   - [Business logic patterns]
   ```
4. **Test your instructions:** Create a test file and verify Copilot follows your guidelines
5. **Refine:** Adjust instructions based on the results

## Instruction Writing Patterns

### Structure Template
```markdown
# Project Instructions

## Code Style
[Your style preferences and standards]

## Architecture
[Your architectural patterns and decisions]

## Libraries & Frameworks
[Specific tools and how to use them]

## Business Rules
[Domain-specific requirements and context]

## Security & Compliance
[Security patterns and compliance requirements]
```

### Best Practices

1. **Be specific but not restrictive** - Guide without micromanaging
2. **Include examples** - Show don't just tell
3. **Prioritize important rules** - Put critical requirements first
4. **Explain the why** - Include context about decisions
5. **Keep current** - Update as your project evolves

### Common Patterns

#### For React Projects
- Component patterns and hooks usage
- State management approaches
- Styling conventions and accessibility

#### For API Projects
- REST conventions and response formats
- Authentication and error handling
- Database interaction patterns

#### For Any Project
- Testing strategies
- Documentation standards
- Code review requirements

## Testing Your Instructions

### Validation Process
1. Create instructions
2. Test with sample prompts
3. Refine based on results
4. Iterate until consistent

### Success Indicators
- Generated code matches your patterns
- Less manual editing required
- Consistent quality across team members
- Better integration with existing codebase

**Note:** Many paths lead to rome. This is only one effective way of writing copilot-instructions.md files. Be creative and adapt to your needs.

## Next Steps

Advance to [Module 4: Proven Prompt Patterns](./04-prompt-patterns.md) to learn battle-tested prompting strategies.