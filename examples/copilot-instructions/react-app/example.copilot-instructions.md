# React Application Instructions

## Component Patterns

### Component Structure
- Use functional components with hooks exclusively
- Organize components in feature-based folders
- Create reusable UI components in `/components/ui/`
- Keep business logic in custom hooks

### State Management
- Use `useState` for local component state
- Use `useContext` for shared state across component trees
- Consider Zustand for complex global state
- Implement proper state normalization for complex data

### Props and TypeScript
- Define prop types using JSDoc or TypeScript interfaces
- Use destructuring for props with default values
- Implement proper prop validation
- Prefer composition over inheritance

### Styling
- Use CSS Modules for component-specific styles
- Follow BEM naming convention for CSS classes
- Use Tailwind CSS utility classes when available
- Implement responsive design patterns

### Performance
- Use `React.memo` for expensive components
- Implement `useMemo` and `useCallback` appropriately
- Lazy load components with `React.lazy`
- Optimize bundle size with proper imports

## File Organization

```
src/
  components/
    ui/           # Reusable UI components
    layout/       # Layout components
    forms/        # Form components
  hooks/          # Custom hooks
  utils/          # Utility functions
  constants/      # Application constants
  types/          # TypeScript types
  services/       # API services
```

## API Integration

### Data Fetching
- Use custom hooks for data fetching
- Implement proper loading and error states
- Use React Query or SWR for caching
- Handle race conditions appropriately

### Error Boundaries
- Implement error boundaries for component trees
- Provide meaningful error messages
- Log errors for debugging
- Graceful degradation when possible

## Testing

### Component Testing
- Use React Testing Library
- Test user interactions, not implementation details
- Mock external dependencies
- Write integration tests for user flows

### Example Component Structure
```javascript
/**
 * UserProfile component for displaying user information
 * @param {Object} props
 * @param {Object} props.user - User object with profile data
 * @param {Function} props.onEdit - Callback for edit action
 * @param {boolean} props.isEditable - Whether profile can be edited
 */
const UserProfile = ({ user, onEdit, isEditable = false }) => {
  // Component implementation
};
```

## Accessibility

- Include proper ARIA labels and roles
- Ensure keyboard navigation support
- Use semantic HTML elements
- Test with screen readers
- Maintain proper color contrast ratios

## Security

- Sanitize user inputs before rendering
- Use proper CSP headers
- Validate data on both client and server
- Avoid exposing sensitive data in client code