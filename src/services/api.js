const STORAGE_KEY_EXPENSES = 'expense_app_expenses';
const STORAGE_KEY_CATEGORIES = 'expense_app_categories';

// Default Categories
const DEFAULT_CATEGORIES = [
    { id: '1', name: 'Food' },
    { id: '2', name: 'Transport' },
    { id: '3', name: 'Utilities' },
    { id: '4', name: 'Shopping' },
    { id: '5', name: 'Entertainment' },
    { id: '6', name: 'Health' },
    { id: '7', name: 'Other' },
];

// Helper to get data
const getLocalStorage = (key, defaultVal = []) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultVal;
};

// Helper to set data
const setLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

export const api = {
    // EXPENSES
    fetchExpenses: async () => {
        // Simulate async delay for realism
        return new Promise((resolve) => {
            setTimeout(() => {
                const expenses = getLocalStorage(STORAGE_KEY_EXPENSES);
                resolve(expenses);
            }, 300);
        });
    },

    createExpense: async (expense) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const expenses = getLocalStorage(STORAGE_KEY_EXPENSES);
                const newExpense = { ...expense, id: Date.now().toString() };
                expenses.push(newExpense);
                setLocalStorage(STORAGE_KEY_EXPENSES, expenses);
                resolve(newExpense);
            }, 300);
        });
    },

    deleteExpense: async (id) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const expenses = getLocalStorage(STORAGE_KEY_EXPENSES);
                const filtered = expenses.filter(e => e.id !== id);
                setLocalStorage(STORAGE_KEY_EXPENSES, filtered);
                resolve(true);
            }, 300);
        });
    },

    // CATEGORIES
    fetchCategories: async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                let categories = getLocalStorage(STORAGE_KEY_CATEGORIES, null);
                // Initialize defaults if empty
                if (!categories) {
                    categories = DEFAULT_CATEGORIES;
                    setLocalStorage(STORAGE_KEY_CATEGORIES, categories);
                }
                resolve(categories);
            }, 300);
        });
    },

    createCategory: async (name) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const categories = getLocalStorage(STORAGE_KEY_CATEGORIES, DEFAULT_CATEGORIES);
                const newCategory = { id: Date.now().toString(), name };
                categories.push(newCategory);
                setLocalStorage(STORAGE_KEY_CATEGORIES, categories);
                resolve(newCategory);
            }, 300);
        });
    },

    deleteCategory: async (id) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const categories = getLocalStorage(STORAGE_KEY_CATEGORIES, DEFAULT_CATEGORIES);
                const filtered = categories.filter(c => c.id !== id);
                setLocalStorage(STORAGE_KEY_CATEGORIES, filtered);
                resolve(true);
            }, 300);
        });
    }
};
