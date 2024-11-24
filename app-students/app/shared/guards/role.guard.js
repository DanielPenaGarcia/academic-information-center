import { router } from "../router.js";
import localStorageService from "../services/local-storage.service.js";

const roleGuard = (role) => {
    return () => {
        const token = localStorageService.getItem("token");
        if (!token) {
            router.navigate("/sign-in");
            return false;
        }
        const user = localStorageService.getItem("user");
        if (!user) {
            router.navigate("/sign-in");
            return false;
        }
        if (user.role !== role) {
            router.navigate("/sign-in");
            return false;
        }
        return true;
    }
};

export default roleGuard;