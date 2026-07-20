/**
 * Utility functions for string validation
 */

/**
 * Validates an email address
 * @param email - The email string to validate
 * @returns boolean true if valid, false otherwise
 */
export const isValidEmail = (email: string): boolean => {
    if (!email) return false
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

/**
 * Validates a URL (http, https)
 * @param url - The URL string to validate
 * @returns boolean true if valid, false otherwise
 */
export const isValidUrl = (url: string): boolean => {
    if (!url) return false
    try {
        const parsedUrl = new URL(url)
        return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:'
    } catch (_) {
        return false
    }
}

/**
 * Validates a basic phone number (at least 7 digits, allowed characters: +, -, space, brackets)
 * @param phone - The phone string to validate
 * @returns boolean true if valid, false otherwise
 */
export const isValidPhone = (phone: string): boolean => {
    if (!phone) return false
    const phoneRegex = /^[\d\s+\-().]{7,}$/
    return phoneRegex.test(phone)
}

/**
 * Checks if a string is empty or only contains whitespace
 * @param str - The string to check
 * @returns boolean true if required check passes (is NOT empty), false otherwise
 */
export const isPresent = (str: string | null | undefined): boolean => {
    if (str === null || str === undefined) return false
    return str.trim().length > 0
}

/**
 * Checks if a string meets minimum length requirements
 * @param str - The string to check
 * @param min - Minimum length
 * @returns boolean true if valid, false otherwise
 */
export const minLength = (str: string, min: number): boolean => {
    if (!str) return false
    return str.trim().length >= min
}

/**
 * Checks if a string is within maximum length requirements
 * @param str - The string to check
 * @param max - Maximum length
 * @returns boolean true if valid, false otherwise
 */
export const maxLength = (str: string, max: number): boolean => {
    if (!str) return true
    return str.trim().length <= max
}
/**
 * Validates a Meetup group URL and removes extra queries
 * @param url - The URL string to validate
 * @returns string | null the cleaned URL if valid, null otherwise
 */
export const isValidMeetupUrl = (url: string): string | null => {
    if (!url) return null
    // Matches http/https://www.meetup.com/[group-slug]
    const meetupRegex = /^https?:\/\/(?:www\.)?meetup\.com\/([^/?#]+)/
    const match = url.match(meetupRegex)
    if (!match) {
        return null
    }

    let cleanedUrl = match[0]
    if (!cleanedUrl.endsWith('/')) {
        cleanedUrl += '/'
    }
    return cleanedUrl
}
/**
 * Validates a Facebook URL
 * @param url - The URL string to validate
 * @returns boolean true if valid, false otherwise
 */
export const isValidFacebookUrl = (url: string): boolean => {
    if (!url) return false
    return url.startsWith('https://www.facebook.com/')
}
/**
 * Validates a Discord Server ID (Snowflake ID)
 * @param id - The ID string to validate
 * @returns boolean true if valid, false otherwise
 */
export const isValidDiscordId = (id: string): boolean => {
    if (!id) return false
    const discordIdRegex = /^\d{17,19}$/
    return discordIdRegex.test(id)
}
