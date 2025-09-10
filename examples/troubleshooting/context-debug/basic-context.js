// ============================================================================
// CONTEXT DEBUGGING - STEP 2: BASIC CONTEXT
// ============================================================================
//
// This file adds basic context through imports and type definitions.
// Notice how this influences Copilot's suggestions.

// Basic imports provide technology stack context
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models/User');
const { validateEmail } = require('../utils/validation');

// Type definitions (via JSDoc) provide structure context
/**
 * @typedef {Object} AuthResult
 * @property {boolean} success - Whether authentication succeeded
 * @property {string} token - JWT token if successful
 * @property {Object} user - User object if successful
 * @property {string} error - Error message if failed
 */

/**
 * @typedef {Object} LoginCredentials
 * @property {string} email - User email address
 * @property {string} password - User password
 */

// EXERCISE: Try the same prompt here and observe how suggestions change
// Create a user authentication function

// Expected Improvement: Copilot should now suggest code that:
// - Uses the imported libraries (jwt, bcrypt)
// - References the User model
// - Uses the defined types in JSDoc
// - Includes email validation

// Notes: Record improvements you observe:
// - 
// - 
// - 

// Next: Move to business-context.js to add domain-specific requirements