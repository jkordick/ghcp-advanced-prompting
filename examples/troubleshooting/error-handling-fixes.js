/**
 * Error Handling Fixes - Adding Comprehensive Error Handling to Suggestions
 * 
 * This file demonstrates how to enhance GitHub Copilot suggestions with robust
 * error handling, input validation, and fault tolerance.
 */

// =======================================
// PROBLEM: Missing Error Handling
// =======================================

// ❌ TYPICAL COPILOT SUGGESTION: Basic function without error handling
// Prompt: "Create a user login function"

async function loginUser(email, password) {
    const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    localStorage.setItem('token', data.token);
    return data.user;
}

// PROBLEMS:
// - No input validation
// - No network error handling
// - No HTTP status checking
// - No token validation
// - No fallback mechanisms

// =======================================
// SOLUTION 1: Comprehensive Error Handling Prompts
// =======================================

// ✅ BETTER APPROACH: Specify error handling requirements in the prompt

// Create a user login function with comprehensive error handling:
// - Validate input parameters (email format, password requirements)
// - Handle network errors (timeout, no connection)
// - Check HTTP status codes and handle different error responses
// - Validate response data structure
// - Implement retry logic for transient failures
// - Provide user-friendly error messages
// - Log errors for debugging without exposing sensitive data

async function loginUserSecure(email, password) {
    // Input validation
    if (!email || typeof email !== 'string') {
        throw new Error('Valid email address is required');
    }
    
    if (!password || typeof password !== 'string' || password.length < 8) {
        throw new Error('Password must be at least 8 characters long');
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new Error('Please enter a valid email address');
    }
    
    let lastError;
    const maxRetries = 3;
    
    // Retry logic for transient failures
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            // Network request with timeout
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
            
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ email: email.toLowerCase().trim(), password }),
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            // Handle different HTTP status codes
            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Invalid email or password');
                } else if (response.status === 429) {
                    throw new Error('Too many login attempts. Please try again later');
                } else if (response.status >= 500) {
                    throw new Error('Server error. Please try again later');
                } else {
                    throw new Error(`Login failed: ${response.statusText}`);
                }
            }
            
            // Validate response content type
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Invalid response format from server');
            }
            
            const data = await response.json();
            
            // Validate response structure
            if (!data || typeof data !== 'object') {
                throw new Error('Invalid response data');
            }
            
            if (!data.token || typeof data.token !== 'string') {
                throw new Error('Authentication token not received');
            }
            
            if (!data.user || typeof data.user !== 'object') {
                throw new Error('User information not received');
            }
            
            // Validate token format (basic JWT check)
            const tokenParts = data.token.split('.');
            if (tokenParts.length !== 3) {
                throw new Error('Invalid authentication token format');
            }
            
            // Store token securely
            try {
                localStorage.setItem('token', data.token);
                localStorage.setItem('tokenExpiry', data.expiresAt || (Date.now() + 24 * 60 * 60 * 1000));
            } catch (storageError) {
                console.warn('Failed to store authentication token:', storageError);
                // Continue anyway - user is logged in, just won't persist
            }
            
            // Log successful login (without sensitive data)
            console.log('User logged in successfully', { 
                userId: data.user.id, 
                timestamp: new Date().toISOString() 
            });
            
            return {
                success: true,
                user: data.user,
                token: data.token
            };
            
        } catch (error) {
            lastError = error;
            
            // Log error for debugging
            console.error(`Login attempt ${attempt} failed:`, {
                error: error.message,
                email: email.substring(0, 3) + '***', // Partial email for debugging
                timestamp: new Date().toISOString(),
                attempt
            });
            
            // Don't retry on authentication errors or client errors
            if (error.message.includes('Invalid email or password') || 
                error.message.includes('email') || 
                error.message.includes('password') ||
                (error.name === 'TypeError' && error.message.includes('format'))) {
                break;
            }
            
            // Don't retry on rate limiting
            if (error.message.includes('Too many login attempts')) {
                break;
            }
            
            // Wait before retrying (exponential backoff)
            if (attempt < maxRetries) {
                const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }
    
    // All attempts failed
    throw new Error(lastError?.message || 'Login failed after multiple attempts');
}

// =======================================
// SOLUTION 2: API Request Error Handling
// =======================================

// Create a robust API client with comprehensive error handling:
// - Network timeouts and retries
// - HTTP status code handling
// - Request/response validation
// - Circuit breaker pattern for failing services
// - Rate limiting awareness
// - Offline handling

class ApiClient {
    constructor(baseURL, options = {}) {
        this.baseURL = baseURL;
        this.timeout = options.timeout || 10000;
        this.maxRetries = options.maxRetries || 3;
        this.retryDelay = options.retryDelay || 1000;
        this.circuitBreaker = {
            failures: 0,
            lastFailure: null,
            threshold: options.circuitBreakerThreshold || 5,
            resetTimeout: options.circuitBreakerReset || 60000
        };
    }

    async request(endpoint, options = {}) {
        // Check circuit breaker
        if (this.isCircuitOpen()) {
            throw new Error('Service temporarily unavailable. Please try again later.');
        }

        // Validate inputs
        if (!endpoint || typeof endpoint !== 'string') {
            throw new Error('Valid endpoint is required');
        }

        const url = `${this.baseURL}${endpoint}`;
        let lastError;

        for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
            try {
                // Check if online
                if (!navigator.onLine) {
                    throw new Error('No internet connection. Please check your network and try again.');
                }

                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), this.timeout);

                const config = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        ...options.headers
                    },
                    signal: controller.signal,
                    ...options
                };

                // Add authentication if available
                const token = localStorage.getItem('token');
                if (token && this.isTokenValid()) {
                    config.headers.Authorization = `Bearer ${token}`;
                }

                const response = await fetch(url, config);
                clearTimeout(timeoutId);

                // Handle different HTTP status codes
                if (!response.ok) {
                    const errorBody = await this.safelyParseResponse(response);
                    
                    switch (response.status) {
                        case 400:
                            throw new Error(errorBody?.message || 'Invalid request. Please check your input.');
                        case 401:
                            this.handleAuthError();
                            throw new Error('Authentication required. Please log in again.');
                        case 403:
                            throw new Error('You do not have permission to perform this action.');
                        case 404:
                            throw new Error('The requested resource was not found.');
                        case 409:
                            throw new Error(errorBody?.message || 'Conflict. The resource already exists or is in use.');
                        case 422:
                            throw new Error(errorBody?.message || 'Validation failed. Please check your input.');
                        case 429:
                            const retryAfter = response.headers.get('Retry-After');
                            throw new Error(`Too many requests. Please try again ${retryAfter ? `after ${retryAfter} seconds` : 'later'}.`);
                        case 500:
                            throw new Error('Server error. Please try again later.');
                        case 502:
                        case 503:
                        case 504:
                            throw new Error('Service temporarily unavailable. Please try again later.');
                        default:
                            throw new Error(`Request failed: ${response.status} ${response.statusText}`);
                    }
                }

                // Validate response
                const data = await this.safelyParseResponse(response);
                
                // Reset circuit breaker on success
                this.circuitBreaker.failures = 0;
                this.circuitBreaker.lastFailure = null;

                return data;

            } catch (error) {
                lastError = error;

                // Track failures for circuit breaker
                if (this.isServerError(error)) {
                    this.circuitBreaker.failures++;
                    this.circuitBreaker.lastFailure = Date.now();
                }

                // Log error
                console.error(`API request attempt ${attempt} failed:`, {
                    url,
                    error: error.message,
                    attempt,
                    timestamp: new Date().toISOString()
                });

                // Don't retry on client errors or auth errors
                if (this.shouldNotRetry(error)) {
                    break;
                }

                // Wait before retrying
                if (attempt < this.maxRetries) {
                    const delay = this.retryDelay * Math.pow(2, attempt - 1);
                    await new Promise(resolve => setTimeout(resolve, delay));
                }
            }
        }

        throw lastError;
    }

    async safelyParseResponse(response) {
        try {
            const text = await response.text();
            return text ? JSON.parse(text) : null;
        } catch (error) {
            console.warn('Failed to parse response as JSON:', error);
            return null;
        }
    }

    isCircuitOpen() {
        if (this.circuitBreaker.failures >= this.circuitBreaker.threshold) {
            const timeSinceLastFailure = Date.now() - this.circuitBreaker.lastFailure;
            return timeSinceLastFailure < this.circuitBreaker.resetTimeout;
        }
        return false;
    }

    isServerError(error) {
        return error.message.includes('Server error') || 
               error.message.includes('Service temporarily unavailable') ||
               error.name === 'AbortError';
    }

    shouldNotRetry(error) {
        return error.message.includes('Invalid request') ||
               error.message.includes('Authentication required') ||
               error.message.includes('permission') ||
               error.message.includes('not found') ||
               error.message.includes('Validation failed') ||
               error.message.includes('No internet connection');
    }

    isTokenValid() {
        const expiry = localStorage.getItem('tokenExpiry');
        return expiry && Date.now() < parseInt(expiry);
    }

    handleAuthError() {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiry');
        // Trigger app-wide logout
        window.dispatchEvent(new CustomEvent('auth:logout'));
    }

    // Convenience methods
    async get(endpoint, options = {}) {
        return this.request(endpoint, { ...options, method: 'GET' });
    }

    async post(endpoint, data, options = {}) {
        return this.request(endpoint, {
            ...options,
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    async put(endpoint, data, options = {}) {
        return this.request(endpoint, {
            ...options,
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    async delete(endpoint, options = {}) {
        return this.request(endpoint, { ...options, method: 'DELETE' });
    }
}

// =======================================
// SOLUTION 3: File Operations Error Handling
// =======================================

// Create a file upload function with comprehensive error handling:
// - File validation (type, size, name)
// - Progress tracking with error recovery
// - Upload retry logic
// - Server response validation
// - Cleanup on failure

async function uploadFileSecure(file, options = {}) {
    // Input validation
    if (!file || !(file instanceof File)) {
        throw new Error('A valid file is required');
    }

    // File type validation
    const allowedTypes = options.allowedTypes || ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
        throw new Error(`File type ${file.type} is not allowed. Allowed types: ${allowedTypes.join(', ')}`);
    }

    // File size validation
    const maxSize = options.maxSize || 10 * 1024 * 1024; // 10MB default
    if (file.size > maxSize) {
        const maxSizeMB = Math.round(maxSize / (1024 * 1024));
        throw new Error(`File size exceeds maximum allowed size of ${maxSizeMB}MB`);
    }

    // File name validation
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    if (sanitizedName !== file.name) {
        console.warn('File name was sanitized:', file.name, '->', sanitizedName);
    }

    const formData = new FormData();
    formData.append('file', file, sanitizedName);
    
    if (options.metadata) {
        formData.append('metadata', JSON.stringify(options.metadata));
    }

    let uploadUrl;
    let uploadId;

    try {
        // Step 1: Initialize upload
        const initResponse = await fetch('/api/upload/init', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fileName: sanitizedName,
                fileSize: file.size,
                fileType: file.type
            })
        });

        if (!initResponse.ok) {
            throw new Error(`Upload initialization failed: ${initResponse.statusText}`);
        }

        const initData = await initResponse.json();
        uploadUrl = initData.uploadUrl;
        uploadId = initData.uploadId;

        if (!uploadUrl || !uploadId) {
            throw new Error('Invalid upload initialization response');
        }

        // Step 2: Upload file with progress tracking
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            
            // Progress tracking
            xhr.upload.addEventListener('progress', (event) => {
                if (event.lengthComputable) {
                    const progress = (event.loaded / event.total) * 100;
                    if (options.onProgress) {
                        options.onProgress(progress, event.loaded, event.total);
                    }
                }
            });

            // Success handler
            xhr.addEventListener('load', async () => {
                try {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        const response = JSON.parse(xhr.responseText);
                        
                        // Validate response
                        if (!response.fileId || !response.url) {
                            throw new Error('Invalid upload response');
                        }

                        resolve({
                            success: true,
                            fileId: response.fileId,
                            url: response.url,
                            fileName: sanitizedName,
                            fileSize: file.size
                        });
                    } else {
                        throw new Error(`Upload failed: ${xhr.status} ${xhr.statusText}`);
                    }
                } catch (error) {
                    // Cleanup on failure
                    await cleanupFailedUpload(uploadId);
                    reject(error);
                }
            });

            // Error handler
            xhr.addEventListener('error', async () => {
                await cleanupFailedUpload(uploadId);
                reject(new Error('Upload failed due to network error'));
            });

            // Timeout handler
            xhr.addEventListener('timeout', async () => {
                await cleanupFailedUpload(uploadId);
                reject(new Error('Upload timed out'));
            });

            // Abort handler
            xhr.addEventListener('abort', async () => {
                await cleanupFailedUpload(uploadId);
                reject(new Error('Upload was cancelled'));
            });

            // Configure request
            xhr.timeout = options.timeout || 300000; // 5 minutes default
            xhr.open('POST', uploadUrl);
            
            // Add auth header
            const token = localStorage.getItem('token');
            if (token) {
                xhr.setRequestHeader('Authorization', `Bearer ${token}`);
            }

            // Start upload
            xhr.send(formData);

            // Return abort function
            if (options.onAbort) {
                options.onAbort(() => xhr.abort());
            }
        });

    } catch (error) {
        // Cleanup on any failure
        if (uploadId) {
            await cleanupFailedUpload(uploadId);
        }
        
        throw error;
    }
}

// Helper function for cleanup
async function cleanupFailedUpload(uploadId) {
    try {
        await fetch(`/api/upload/${uploadId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
    } catch (error) {
        console.warn('Failed to cleanup upload:', error);
    }
}

// =======================================
// SOLUTION 4: Database Operation Error Handling
// =======================================

// Create a database service with comprehensive error handling:
// - Connection management
// - Transaction support
// - Query validation
// - Deadlock handling
// - Performance monitoring

class DatabaseService {
    constructor(connectionConfig) {
        this.config = connectionConfig;
        this.connectionPool = null;
        this.queryTimeout = 30000; // 30 seconds
        this.retryAttempts = 3;
    }

    async executeQuery(query, params = [], options = {}) {
        if (!query || typeof query !== 'string') {
            throw new Error('Valid SQL query is required');
        }

        // Validate parameters
        if (params && !Array.isArray(params)) {
            throw new Error('Query parameters must be an array');
        }

        const startTime = Date.now();
        let connection;
        let attempt = 0;

        while (attempt < this.retryAttempts) {
            try {
                // Get connection from pool
                connection = await this.getConnection();
                
                // Set query timeout
                await connection.query('SET SESSION wait_timeout = ?', [this.queryTimeout / 1000]);
                
                // Execute query
                const [rows, fields] = await Promise.race([
                    connection.execute(query, params),
                    new Promise((_, reject) => 
                        setTimeout(() => reject(new Error('Query timeout')), this.queryTimeout)
                    )
                ]);

                // Log performance metrics
                const duration = Date.now() - startTime;
                this.logQueryPerformance(query, duration, rows.length);

                return { rows, fields, affectedRows: rows.affectedRows };

            } catch (error) {
                attempt++;
                
                // Handle specific database errors
                if (this.isDeadlockError(error)) {
                    if (attempt < this.retryAttempts) {
                        console.warn(`Deadlock detected, retrying... (attempt ${attempt})`);
                        await this.delay(Math.random() * 100 + 50); // Random delay 50-150ms
                        continue;
                    }
                    throw new Error('Database deadlock - operation failed after retries');
                }

                if (this.isConnectionError(error)) {
                    if (attempt < this.retryAttempts) {
                        console.warn(`Connection error, retrying... (attempt ${attempt})`);
                        await this.resetConnection();
                        await this.delay(1000 * attempt); // Exponential backoff
                        continue;
                    }
                    throw new Error('Database connection failed after retries');
                }

                if (this.isConstraintError(error)) {
                    throw new Error(`Database constraint violation: ${this.parseConstraintError(error)}`);
                }

                if (error.message.includes('timeout')) {
                    throw new Error('Database query timed out - operation took too long');
                }

                // Generic database error
                console.error('Database query failed:', {
                    query: query.substring(0, 100) + '...',
                    error: error.message,
                    attempt,
                    duration: Date.now() - startTime
                });

                throw new Error(`Database operation failed: ${error.message}`);

            } finally {
                // Always release connection
                if (connection) {
                    try {
                        await connection.release();
                    } catch (releaseError) {
                        console.warn('Failed to release database connection:', releaseError);
                    }
                }
            }
        }
    }

    async transaction(operations) {
        if (!Array.isArray(operations) || operations.length === 0) {
            throw new Error('Transaction operations must be a non-empty array');
        }

        let connection;
        
        try {
            connection = await this.getConnection();
            await connection.beginTransaction();

            const results = [];

            for (let i = 0; i < operations.length; i++) {
                const operation = operations[i];
                
                if (!operation.query || !operation.params) {
                    throw new Error(`Invalid operation at index ${i}: missing query or params`);
                }

                try {
                    const [rows] = await connection.execute(operation.query, operation.params);
                    results.push(rows);
                } catch (error) {
                    throw new Error(`Transaction failed at operation ${i + 1}: ${error.message}`);
                }
            }

            await connection.commit();
            return results;

        } catch (error) {
            if (connection) {
                try {
                    await connection.rollback();
                } catch (rollbackError) {
                    console.error('Failed to rollback transaction:', rollbackError);
                }
            }
            
            throw error;

        } finally {
            if (connection) {
                try {
                    await connection.release();
                } catch (releaseError) {
                    console.warn('Failed to release transaction connection:', releaseError);
                }
            }
        }
    }

    // Helper methods
    async getConnection() {
        if (!this.connectionPool) {
            throw new Error('Database connection pool not initialized');
        }
        return await this.connectionPool.getConnection();
    }

    async resetConnection() {
        try {
            if (this.connectionPool) {
                await this.connectionPool.end();
            }
            this.connectionPool = await this.createConnectionPool();
        } catch (error) {
            console.error('Failed to reset database connection:', error);
            throw error;
        }
    }

    isDeadlockError(error) {
        return error.code === 'ER_LOCK_DEADLOCK' || 
               error.message.includes('deadlock');
    }

    isConnectionError(error) {
        return error.code === 'ECONNRESET' || 
               error.code === 'ECONNREFUSED' || 
               error.code === 'ETIMEDOUT' ||
               error.message.includes('connection');
    }

    isConstraintError(error) {
        return error.code === 'ER_DUP_ENTRY' || 
               error.code === 'ER_NO_REFERENCED_ROW' ||
               error.message.includes('constraint');
    }

    parseConstraintError(error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return 'Duplicate entry - record already exists';
        }
        if (error.code === 'ER_NO_REFERENCED_ROW') {
            return 'Referenced record does not exist';
        }
        return 'Data constraint violation';
    }

    logQueryPerformance(query, duration, rowCount) {
        if (duration > 5000) { // Log slow queries
            console.warn('Slow query detected:', {
                query: query.substring(0, 100) + '...',
                duration: `${duration}ms`,
                rowCount
            });
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// ========================
// PRACTICE EXERCISES
// ========================

// Exercise 1: Add error handling to this basic function
// Original Copilot suggestion without error handling:

function calculateTotal(items) {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

// YOUR TASK: Enhance this function with comprehensive error handling
// Consider: input validation, number validation, overflow protection, etc.

// Exercise 2: Improve this API call
// Basic suggestion without error handling:

async function fetchUserOrders(userId) {
    const response = await fetch(`/api/users/${userId}/orders`);
    const orders = await response.json();
    return orders;
}

// YOUR TASK: Add comprehensive error handling following the patterns shown above

// Exercise 3: Create an error-aware prompt
// Write a prompt that would generate a password reset function with:
// - Input validation
// - Rate limiting awareness  
// - Email service error handling
// - Database error handling
// - Security considerations