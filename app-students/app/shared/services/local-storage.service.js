const localStorageService = {

    setItem: (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    },

    getItem: (key) => {
        const value = localStorage.getItem(key);
        try {
            return value ? JSON.parse(value) : null;
        } catch (error) {
            return null;
        }
    },

    removeItem: (key) => {
        localStorage.removeItem(key);
    },
};

export default localStorageService;
