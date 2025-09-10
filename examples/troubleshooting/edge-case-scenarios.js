/**
 * Edge Case Scenarios - Covering Overlooked Edge Cases
 * 
 * This file demonstrates how to identify and handle edge cases that 
 * GitHub Copilot might overlook in its initial suggestions.
 */

// ======================================
// PROBLEM: Missing Edge Case Handling
// ======================================

// ❌ TYPICAL COPILOT SUGGESTION: Handles the happy path only
// Prompt: "Create a function to format a phone number"

function formatPhoneNumber(phone) {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    return `(${match[1]}) ${match[2]}-${match[3]}`;
}

// PROBLEMS:
// - Assumes US format only
// - No null/undefined handling
// - No empty string handling
// - No international numbers
// - No extension handling
// - Crashes on invalid input

// =======================================
// SOLUTION 1: Comprehensive Edge Case Prompts
// =======================================

// ✅ BETTER APPROACH: Explicitly list edge cases in the prompt

// Create a phone number formatting function that handles these edge cases:
// - Null, undefined, or empty input
// - Non-string input types
// - International numbers with country codes
// - Numbers with extensions
// - Invalid or incomplete numbers
// - Numbers with various separators (spaces, dashes, dots, parentheses)
// - Different country formats (US, UK, international)
// - Very long or very short inputs
// - Numbers with letters (like 1-800-FLOWERS)

function formatPhoneNumberRobust(phone, options = {}) {
    const { 
        country = 'US', 
        includeCountryCode = false, 
        defaultCountryCode = '+1',
        allowExtensions = true 
    } = options;

    // Handle null, undefined, or non-string input
    if (phone == null) {
        return '';
    }

    if (typeof phone !== 'string' && typeof phone !== 'number') {
        return '';
    }

    const phoneStr = String(phone).trim();

    // Handle empty string
    if (!phoneStr) {
        return '';
    }

    // Handle extension detection
    let extension = '';
    let mainNumber = phoneStr;
    
    if (allowExtensions) {
        const extMatch = phoneStr.match(/(.+?)(?:\s*(?:ext|extension|x)\s*[:.]?\s*(\d+))$/i);
        if (extMatch) {
            mainNumber = extMatch[1].trim();
            extension = extMatch[2];
        }
    }

    // Clean the number (remove all non-digits except + for international)
    let cleaned = mainNumber.replace(/[^\d+]/g, '');

    // Handle international numbers starting with +
    let countryCode = '';
    if (cleaned.startsWith('+')) {
        const intlMatch = cleaned.match(/^\+(\d{1,3})(.+)$/);
        if (intlMatch) {
            countryCode = `+${intlMatch[1]}`;
            cleaned = intlMatch[2];
        }
    }

    // Handle numbers with country code but no + (like 15551234567)
    if (!countryCode && cleaned.length > 10) {
        if (country === 'US' && cleaned.length === 11 && cleaned.startsWith('1')) {
            countryCode = '+1';
            cleaned = cleaned.substring(1);
        }
    }

    // Validate minimum length
    if (cleaned.length < 7) {
        return phoneStr; // Return original if too short to be valid
    }

    // Handle different formats based on country
    switch (country.toUpperCase()) {
        case 'US':
        case 'CA':
            return formatUSPhone(cleaned, countryCode, extension, includeCountryCode, defaultCountryCode);
        
        case 'UK':
            return formatUKPhone(cleaned, countryCode, extension, includeCountryCode);
        
        default:
            return formatInternationalPhone(cleaned, countryCode || defaultCountryCode, extension, includeCountryCode);
    }
}

function formatUSPhone(cleaned, countryCode, extension, includeCountryCode, defaultCountryCode) {
    // Handle 10-digit US numbers
    if (cleaned.length === 10) {
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            let formatted = `(${match[1]}) ${match[2]}-${match[3]}`;
            
            if (includeCountryCode) {
                formatted = `${countryCode || defaultCountryCode} ${formatted}`;
            }
            
            if (extension) {
                formatted += ` ext. ${extension}`;
            }
            
            return formatted;
        }
    }
    
    // Handle 7-digit numbers (local)
    if (cleaned.length === 7) {
        const match = cleaned.match(/^(\d{3})(\d{4})$/);
        if (match) {
            let formatted = `${match[1]}-${match[2]}`;
            
            if (extension) {
                formatted += ` ext. ${extension}`;
            }
            
            return formatted;
        }
    }
    
    // Invalid length - return with country code if available
    let result = cleaned;
    if (countryCode && includeCountryCode) {
        result = `${countryCode} ${result}`;
    }
    if (extension) {
        result += ` ext. ${extension}`;
    }
    return result;
}

function formatUKPhone(cleaned, countryCode, extension, includeCountryCode) {
    // UK mobile (11 digits starting with 07)
    if (cleaned.length === 11 && cleaned.startsWith('07')) {
        const match = cleaned.match(/^(\d{5})(\d{6})$/);
        if (match) {
            let formatted = `${match[1]} ${match[2]}`;
            
            if (includeCountryCode) {
                formatted = `${countryCode || '+44'} ${formatted}`;
            }
            
            if (extension) {
                formatted += ` ext. ${extension}`;
            }
            
            return formatted;
        }
    }
    
    // UK landline patterns vary by region
    if (cleaned.length >= 10 && cleaned.length <= 11) {
        // London (020)
        if (cleaned.startsWith('020') || cleaned.startsWith('20')) {
            const number = cleaned.startsWith('020') ? cleaned : '0' + cleaned;
            const match = number.match(/^(020)(\d{4})(\d{4})$/);
            if (match) {
                let formatted = `${match[1]} ${match[2]} ${match[3]}`;
                
                if (includeCountryCode) {
                    formatted = `${countryCode || '+44'} ${formatted.substring(1)}`; // Remove leading 0
                }
                
                if (extension) {
                    formatted += ` ext. ${extension}`;
                }
                
                return formatted;
            }
        }
    }
    
    // Fallback for other UK formats
    let result = cleaned;
    if (countryCode && includeCountryCode) {
        result = `${countryCode} ${result}`;
    }
    if (extension) {
        result += ` ext. ${extension}`;
    }
    return result;
}

function formatInternationalPhone(cleaned, countryCode, extension, includeCountryCode) {
    // Generic international formatting
    let formatted = cleaned;
    
    // Add spacing for readability (every 3-4 digits)
    if (cleaned.length > 4) {
        const groups = [];
        let remaining = cleaned;
        
        while (remaining.length > 0) {
            const groupSize = remaining.length > 7 ? 3 : Math.min(4, remaining.length);
            groups.push(remaining.substring(0, groupSize));
            remaining = remaining.substring(groupSize);
        }
        
        formatted = groups.join(' ');
    }
    
    if (includeCountryCode && countryCode) {
        formatted = `${countryCode} ${formatted}`;
    }
    
    if (extension) {
        formatted += ` ext. ${extension}`;
    }
    
    return formatted;
}

// =======================================
// SOLUTION 2: Array/Collection Edge Cases
// =======================================

// Create a function to find the average of numbers with edge case handling:
// - Empty arrays
// - Arrays with non-numeric values
// - Arrays with null/undefined values
// - Very large numbers (overflow)
// - Very small numbers (underflow)
// - Mixed positive/negative numbers
// - Arrays with only zeros
// - Single-element arrays
// - Nested arrays or objects

function calculateAverageRobust(values, options = {}) {
    const { 
        skipInvalid = true, 
        treatNullAsZero = false,
        precision = 2,
        handleOverflow = true 
    } = options;

    // Handle null/undefined input
    if (values == null) {
        return null;
    }

    // Handle non-array input
    if (!Array.isArray(values)) {
        // Try to convert single values
        if (typeof values === 'number' && !isNaN(values) && isFinite(values)) {
            return Number(values.toFixed(precision));
        }
        return null;
    }

    // Handle empty array
    if (values.length === 0) {
        return null;
    }

    const validNumbers = [];
    
    for (let i = 0; i < values.length; i++) {
        const value = values[i];

        // Handle null/undefined values
        if (value == null) {
            if (treatNullAsZero) {
                validNumbers.push(0);
            } else if (!skipInvalid) {
                return null; // Strict mode - any null invalidates result
            }
            // skipInvalid === true: just skip null values
            continue;
        }

        // Handle nested arrays or objects
        if (typeof value === 'object') {
            if (Array.isArray(value)) {
                // Recursively handle nested arrays
                const nestedAvg = calculateAverageRobust(value, options);
                if (nestedAvg !== null) {
                    validNumbers.push(nestedAvg);
                } else if (!skipInvalid) {
                    return null;
                }
            } else if (!skipInvalid) {
                return null; // Object found in strict mode
            }
            continue;
        }

        // Convert to number
        const num = Number(value);

        // Handle invalid numbers
        if (isNaN(num) || !isFinite(num)) {
            if (!skipInvalid) {
                return null; // Invalid number in strict mode
            }
            continue; // Skip invalid in permissive mode
        }

        // Handle overflow concerns
        if (handleOverflow && Math.abs(num) > Number.MAX_SAFE_INTEGER) {
            console.warn(`Large number detected: ${num}. Precision may be lost.`);
        }

        validNumbers.push(num);
    }

    // Handle case where no valid numbers were found
    if (validNumbers.length === 0) {
        return null;
    }

    // Calculate sum with overflow protection
    let sum = 0;
    for (const num of validNumbers) {
        sum += num;
        
        // Check for overflow
        if (handleOverflow && !isFinite(sum)) {
            throw new Error('Arithmetic overflow occurred during calculation');
        }
    }

    const average = sum / validNumbers.length;

    // Handle result overflow/underflow
    if (!isFinite(average)) {
        throw new Error('Average calculation resulted in non-finite number');
    }

    // Apply precision
    return Number(average.toFixed(precision));
}

// =======================================
// SOLUTION 3: Date/Time Edge Cases
// =======================================

// Create a date formatting function with edge case handling:
// - Invalid dates
// - Edge dates (year 1900, 2100, etc.)
// - Timezone handling
// - Daylight saving time transitions
// - Leap year considerations
// - Different input formats
// - Null/undefined input

function formatDateRobust(date, format = 'YYYY-MM-DD', options = {}) {
    const { 
        timezone = 'local',
        fallback = '',
        strictValidation = false,
        handleDST = true
    } = options;

    // Handle null/undefined
    if (date == null) {
        return fallback;
    }

    let dateObj;

    // Handle different input types
    try {
        if (date instanceof Date) {
            dateObj = new Date(date.getTime()); // Clone to avoid mutations
        } else if (typeof date === 'string') {
            // Handle common string formats
            if (date.trim() === '') {
                return fallback;
            }
            
            // Try to parse ISO strings, timestamps, etc.
            dateObj = new Date(date);
        } else if (typeof date === 'number') {
            // Handle timestamps (both seconds and milliseconds)
            const timestamp = date;
            
            // Detect if timestamp is in seconds (common Unix timestamp)
            if (timestamp < 10000000000) { // Less than year 2286 in milliseconds
                dateObj = new Date(timestamp * 1000);
            } else {
                dateObj = new Date(timestamp);
            }
        } else {
            return fallback;
        }
    } catch (error) {
        return fallback;
    }

    // Validate the resulting date
    if (isNaN(dateObj.getTime())) {
        return fallback;
    }

    // Handle edge dates
    const year = dateObj.getFullYear();
    if (strictValidation) {
        if (year < 1900 || year > 2100) {
            console.warn(`Date year ${year} is outside typical range`);
            if (year < 1 || year > 9999) {
                return fallback;
            }
        }
    }

    // Handle timezone conversion
    if (timezone !== 'local') {
        try {
            if (timezone === 'UTC') {
                // Convert to UTC
                dateObj = new Date(dateObj.getTime() + (dateObj.getTimezoneOffset() * 60000));
            } else {
                // Handle specific timezone (requires Intl.DateTimeFormat or library)
                const utcTime = dateObj.getTime() + (dateObj.getTimezoneOffset() * 60000);
                const targetTime = new Date(utcTime + (getTimezoneOffset(timezone) * 60000));
                dateObj = targetTime;
            }
        } catch (timezoneError) {
            console.warn(`Timezone conversion failed: ${timezoneError.message}`);
            // Continue with original date
        }
    }

    // Handle DST transition edge cases
    if (handleDST && timezone === 'local') {
        const isDST = isDaylightSavingTime(dateObj);
        const offsetMinutes = dateObj.getTimezoneOffset();
        
        // Check if we're in a DST transition hour
        if (isDSTTransitionTime(dateObj)) {
            console.warn('Date falls during DST transition - time may be ambiguous');
        }
    }

    // Format the date
    try {
        return formatDateString(dateObj, format);
    } catch (formatError) {
        console.error(`Date formatting failed: ${formatError.message}`);
        return fallback;
    }
}

function formatDateString(date, format) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    // Replace format tokens
    return format
        .replace(/YYYY/g, year.toString())
        .replace(/YY/g, year.toString().slice(-2))
        .replace(/MM/g, month.toString().padStart(2, '0'))
        .replace(/M/g, month.toString())
        .replace(/DD/g, day.toString().padStart(2, '0'))
        .replace(/D/g, day.toString())
        .replace(/HH/g, hours.toString().padStart(2, '0'))
        .replace(/H/g, hours.toString())
        .replace(/mm/g, minutes.toString().padStart(2, '0'))
        .replace(/m/g, minutes.toString())
        .replace(/ss/g, seconds.toString().padStart(2, '0'))
        .replace(/s/g, seconds.toString());
}

function isDaylightSavingTime(date) {
    const jan = new Date(date.getFullYear(), 0, 1);
    const jul = new Date(date.getFullYear(), 6, 1);
    return date.getTimezoneOffset() < Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
}

function isDSTTransitionTime(date) {
    // Check if the date/time falls during DST transition
    const before = new Date(date.getTime() - 3600000); // 1 hour before
    const after = new Date(date.getTime() + 3600000);  // 1 hour after
    
    return (before.getTimezoneOffset() !== date.getTimezoneOffset()) ||
           (after.getTimezoneOffset() !== date.getTimezoneOffset());
}

function getTimezoneOffset(timezone) {
    // Simplified timezone offset lookup
    const offsets = {
        'PST': -8, 'PDT': -7,
        'MST': -7, 'MDT': -6,
        'CST': -6, 'CDT': -5,
        'EST': -5, 'EDT': -4,
        'GMT': 0, 'UTC': 0,
        'CET': 1, 'EET': 2
    };
    
    return (offsets[timezone.toUpperCase()] || 0) * 60; // Convert to minutes
}

// =======================================
// SOLUTION 4: String Processing Edge Cases
// =======================================

// Create a text processing function with comprehensive edge case handling:
// - Unicode characters and emojis
// - Very long strings (memory concerns)
// - HTML/XML content
// - Multiple whitespace types
// - Different line endings
// - Control characters
// - Right-to-left text
// - Null bytes and special characters

function processTextRobust(text, options = {}) {
    const {
        maxLength = 1000000, // 1MB default limit
        normalizeWhitespace = true,
        stripHTML = false,
        preserveLineBreaks = true,
        handleUnicode = true,
        removeControlChars = true,
        trimText = true
    } = options;

    // Handle null/undefined
    if (text == null) {
        return '';
    }

    // Convert to string
    let result = String(text);

    // Handle empty string
    if (result === '') {
        return '';
    }

    // Check length limits to prevent memory issues
    if (result.length > maxLength) {
        console.warn(`Text length ${result.length} exceeds maximum ${maxLength}`);
        result = result.substring(0, maxLength);
    }

    // Remove or handle control characters
    if (removeControlChars) {
        // Remove null bytes and other control characters except tabs and newlines
        result = result.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
    }

    // Handle HTML/XML content
    if (stripHTML) {
        // Basic HTML tag removal (for simple cases)
        result = result.replace(/<[^>]*>/g, '');
        
        // Decode common HTML entities
        result = result
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .replace(/&nbsp;/g, ' ');
    }

    // Normalize different types of whitespace
    if (normalizeWhitespace) {
        // Replace various Unicode whitespace characters with regular spaces
        result = result.replace(/[\s\u00A0\u1680\u2000-\u200B\u202F\u205F\u3000]/g, ' ');
        
        // Normalize line endings
        result = result.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
        
        if (!preserveLineBreaks) {
            result = result.replace(/\n/g, ' ');
        }
        
        // Collapse multiple spaces
        result = result.replace(/ {2,}/g, ' ');
    }

    // Handle Unicode normalization
    if (handleUnicode && typeof result.normalize === 'function') {
        try {
            // Normalize Unicode to NFC (Canonical Decomposition, followed by Canonical Composition)
            result = result.normalize('NFC');
        } catch (unicodeError) {
            console.warn('Unicode normalization failed:', unicodeError.message);
        }
    }

    // Handle bidirectional text (RTL/LTR)
    const hasRTLCharacters = /[\u0590-\u05FF\u0600-\u06FF\u0750-\u077F]/.test(result);
    if (hasRTLCharacters) {
        // Add RTL markers if needed
        result = '\u202B' + result + '\u202C'; // RLE (Right-to-Left Embedding) markers
    }

    // Trim whitespace
    if (trimText) {
        result = result.trim();
    }

    // Final validation
    if (result.length === 0) {
        return '';
    }

    // Check for potentially dangerous patterns
    if (result.includes('\0')) {
        console.warn('Null byte found in processed text');
        result = result.replace(/\0/g, '');
    }

    return result;
}

// =======================================
// SOLUTION 5: File/Path Edge Cases
// =======================================

// Create a file path processing function with edge case handling:
// - Different OS path separators
// - Relative vs absolute paths
// - Path traversal attacks (../)
// - Special characters in filenames
// - Very long paths
// - Reserved filenames (CON, PRN, etc.)
// - Unicode in filenames
// - Case sensitivity differences

function sanitizeFilePathRobust(filePath, options = {}) {
    const {
        maxLength = 260, // Windows MAX_PATH limit
        allowRelativePaths = false,
        preserveExtension = true,
        os = typeof process !== 'undefined' ? process.platform : 'unknown'
    } = options;

    // Handle null/undefined
    if (filePath == null) {
        return '';
    }

    let path = String(filePath);

    // Handle empty path
    if (path.trim() === '') {
        return '';
    }

    // Normalize path separators
    path = path.replace(/\\/g, '/');

    // Handle path traversal attacks
    if (path.includes('../') || path.includes('..\\')) {
        if (!allowRelativePaths) {
            console.warn('Path traversal attempt detected:', path);
            path = path.replace(/\.\.\/|\.\.\\|\.\.\//g, '');
        }
    }

    // Remove or replace dangerous characters
    const dangerousChars = /[<>:"|?*\x00-\x1f]/g;
    path = path.replace(dangerousChars, '_');

    // Handle reserved names (Windows)
    const reservedNames = /^(CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])(\.|$)/i;
    const pathParts = path.split('/');
    const fileName = pathParts[pathParts.length - 1];
    
    if (reservedNames.test(fileName)) {
        console.warn('Reserved filename detected:', fileName);
        pathParts[pathParts.length - 1] = '_' + fileName;
        path = pathParts.join('/');
    }

    // Handle very long paths
    if (path.length > maxLength) {
        console.warn(`Path length ${path.length} exceeds maximum ${maxLength}`);
        
        if (preserveExtension) {
            const lastDot = path.lastIndexOf('.');
            const extension = lastDot > 0 ? path.substring(lastDot) : '';
            const nameWithoutExt = lastDot > 0 ? path.substring(0, lastDot) : path;
            const maxNameLength = maxLength - extension.length;
            
            path = nameWithoutExt.substring(0, maxNameLength) + extension;
        } else {
            path = path.substring(0, maxLength);
        }
    }

    // Handle Unicode in filenames
    try {
        path = path.normalize('NFC');
    } catch (error) {
        console.warn('Path Unicode normalization failed:', error.message);
    }

    // Remove leading/trailing whitespace and dots
    path = path.replace(/^[\s.]+|[\s.]+$/g, '');

    // Handle empty result
    if (path === '') {
        return 'unnamed_file';
    }

    // Handle OS-specific constraints
    switch (os) {
        case 'win32':
            // Windows doesn't allow files ending with space or dot
            path = path.replace(/[\s.]+$/g, '');
            break;
        
        case 'darwin': // macOS
            // macOS has issues with certain characters
            path = path.replace(/:/g, '_');
            break;
        
        default:
            // Unix-like systems are generally more permissive
            break;
    }

    return path;
}

// ========================
// PRACTICE EXERCISES
// ========================

// Exercise 1: Identify missing edge cases in this function
function calculateDiscount(price, discountPercent) {
    return price * (discountPercent / 100);
}

// What edge cases are missing?
// - Negative prices?
// - Discount > 100%?
// - Non-numeric inputs?
// - Very large numbers?
// - Precision issues?

// YOUR TASK: List all edge cases and rewrite the function

// Exercise 2: Add edge case handling to this search function
function searchUsers(query, users) {
    return users.filter(user => 
        user.name.toLowerCase().includes(query.toLowerCase())
    );
}

// Consider edge cases like:
// - Null/undefined query or users
// - Empty arrays
// - Users without name property
// - Unicode characters
// - Very long queries
// - Special characters

// YOUR TASK: Enhance with comprehensive edge case handling

// Exercise 3: Create an edge-case-aware prompt
// Write a prompt that would generate a function to merge two objects,
// explicitly mentioning these edge cases:
// - Null/undefined objects
// - Circular references
// - Functions as values
// - Arrays vs objects
// - Nested structures
// - Property descriptor issues
// - Prototype chain considerations

// Exercise 4: URL validation edge cases
function isValidURL(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

// Missing edge cases:
// - Data URLs (data:...)
// - File URLs (file:///)
// - FTP, mailto, tel schemes
// - URLs with Unicode
// - Very long URLs
// - URLs with unusual ports
// - IPv6 addresses
// - Localhost variations

// YOUR TASK: Create a comprehensive URL validation function