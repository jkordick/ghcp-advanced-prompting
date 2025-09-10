# Module 5: Agent Modes Strategy

**Objective:** Understand when and how to use different Copilot agent modes effectively  
**Time:** 15 minutes  
**Practice Files:** `examples/agent-modes/`

## Overview

GitHub Copilot offers to create you own agent mode that can be optimized for specific types of tasks. 

## Setup your own Agent Mode
1. Open the GitHub Copilot Chat window
2. Click on the mode selector and choose `Configure Modes...`
3. Select `Create a new custom chat mode file...`
4. Select the location to store your custom chat mode file. Here we are using `.github/chatmodes/`.
5. Give your chatmode file a name. 
6. It will now appear in the `.github/chatmodes/` folder under that name with a `.chatmode.md` extension.

When you now open the file you see a template for creating your own custom chat mode. It contains:
1. A short description of the mode.
2. The list of tools you want to enable in this mode.
3. A larger description section where you can define the purpose of this chat mode and how AI should behave: response style, available tools, focus areas, and any mode-specific instructions or constraints. (very similar to what we already did with the `copilot-instructions.md` file)

## Hands-On Exercise: Create Your Custom Agent Mode

### Exercise Overview
Create your own custom chat mode by combining elements from two provided examples, then test its effectiveness with specific scenarios.

### Step 1: Study the Examples

**Example A: Code Review Mode**
```markdown
# Code Review Assistant

Focus on thorough code analysis and constructive feedback.

## Tools
- file_search
- read_file
- semantic_search

## Description
You are a senior code reviewer specializing in:
- Security vulnerability detection
- Performance optimization suggestions  
- Code maintainability improvements
- Best practice recommendations

Always provide:
- Specific line references when suggesting changes
- Explanation of why changes are needed
- Alternative implementation approaches
- Positive feedback on well-written code sections
```

**Example B: API Development Mode** 
```markdown
# API Development Expert

Specialized assistant for building robust APIs.

## Tools
- create_file
- replace_string_in_file
- run_in_terminal

## Description
You are an API development specialist focusing on:
- RESTful design principles
- Authentication and authorization patterns
- Error handling and validation
- API documentation and testing

Response format:
- Provide complete, runnable code examples
- Include proper error handling
- Suggest appropriate HTTP status codes
- Recommend testing strategies
```

### Step 2: Design Your Custom Mode

Choose one of these scenarios and create a custom chat mode:

**Scenario A: Frontend Component Specialist**
- **Focus**: React/Vue component development
- **Combine**: Code review attention to detail + API development's complete examples
- **Special features**: Accessibility checks, performance optimization, responsive design

**Scenario B: Database Integration Expert** 
- **Focus**: Database design and optimization
- **Combine**: Code review's security focus + API development's practical implementation
- **Special features**: Query optimization, migration strategies, data modeling

### Step 3: Create Your Chat Mode

1. **Create your file**: `.github/chatmodes/[your-scenario].chatmode.md`
2. **Write the description** combining elements from both examples
3. **Select appropriate tools** for your use case
4. **Define response style** and specific behaviors

**Template Structure:**
```markdown
# [Your Mode Name]

[Brief description of the mode's purpose]

## Tools
- [tool1]
- [tool2] 
- [tool3]

## Description
You are a [role] specializing in:
- [specialty 1 from Example A]
- [specialty 2 from Example B]
- [your unique addition]
- [another unique addition]

Response requirements:
- [formatting requirement from examples]
- [behavior requirement you add]
- [output specification]
- [quality standard]
```

### Step 4: Test Your Agent Mode

**Test Scenario 1**: Basic Functionality
1. **Switch to your custom mode** in GitHub Copilot Chat
2. **Ask a relevant question** for your domain
3. **Observe**: Does it respond according to your specifications?

**Test Scenario 2**: Edge Case Handling
1. **Ask an ambiguous question** 
2. **Check**: Does it ask clarifying questions as expected?
3. **Verify**: Does it stay within your defined scope?

**Test Scenario 3**: Quality Assessment
1. **Request a complex task** (e.g., "Create a user authentication component" or "Design a user database schema")
2. **Evaluate**: 
   - Does it provide the level of detail you specified?
   - Are the suggestions aligned with your focus areas?
   - Does it use the response format you defined?

### Step 5: Refine and Document

1. **Note what worked well** and what didn't meet expectations
2. **Refine your chat mode description** based on test results
3. **Document the improvements** you made
4. **Test again** with the refined version

### Expected Outcomes

After completing this exercise, you should have:
- ✅ A working custom chat mode tailored to your needs
- ✅ Understanding of how mode descriptions influence AI behavior  
- ✅ Experience with iterative mode refinement
- ✅ Practical knowledge of tool selection for specific tasks
- ✅ A reusable asset for your development workflow

### Bonus Challenge

**Advanced participants**: Create a second mode that complements your first one (e.g., if you made a component builder, create a component tester mode) and practice switching between them for different aspects of the same project.

## Next Steps

Advance to [Module 6: Troubleshooting and Common Issues](./06-troubleshooting.md).