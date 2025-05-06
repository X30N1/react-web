const API_BASE_URL = 'http://localhost:8000';

export const apiService = {
    async register(userData) {
        const response = await fetch(`${API_BASE_URL}/api/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Registration failed');
        }
        return await response.json();
    },

    async fetchTransactions() {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/api/fetch`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return await response.json();
    },

    async addTransaction(transactionData) {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/api/insert`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(transactionData)
        });
        return await response.json();
    }
};