const API_BASE_URL = 'http://localhost:8000';

export const apiService = {
    async fetchTransactions() {
        const response = await fetch(`${API_BASE_URL}/api/fetch`);
        return await response.json();
    },

    async addTransaction(transactionData) {
        const response = await fetch(`${API_BASE_URL}/api/insert`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(transactionData)
        });
        return await response.json();
    }
};