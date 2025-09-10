// Context Examples - Notice how existing code patterns influence Copilot suggestions

// Example 1: Naming Conventions
// Our project uses camelCase consistently
const userName = 'john_doe';
const userEmail = 'john@example.com';
const userPreferences = { theme: 'dark', language: 'en' };

// Try adding a new user property here - notice camelCase suggestions
// const user

// Example 2: Error Handling Patterns
// Our project uses try/catch with custom error types
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}

async function validateUser(userData) {
  try {
    if (!userData.email) {
      throw new ValidationError('Email is required', 'email');
    }
    return { valid: true };
  } catch (error) {
    console.error('Validation failed:', error.message);
    throw error;
  }
}

// Try adding a new validation function - notice the pattern matching
// async function validatePost

// Example 3: API Response Patterns
// Our project uses consistent response structure
const standardApiResponse = {
  success: true,
  data: null,
  message: '',
  errors: []
};

async function fetchUser(id) {
  try {
    const response = await fetch(`/api/users/${id}`);
    const data = await response.json();
    
    return {
      success: true,
      data: data.user,
      message: 'User fetched successfully',
      errors: []
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: 'Failed to fetch user',
      errors: [error.message]
    };
  }
}

// Try adding a new API function - notice the consistent structure
// async function createUser

// Example 4: Functional Programming Style
// Our project prefers functional approaches
const users = [
  { id: 1, name: 'Alice', active: true },
  { id: 2, name: 'Bob', active: false },
  { id: 3, name: 'Charlie', active: true }
];

const getActiveUsers = (users) => users.filter(user => user.active);
const getUserNames = (users) => users.map(user => user.name);
const getUserById = (users, id) => users.find(user => user.id === id);

// Try adding a new utility function - notice functional style suggestions
// const getUsersByRole = 

// Example 5: Configuration Objects
// Our project uses configuration objects for complex operations
const emailConfig = {
  provider: 'smtp',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'noreply@company.com',
    pass: process.env.EMAIL_PASSWORD
  }
};

const dbConfig = {
  host: 'localhost',
  port: 5432,
  database: 'ecommerce',
  user: 'admin',
  password: process.env.DB_PASSWORD,
  ssl: false
};

// Try adding a new config object - notice the pattern
// const apiConfig = 