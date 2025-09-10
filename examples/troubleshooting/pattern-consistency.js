/**
 * Pattern Consistency - Ensuring Consistent Patterns Across Files
 * 
 * This file demonstrates how to maintain architectural and design patterns
 * when using GitHub Copilot across multiple files in a project.
 */

// ========================================
// PROBLEM: Inconsistent Architecture Patterns
// ========================================

// Different files in your project might use different patterns for similar functionality
// even when you want consistency across your codebase.

// File 1: userService.js - Uses promises
const userService = {
    getUser: (id) => {
        return fetch(`/api/users/${id}`).then(res => res.json());
    },
    
    createUser: (userData) => {
        return fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify(userData)
        }).then(res => res.json());
    }
};

// File 2: productService.js - Uses async/await (inconsistent!)
const productService = {
    async getProduct(id) {
        const response = await fetch(`/api/products/${id}`);
        return response.json();
    },
    
    async createProduct(productData) {
        const response = await fetch('/api/products', {
            method: 'POST',
            body: JSON.stringify(productData)
        });
        return response.json();
    }
};

// PROBLEM: Mixing promise chains and async/await makes code harder to maintain

// =====================================
// SOLUTION 1: Establish Pattern Examples
// =====================================

// ✅ APPROACH: Show Copilot your established patterns

// Our standard service pattern (async/await with error handling):
const baseService = {
    async get(endpoint) {
        try {
            const response = await fetch(endpoint);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`GET ${endpoint} failed:`, error);
            throw error;
        }
    },

    async post(endpoint, data) {
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error(`POST ${endpoint} failed:`, error);
            throw error;
        }
    }
};

// Following the baseService pattern above, create an orderService:
const orderService = {
    async getOrder(orderId) {
        return baseService.get(`/api/orders/${orderId}`);
    },

    async createOrder(orderData) {
        return baseService.post('/api/orders', orderData);
    },

    async updateOrder(orderId, updates) {
        try {
            const response = await fetch(`/api/orders/${orderId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updates),
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error(`PATCH /api/orders/${orderId} failed:`, error);
            throw error;
        }
    },

    async deleteOrder(orderId) {
        try {
            const response = await fetch(`/api/orders/${orderId}`, {
                method: 'DELETE',
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            return response.status === 204 ? null : await response.json();
        } catch (error) {
            console.error(`DELETE /api/orders/${orderId} failed:`, error);
            throw error;
        }
    }
};

// =======================================
// SOLUTION 2: Component Architecture Patterns
// =======================================

// Establish consistent React component patterns:

// Our standard component structure pattern:
import React, { useState, useEffect } from 'react';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { ErrorMessage } from '../common/ErrorMessage';

const UserList = () => {
    // 1. State hooks first
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 2. Effect hooks next
    useEffect(() => {
        fetchUsers();
    }, []);

    // 3. Event handlers and other functions
    const fetchUsers = async () => {
        try {
            setLoading(true);
            setError(null);
            const userData = await userService.getUsers();
            setUsers(userData);
        } catch (err) {
            setError('Failed to load users');
            console.error('Error fetching users:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleUserDelete = async (userId) => {
        try {
            await userService.deleteUser(userId);
            setUsers(users.filter(user => user.id !== userId));
        } catch (err) {
            setError('Failed to delete user');
            console.error('Error deleting user:', err);
        }
    };

    // 4. Render logic with early returns
    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <div className="user-list">
            <h2>Users</h2>
            {users.length === 0 ? (
                <p>No users found</p>
            ) : (
                <ul>
                    {users.map(user => (
                        <li key={user.id}>
                            {user.name} ({user.email})
                            <button onClick={() => handleUserDelete(user.id)}>
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

// Following the UserList component pattern above, create a ProductList component:
const ProductList = () => {
    // State hooks first
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Effect hooks next
    useEffect(() => {
        fetchProducts();
    }, []);

    // Event handlers and other functions
    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError(null);
            const productData = await productService.getProducts();
            setProducts(productData);
        } catch (err) {
            setError('Failed to load products');
            console.error('Error fetching products:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleProductDelete = async (productId) => {
        try {
            await productService.deleteProduct(productId);
            setProducts(products.filter(product => product.id !== productId));
        } catch (err) {
            setError('Failed to delete product');
            console.error('Error deleting product:', err);
        }
    };

    // Render logic with early returns
    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <div className="product-list">
            <h2>Products</h2>
            {products.length === 0 ? (
                <p>No products found</p>
            ) : (
                <div className="product-grid">
                    {products.map(product => (
                        <div key={product.id} className="product-card">
                            <h3>{product.name}</h3>
                            <p>${product.price}</p>
                            <button onClick={() => handleProductDelete(product.id)}>
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// =================================
// SOLUTION 3: Validation Patterns
// =================================

// Establish consistent validation patterns:

// Our standard validation pattern:
const createValidator = (rules) => {
    return (data) => {
        const errors = {};
        
        for (const [field, fieldRules] of Object.entries(rules)) {
            const value = data[field];
            
            for (const rule of fieldRules) {
                const error = rule(value, data);
                if (error) {
                    errors[field] = error;
                    break; // Stop at first error for this field
                }
            }
        }
        
        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    };
};

// Validation rule functions:
const required = (message = 'This field is required') => (value) => {
    return (!value || value.toString().trim() === '') ? message : null;
};

const minLength = (min, message) => (value) => {
    return (value && value.length < min) ? (message || `Must be at least ${min} characters`) : null;
};

const email = (message = 'Invalid email format') => (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return (value && !emailRegex.test(value)) ? message : null;
};

// Example: User validation following our pattern
const userValidator = createValidator({
    firstName: [
        required('First name is required'),
        minLength(2, 'First name must be at least 2 characters')
    ],
    lastName: [
        required('Last name is required'),
        minLength(2, 'Last name must be at least 2 characters')
    ],
    email: [
        required('Email is required'),
        email('Please enter a valid email address')
    ]
});

// Following the user validation pattern above, create product validation:
const productValidator = createValidator({
    name: [
        required('Product name is required'),
        minLength(3, 'Product name must be at least 3 characters')
    ],
    price: [
        required('Price is required'),
        (value) => {
            const num = parseFloat(value);
            return (isNaN(num) || num <= 0) ? 'Price must be a positive number' : null;
        }
    ],
    category: [
        required('Category is required')
    ],
    description: [
        minLength(10, 'Description must be at least 10 characters')
    ]
});

// =====================================
// SOLUTION 4: Error Handling Patterns
// =====================================

// Consistent error handling across the application:

// Our standard error handling pattern:
class AppError extends Error {
    constructor(message, statusCode = 500, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.timestamp = new Date().toISOString();
        
        Error.captureStackTrace(this, this.constructor);
    }
}

const handleAsyncError = (fn) => {
    return async (...args) => {
        try {
            return await fn(...args);
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            
            // Convert unknown errors to AppError
            throw new AppError(
                'An unexpected error occurred',
                500,
                false
            );
        }
    };
};

// Example usage pattern:
const userController = {
    getUser: handleAsyncError(async (req, res) => {
        const { id } = req.params;
        
        if (!id) {
            throw new AppError('User ID is required', 400);
        }
        
        const user = await userService.getUser(id);
        
        if (!user) {
            throw new AppError('User not found', 404);
        }
        
        res.json({ success: true, data: user });
    }),

    createUser: handleAsyncError(async (req, res) => {
        const validation = userValidator(req.body);
        
        if (!validation.isValid) {
            throw new AppError('Validation failed', 400, true, validation.errors);
        }
        
        const user = await userService.createUser(req.body);
        res.status(201).json({ success: true, data: user });
    })
};

// Following the userController pattern above, create productController:
const productController = {
    getProduct: handleAsyncError(async (req, res) => {
        const { id } = req.params;
        
        if (!id) {
            throw new AppError('Product ID is required', 400);
        }
        
        const product = await productService.getProduct(id);
        
        if (!product) {
            throw new AppError('Product not found', 404);
        }
        
        res.json({ success: true, data: product });
    }),

    createProduct: handleAsyncError(async (req, res) => {
        const validation = productValidator(req.body);
        
        if (!validation.isValid) {
            throw new AppError('Validation failed', 400, true, validation.errors);
        }
        
        const product = await productService.createProduct(req.body);
        res.status(201).json({ success: true, data: product });
    }),

    updateProduct: handleAsyncError(async (req, res) => {
        const { id } = req.params;
        
        if (!id) {
            throw new AppError('Product ID is required', 400);
        }
        
        const validation = productValidator(req.body);
        
        if (!validation.isValid) {
            throw new AppError('Validation failed', 400, true, validation.errors);
        }
        
        const product = await productService.updateProduct(id, req.body);
        
        if (!product) {
            throw new AppError('Product not found', 404);
        }
        
        res.json({ success: true, data: product });
    })
};

// ==========================================
// ADVANCED: Cross-File Pattern Enforcement
// ==========================================

// Create template comments that enforce patterns:

/* 
TEMPLATE: API Endpoint
Following our standard controller pattern:
1. Extract and validate parameters
2. Apply business validation using appropriate validator
3. Call service layer method
4. Handle errors with AppError
5. Return consistent response format
*/

// Using the template above, create the order endpoints:
const orderController = {
    getOrder: handleAsyncError(async (req, res) => {
        // 1. Extract and validate parameters
        const { id } = req.params;
        
        if (!id) {
            throw new AppError('Order ID is required', 400);
        }
        
        // 2. No additional validation needed for GET
        
        // 3. Call service layer method
        const order = await orderService.getOrder(id);
        
        // 4. Handle errors (not found)
        if (!order) {
            throw new AppError('Order not found', 404);
        }
        
        // 5. Return consistent response format
        res.json({ success: true, data: order });
    }),

    createOrder: handleAsyncError(async (req, res) => {
        // 1. Extract parameters (body for POST)
        const orderData = req.body;
        
        // 2. Apply business validation
        const validation = orderValidator(orderData);
        
        if (!validation.isValid) {
            throw new AppError('Validation failed', 400, true, validation.errors);
        }
        
        // 3. Call service layer method
        const order = await orderService.createOrder(orderData);
        
        // 4. Error handling is in service layer and handleAsyncError
        
        // 5. Return consistent response format
        res.status(201).json({ success: true, data: order });
    })
};

// =========================
// PRACTICE EXERCISES
// =========================

// Exercise 1: Identify Pattern Inconsistencies
// Look at these three similar functions and identify what's inconsistent:

function processUserData(userData) {
    if (!userData.email) return null;
    return { id: userData.id, email: userData.email.toLowerCase() };
}

async function processProductData(productData) {
    if (!productData.name) {
        throw new Error('Name is required');
    }
    return {
        id: productData.id,
        name: productData.name.trim(),
        price: parseFloat(productData.price)
    };
}

const processOrderData = (orderData) => {
    const errors = [];
    if (!orderData.customerId) errors.push('Customer ID required');
    if (!orderData.items) errors.push('Items required');
    
    if (errors.length > 0) {
        return { success: false, errors };
    }
    
    return {
        success: true,
        data: {
            id: orderData.id,
            customerId: orderData.customerId,
            items: orderData.items.map(item => ({
                productId: item.productId,
                quantity: parseInt(item.quantity)
            }))
        }
    };
};

// YOUR TASK: Rewrite these functions to follow a consistent pattern

// Exercise 2: Create Pattern-Consistent Code
// Given this authentication pattern:

const authMiddleware = {
    requireAuth: (req, res, next) => {
        const token = req.headers.authorization?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({
                success: false,
                error: 'Authentication token required'
            });
        }
        
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (error) {
            return res.status(401).json({
                success: false,
                error: 'Invalid authentication token'
            });
        }
    }
};

// YOUR TASK: Create authorization middleware following the same pattern
// that checks for specific user roles (admin, user, etc.)

// Exercise 3: Enforce Component Patterns
// Given this form component pattern:

const ContactForm = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Implementation...
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Form JSX */}
        </form>
    );
};

// YOUR TASK: Write a prompt that would generate a NewsletterForm component
// following the exact same pattern and structure.