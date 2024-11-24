import { router } from "../router.js";

const authGuard = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    router.navigate("/sign-in");
    return false;
  }
  const user = localStorage.getItem("user");
  if (!user) {
    router.navigate("/sign-in");
    return false;
  }
  return true;
};

export default authGuard;
