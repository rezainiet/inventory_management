// apiUtils.js

import axios from "axios";

const API_BASE_URL = 'http://localhost:4000/api/v1';
// const API_BASE_URL = 'https://koel-inventory-backend.vercel.app/api/v1';
const SECRET_KEY = '78enjakzlyfqva8w5plsoo3h';
const API_KEY = 'xy5p4dgkucgaybm3qmtygyujkcbg1o2u';

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

// Product API
export const getProducts = async () => apiRequest(`${API_BASE_URL}/products`);

export const getProductById = async (productId) => apiRequest(`${API_BASE_URL}/products/${productId}`);

export const addProduct = async (productData) =>
    apiRequest(`${API_BASE_URL}/products/add`, {
        method: 'POST',
        body: JSON.stringify(productData),
    });

export const updateProduct = async (productId, productData) =>
    apiRequest(`${API_BASE_URL}/products/${productId}`, {
        method: 'PUT',
        body: JSON.stringify(productData),
    });

export const deleteProduct = async (productId) =>
    apiRequest(`${API_BASE_URL}/products/${productId}`, {
        method: 'DELETE',
    });

export const updateProductStock = async (productId, data) =>
    apiRequest(`${API_BASE_URL}/products/${productId}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });

// Supplier API
export const getSuppliers = async () => apiRequest(`${API_BASE_URL}/suppliers`);

export const addSupplier = async (supplierData) =>
    apiRequest(`${API_BASE_URL}/suppliers/add`, {
        method: 'POST',
        body: JSON.stringify(supplierData),
    });

// Order API
export const createOrder = async (orderData) => {
    const response = await fetch(`${API_BASE_URL}/orders/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
    });

    if (!response.ok) {
        throw new Error('Failed to create order');
    }

    return response.json();
};

export const getOrders = async ({ search = '', page = 1, limit = 10, startDate = '', endDate = '' }) => {
    const queryParams = new URLSearchParams({ search, page, limit, startDate, endDate });
    return apiRequest(`${API_BASE_URL}/orders?${queryParams}`);
};

export const getAllOrders = async ({ search = '', page = 1, limit = 10, startDate = '', endDate = '' }) => {
    const queryParams = new URLSearchParams({ search, page, limit, startDate, endDate });
    return apiRequest(`${API_BASE_URL}/orders/getAllOrders?${queryParams}`);
};

export const deleteOrder = async (orderId) =>
    apiRequest(`${API_BASE_URL}/orders/${orderId}`, { method: 'DELETE' });

export const updateOrderStatus = async (orderId, status) =>
    apiRequest(`${API_BASE_URL}/orders/status/${orderId}`, {
        method: 'PATCH',
        body: JSON.stringify(status),
    });

// User API
export const getUser = async (googleId) => apiRequest(`${API_BASE_URL}/users/${googleId}`);

export const createUser = async (userData) =>
    apiRequest(`${API_BASE_URL}/users`, {
        method: 'POST',
        body: JSON.stringify(userData),
    });

export const updateUser = async (googleId, userData) =>
    apiRequest(`${API_BASE_URL}/users/${googleId}`, {
        method: 'PUT',
        body: JSON.stringify(userData),
    });

// Steadfast Order API
export const createSteadfastOrder = async (orderData) => {
    const response = await axios.post('https://portal.packzy.com/api/v1/create_order', orderData, {
        headers: {
            'Api-Key': API_KEY,
            'Secret-Key': SECRET_KEY,
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};

// Sales API

// get last month sales data with profit and total sales.
export const getLastMonthSales = async () => apiRequest(`${API_BASE_URL}/sales/last-month`);

// get last seven days sales data with profit and total sales.
export const getLastSevenDaysSales = async () => apiRequest(`${API_BASE_URL}/sales/last-7-days`);

// get last seven days sales data with profit and total sales.
export const getTotalSales = async () => apiRequest(`${API_BASE_URL}/sales/total-sales`);
// get top 5 most selling products.
export const getTopSellingProducts = async () => apiRequest(`${API_BASE_URL}/sales/top-selling`);