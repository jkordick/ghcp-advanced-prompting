// ============================================================================
// CONTEXT DEBUGGING - STEP 4: FULL CONTEXT
// ============================================================================
//
// This file provides complete context including architectural patterns,
// coding standards, and specific implementation constraints.

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models/User');
const { validateEmail } = require('../utils/validation');
const { logSecurityEvent } = require('../utils/logging');
const { incrementLoginAttempts, isAccountLocked } = require('../utils/security');
const { ApiError } = require('../utils/errors');

// ============================================================================
// ARCHITECTURAL CONTEXT
// ============================================================================

// Framework: Express.js with RESTful API design
// Database: MongoDB with Mongoose ODM
// Authentication: JWT with refresh tokens
// Error Handling: Custom ApiError classes with standardized responses
// Logging: Winston logger with structured JSON format
// Testing: Jest with supertest for API testing

// ============================================================================
// CODING STANDARDS
// ============================================================================

// - Use async/await (not Promises with .then/.catch)
// - Follow camelCase naming convention
// - Include comprehensive JSDoc documentation
// - Use descriptive variable names
// - Implement proper error handling with try-catch
// - Return consistent response format
// - Include input validation
// - Use const/let (not var)

// ============================================================================
// ESTABLISHED PATTERNS
// ============================================================================

// Standard API Response Format:
const responseFormat = {
  success: true,
  data: {}, // or array
  message: 'Operation completed successfully',
  // For errors:
  // success: false,
  // error: 'ERROR_CODE',
  // message: 'User-friendly error message'
};

// Example of existing authentication middleware pattern:
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      throw new ApiError('MISSING_TOKEN', 'Authentication token required', 401);
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId);
    next();
  } catch (error) {
    res.status(error.statusCode || 401).json({
      success: false,
      error: error.code || 'AUTH_ERROR',
      message: error.message || 'Authentication failed'
    });
  }
};

// Example of existing error handling pattern:
const handleAuthError = (error, operation) => {
  logSecurityEvent({
    operation,
    error: error.message,
    timestamp: new Date(),
    severity: 'warning'
  });
  
  if (error.code === 'INVALID_CREDENTIALS') {
    return new ApiError('INVALID_CREDENTIALS', 'Invalid email or password', 401);
  }
  if (error.code === 'ACCOUNT_LOCKED') {
    return new ApiError('ACCOUNT_LOCKED', 'Account temporarily locked due to failed attempts', 423);
  }
  return new ApiError('AUTH_ERROR', 'Authentication failed', 500);
};

// ============================================================================
// BUSINESS CONTEXT (from previous file)
// ============================================================================

// E-commerce platform serving 10,000+ daily users
// Security Requirements: Account lockout, event logging, rate limiting
// User Types: Customers, Admins, Guests
// Compliance: PCI DSS requirements

/**
 * @typedef {Object} AuthResult
 * @property {boolean} success - Whether authentication succeeded
 * @property {string} token - JWT token if successful
 * @property {Object} user - User object if successful
 * @property {string} error - Error message if failed
 * @property {number} attemptsRemaining - Login attempts remaining before lockout
 */

/**
 * @typedef {Object} LoginCredentials
 * @property {string} email - User email address
 * @property {string} password - User password
 */

// ============================================================================
// EXERCISE: FINAL TEST WITH COMPLETE CONTEXT
// ============================================================================

// EXERCISE: Try the same prompt here with full context
// Create a user authentication function

// Expected Result: Production-ready code that:
// - Follows all established patterns
// - Uses proper error handling with ApiError
// - Implements all security requirements
// - Includes comprehensive JSDoc
// - Matches coding standards
// - Integrates with existing middleware patterns
// - Handles all business requirements
// - Returns standardized response format

// Notes: Record the complete, production-ready improvements:
// - 
// - 
// - 

// ============================================================================
// CONTEXT DEBUGGING CONCLUSIONS
// ============================================================================

// Compare your results across all four files:
//
// 1. NO CONTEXT: Generic, unusable code
// 2. BASIC CONTEXT: Technology-appropriate code
// 3. BUSINESS CONTEXT: Domain-aware code
// 4. FULL CONTEXT: Production-ready, pattern-following code
//
// Key Takeaway: Context is cumulative. Each layer of information makes
// Copilot suggestions more useful and specific to your actual needs.