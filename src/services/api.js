const API_URL = 'http://localhost:3000/expenses';

export const api = {
    fetchExpenses: async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Failed to fetch expenses');
            return await response.json();
        } catch (error) {
            console.error('Error fetching expenses:', error);
            throw error;
        }
    },

    createExpense: async (expense) => {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(expense),
            });
            if (!response.ok) throw new Error('Failed to create expense');
            return await response.json();
        } catch (error) {
            console.error('Error creating expense:', error);
            throw error;
        }
    },

    deleteExpense: async (id) => {
        try {
            console.log(`Deleting expense with ID: ${id}`);
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to delete: ${response.status} ${response.statusText} - ${errorText}`);
            }
            return true;
        } catch (error) {
            console.error('Error deleting expense:', error);
            throw error;
        }
    },

    // Category APIs
    fetchCategories: async () => {
        try {
            const response = await fetch('http://localhost:3000/categories');
            if (!response.ok) throw new Error('Failed to fetch categories');
            return await response.json();
        } catch (error) {
            console.error('Error fetching categories:', error);
            return []; // Return empty array on error to prevent crash
        }
    },

    createCategory: async (name) => {
        const response = await fetch('http://localhost:3000/categories', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name }),
        });
        return await response.json();
    },

    deleteCategory: async (id) => {
        await fetch(`http://localhost:3000/categories/${id}`, {
            method: 'DELETE',
        });
        return true;
    }
};
