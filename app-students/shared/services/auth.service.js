import api from "./api.service.js";

const authService = {
    login: ({academicId, password}) => {
        return api.post({
            endpoint: "auth/login",
            body: {academicId, password},
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