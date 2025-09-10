# GitHub Copilot Instructions

## Code Style & Standards

### General Principles
- Write clean, readable, and maintainable code
- Follow established conventions for each language
- Prioritize code clarity over cleverness
- Include meaningful comments for complex logic

### Documentation
- Use JSDoc for JavaScript/TypeScript functions
- Include docstrings for Python functions
- Add README files for new modules/packages
- Comment complex business logic and algorithms

### Error Handling
- Use proper error handling patterns for each language
- Provide meaningful error messages
- Log errors appropriately with context
- Fail gracefully with user-friendly messages

## Architecture Patterns

### File Organization
- Group related files in logical directories
- Use consistent naming conventions
- Separate concerns (logic, UI, data, utilities)
- Keep configuration files at appropriate levels

### API Design
- Follow RESTful conventions for HTTP APIs
- Use consistent response formats
- Include proper status codes
- Implement comprehensive error handling

### Security
- Validate all inputs
- Use parameterized queries for database operations
- Implement proper authentication and authorization
- Never commit secrets or sensitive data

## Technology-Specific Guidelines

### JavaScript/TypeScript
- Use modern ES6+ features appropriately
- Prefer const/let over var
- Use async/await over Promise chains when possible
- Implement proper TypeScript types when available

### React
- Use functional components with hooks
- Implement proper prop validation
- Follow component composition patterns
- Use meaningful component and prop names

### Python
- Follow PEP 8 style guidelines
- Use type hints for function parameters and returns
- Implement proper exception handling
- Use virtual environments for dependencies

## Best Practices

### Testing
- Write unit tests for critical business logic
- Include integration tests for API endpoints
- Test edge cases and error conditions
- Maintain good test coverage

### Performance
- Consider performance implications of code choices
- Use appropriate data structures and algorithms
- Implement caching where beneficial
- Profile and optimize bottlenecks

### Accessibility
- Follow WCAG guidelines for web interfaces
- Include proper ARIA labels and roles
- Ensure keyboard navigation support
- Test with screen readers when applicable

## Project Context

This is a workshop repository for learning advanced GitHub Copilot prompting techniques. When generating code:
- Focus on educational value and clear examples
- Include comments explaining key concepts
- Demonstrate best practices
- Make code suitable for learning and experimentation