/**
 * Style Issues - Handling Code Style Mismatches
 * 
 * This file demonstrates common code style issues when using GitHub Copilot
 * and techniques to ensure generated code matches your project's conventions.
 */

// ========================
// PROBLEM: Style Mismatch
// ========================

// ❌ COMMON ISSUE: Copilot suggests code that doesn't match your style

// Prompt: "Create a user validation function"
// Copilot might suggest:
function validate_user_data(userData) {
    if (!userData.email_address) return false;
    if (!userData.full_name) return false;
    return true;
}

// PROBLEMS:
// - Uses snake_case instead of camelCase
// - Property names don't match your schema
// - Missing your preferred validation pattern

// =============================
// SOLUTION 1: Style-Aware Prompts
// =============================

// ✅ BETTER APPROACH: Include style guidance in your prompt

// Following our camelCase naming convention and object destructuring pattern:
function validateUserData({ email, firstName, lastName, age }) {
    // Copilot will now follow the established pattern
    if (!email || !isValidEmail(email)) {
        return { isValid: false, error: 'Invalid email address' };
    }
    
    if (!firstName || firstName.trim().length < 2) {
        return { isValid: false, error: 'First name must be at least 2 characters' };
    }
    
    if (!lastName || lastName.trim().length < 2) {
        return { isValid: false, error: 'Last name must be at least 2 characters' };
    }
    
    if (age && (age < 13 || age > 120)) {
        return { isValid: false, error: 'Age must be between 13 and 120' };
    }
    
    return { isValid: true };
}

// ===============================
// SOLUTION 2: Pattern Reinforcement
// ===============================

// Show existing patterns to establish context:

// Example of our standard async function pattern:
const fetchUserProfile = async (userId) => {
    try {
        const response = await api.get(`/users/${userId}`);
        return { success: true, data: response.data };
    } catch (error) {
        logger.error('Failed to fetch user profile', { userId, error: error.message });
        return { success: false, error: 'Unable to fetch user profile' };
    }
};

// Following the above pattern, create a user update function:
const updateUserProfile = async (userId, updates) => {
    try {
        const response = await api.patch(`/users/${userId}`, updates);
        logger.info('User profile updated successfully', { userId });
        return { success: true, data: response.data };
    } catch (error) {
        logger.error('Failed to update user profile', { userId, error: error.message });
        return { success: false, error: 'Unable to update user profile' };
    }
};

// ================================
// SOLUTION 3: Technology-Specific Styles
// ================================

// For React components, specify your preferred patterns:

// Using our functional component pattern with hooks and JSDoc:
import React, { useState, useEffect, useCallback } from 'react';
import { userService } from '../services/userService';

/**
 * @typedef {Object} User
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} email
 */

/**
 * @typedef {Object} UserProfileProps
 * @property {string} userId
 * @property {function(User): void} [onUserUpdate]
 */

/**
 * @param {UserProfileProps} props
 */
const UserProfile = ({ userId, onUserUpdate }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUser = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const userData = await userService.getById(userId);
            setUser(userData);
            onUserUpdate?.(userData);
        } catch (err) {
            setError('Failed to load user profile');
            console.error('Error fetching user:', err);
        } finally {
            setLoading(false);
        }
    }, [userId, onUserUpdate]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!user) return <div>User not found</div>;

    return (
        <div className="user-profile">
            <h2>{user.firstName} {user.lastName}</h2>
            <p>{user.email}</p>
        </div>
    );
};

export default UserProfile;

// ===========================
// SOLUTION 4: ESLint Integration
// ===========================

// Mention your linting rules in prompts:

// Following our ESLint configuration (airbnb-base, no var declarations, prefer const):
const processOrderItems = (items) => {
    // Use const/let instead of var
    const processedItems = items.map((item) => {
        // Arrow functions for consistency
        const discountedPrice = item.price * (1 - item.discount);
        return {
            ...item,
            finalPrice: Math.round(discountedPrice * 100) / 100, // Round to 2 decimals
        };
    });

    return processedItems.filter((item) => item.finalPrice > 0);
};

// =============================
// ADVANCED: Style Templates
// =============================

// Create reusable style templates for common patterns:

// Template: API Service Class
class BaseApiService {
    constructor(baseURL, options = {}) {
        this.baseURL = baseURL;
        this.headers = {
            'Content-Type': 'application/json',
            ...options.headers,
        };
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            headers: this.headers,
            ...options,
        };

        try {
            const response = await fetch(url, config);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error(`API request failed: ${error.message}`, { url, config });
            throw error;
        }
    }

    async get(endpoint) {
        return this.request(endpoint, { method: 'GET' });
    }

    async post(endpoint, data) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }
}

// Following the BaseApiService template above, create a UserService:
class UserService extends BaseApiService {
    constructor() {
        super('/api/users');
    }

    async getById(userId) {
        return this.get(`/${userId}`);
    }

    async create(userData) {
        return this.post('/', userData);
    }

    async update(userId, updates) {
        return this.request(`/${userId}`, {
            method: 'PATCH',
            body: JSON.stringify(updates),
        });
    }

    async delete(userId) {
        return this.request(`/${userId}`, { method: 'DELETE' });
    }
}

// ========================
// PRACTICE EXERCISES
// ========================

// Exercise 1: Fix the style issues in this generated code
// Original prompt was: "Create a product search function"

function search_products(query, filters) {
    var results = [];
    for (var i = 0; i < products.length; i++) {
        var product = products[i];
        if (product.name.indexOf(query) !== -1) {
            results.push(product);
        }
    }
    return results;
}

// YOUR TASK: Rewrite the prompt to generate code that follows these style rules:
// - Use camelCase naming
// - Use const/let instead of var
// - Use modern array methods instead of for loops
// - Use includes() instead of indexOf()
// - Add proper error handling
// - Use destructuring where appropriate

// Exercise 2: Create a style-consistent prompt
// Given this existing codebase pattern:

const createLogger = (moduleName) => ({
    info: (message, meta = {}) => console.log(`[INFO] ${moduleName}: ${message}`, meta),
    error: (message, meta = {}) => console.error(`[ERROR] ${moduleName}: ${message}`, meta),
    warn: (message, meta = {}) => console.warn(`[WARN] ${moduleName}: ${message}`, meta),
});

// YOUR TASK: Write a prompt that would generate a similar logger function
// but for database operations, following the exact same pattern and style.

// Exercise 3: Component Style Consistency
// Given this React component pattern:

const LoadingSpinner = ({ size = 'medium', color = 'primary' }) => {
    const sizeClasses = {
        small: 'w-4 h-4',
        medium: 'w-8 h-8',
        large: 'w-12 h-12',
    };

    const colorClasses = {
        primary: 'text-blue-500',
        secondary: 'text-gray-500',
        success: 'text-green-500',
    };

    return (
        <div className={`animate-spin ${sizeClasses[size]} ${colorClasses[color]}`}>
            <svg viewBox="0 0 24 24" fill="currentColor">
                {/* SVG content */}
            </svg>
        </div>
    );
};

// YOUR TASK: Write a prompt that would generate a Button component
// following the same style patterns (prop structure, className handling, etc.)