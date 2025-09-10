// ============================================================================
// CONTEXT DEBUGGING - STEP 3: BUSINESS CONTEXT
// ============================================================================
//
// This file adds business rules and domain-specific requirements.
// This helps Copilot understand not just HOW to code, but WHAT the business needs.

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models/User');
const { validateEmail } = require('../utils/validation');
const { logSecurityEvent } = require('../utils/logging');
const { incrementLoginAttempts, isAccountLocked } = require('../utils/security');

// Business Context: E-commerce platform with security requirements
// - Serves 10,000+ daily active users
// - Handles sensitive customer and payment data
// - Must comply with PCI DSS requirements
// - Supports both customer and admin user types

// Security Requirements:
// - Account lockout after 5 failed attempts
// - Session timeout after 30 minutes of inactivity
// - All authentication events must be logged
// - Password must meet complexity requirements
// - Rate limiting on login attempts

// User Types:
// - Customers: Basic authentication, shopping access
// - Admins: Enhanced authentication, management access
// - Guest users: Limited access, no authentication required

/**
 * @typedef {Object} AuthResult
 * @property {boolean} success - Whether authentication succeeded
 * @property {string} token - JWT token if successful
 * @property {Object} user - User object if successful
 * @property {string} error - Error message if failed
 * @property {number} attemptsRemaining - Login attempts remaining before lockout
 */

// EXERCISE: Try the same prompt here with business context
// Create a user authentication function

// Expected Improvement: Copilot should now suggest code that:
// - Implements account lockout logic
// - Includes security event logging
// - Handles different user types
// - Considers rate limiting
// - Follows business security requirements

// Notes: Record business-specific improvements:
// - 
// - 
// - 

// Next: Move to full-context.js to add architectural patterns and constraints