import api from "./api.service.js";
import localStorageService from "./local-storage.service.js";

const authService = {
    login: ({academicId, password}) => {
        return api.post({
            endpoint: "auth/login",
            body: {academicId, password},
        });
    },

    logout: () => {
        localStorageService.removeItem("token");
        localStorageService.removeItem("user");
    },

    getUser: () => {
        return localStorageService.getItem("user");
    },

    refreshToken: () => {
        return api.post({
            endpoint: "auth/refresh",
        });
    },
};

export default authService;