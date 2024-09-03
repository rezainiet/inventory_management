// apiUtils.js

const API_BASE_URL = 'https://api.example.com'; // Replace with your actual API base URL

/**
 * Utility function to handle API requests.
 * @param {string} url - The URL endpoint to fetch.
 * @param {object} options - The options for the fetch request (method, headers, body, etc.).
 * @returns {Promise<object>} - The response data as a JSON object.
 */
async function apiRequest(url, options = {}) {
    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Something went wrong');
        }

        return await response.json();
    } catch (error) {
        console.error('API request failed:', error);
        throw error;
    }
}

/**
 * Get a list of products from the inventory.
 * @returns {Promise<object[]>} - The list of products.
 */
export async function getProducts() {
    return apiRequest(`${API_BASE_URL}/products`);
}

/**
 * Get details of a single product by ID.
 * @param {string} productId - The ID of the product.
 * @returns {Promise<object>} - The product details.
 */
export async function getProductById(productId) {
    return apiRequest(`${API_BASE_URL}/products/${productId}`);
}

/**
 * Add a new product to the inventory.
 * @param {object} productData - The product data to be added.
 * @returns {Promise<object>} - The added product.
 */
export async function addProduct(productData) {
    return apiRequest(`${API_BASE_URL}/products`, {
        method: 'POST',
        body: JSON.stringify(productData),
    });
}

/**
 * Update an existing product in the inventory.
 * @param {string} productId - The ID of the product to be updated.
 * @param {object} productData - The updated product data.
 * @returns {Promise<object>} - The updated product.
 */
export async function updateProduct(productId, productData) {
    return apiRequest(`${API_BASE_URL}/products/${productId}`, {
        method: 'PUT',
        body: JSON.stringify(productData),
    });
}

/**
 * Delete a product from the inventory.
 * @param {string} productId - The ID of the product to be deleted.
 * @returns {Promise<void>} - A promise indicating the deletion has been completed.
 */
export async function deleteProduct(productId) {
    return apiRequest(`${API_BASE_URL}/products/${productId}`, {
        method: 'DELETE',
    });
}
