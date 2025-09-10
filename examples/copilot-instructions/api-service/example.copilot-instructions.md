# API Service Instructions

## API Design Principles

### RESTful Conventions
- Use proper HTTP methods (GET, POST, PUT, DELETE, PATCH)
- Implement consistent URL patterns (`/api/v1/resources`)
- Return appropriate HTTP status codes
- Use plural nouns for resource endpoints

### Response Format
All API responses should follow this structure:
```javascript
{
  "success": boolean,
  "data": any,
  "message": string,
  "errors": string[],
  "meta": {
    "timestamp": string,
    "requestId": string,
    "pagination": object // when applicable
  }
}
```

### Authentication & Authorization
- Use JWT tokens for authentication
- Implement proper token validation middleware
- Use role-based access control (RBAC)
- Log all authentication attempts

## Error Handling

### Error Response Structure
```javascript
{
  "success": false,
  "data": null,
  "message": "Validation failed",
  "errors": [
    "Email is required",
    "Password must be at least 8 characters"
  ],
  "meta": {
    "timestamp": "2024-01-01T12:00:00Z",
    "requestId": "req_123456"
  }
}
```

### Error Categories
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (authentication required)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found (resource doesn't exist)
- `409` - Conflict (duplicate resource)
- `422` - Unprocessable Entity (business logic errors)
- `500` - Internal Server Error (unexpected errors)

## Database Patterns

### Query Structure
- Use parameterized queries to prevent SQL injection
- Implement proper connection pooling
- Use transactions for multi-step operations
- Index frequently queried columns

### ORM Patterns
```javascript
// Use our established User model patterns
const user = await User.findById(id, {
  include: ['profile', 'preferences'],
  where: { active: true }
});
```

## Middleware

### Standard Middleware Stack
1. CORS handling
2. Request logging
3. Body parsing
4. Authentication
5. Rate limiting
6. Validation
7. Error handling

### Custom Middleware Example
```javascript
/**
 * Authentication middleware
 * Validates JWT token and attaches user to request
 */
const authenticateUser = async (req, res, next) => {
  try {
    // Implementation
  } catch (error) {
    // Error handling
  }
};
```

## Validation

### Input Validation
- Validate all incoming data
- Use schema validation libraries (Joi, Yup)
- Sanitize user inputs
- Implement custom validation rules

### Example Validation Schema
```javascript
const userSchema = {
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  firstName: Joi.string().min(2).max(50).required(),
  lastName: Joi.string().min(2).max(50).required()
};
```

## Logging & Monitoring

### Logging Standards
- Use structured logging (JSON format)
- Include request IDs for tracing
- Log all errors with stack traces
- Implement different log levels

### Monitoring Endpoints
- Health check endpoint (`/health`)
- Metrics endpoint (`/metrics`)
- Status endpoint (`/status`)

## Security

### Security Headers
- Implement CORS properly
- Use helmet.js for security headers
- Set up CSP (Content Security Policy)
- Enable HTTPS in production

### Data Protection
- Encrypt sensitive data at rest
- Use HTTPS for data in transit
- Implement proper session management
- Regular security audits

## Testing

### API Testing
- Unit tests for business logic
- Integration tests for endpoints
- Mock external services
- Test error conditions

### Example Test Structure
```javascript
describe('POST /api/users', () => {
  it('should create user with valid data', async () => {
    // Test implementation
  });
  
  it('should return 400 for invalid email', async () => {
    // Test implementation
  });
});
```

## Performance

### Optimization Strategies
- Implement response caching
- Use database query optimization
- Implement request rate limiting
- Monitor response times
- Use compression middleware