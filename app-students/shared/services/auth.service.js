import api from "./api.service.js";

const authService = {
    login: (user, password) => {
        return api.post({
            endpoint: "auth/login",
            body: { user, password },
        });
    },

    logout: () => {
        return api.post({
            endpoint: "auth/logout",
        });
    },

    getUser: () => {
        return api.get({
            endpoint: "auth/user",
        });
    },

    refreshToken: () => {
        return api.post({
            endpoint: "auth/refresh",
        });
    },
};

export default authService;