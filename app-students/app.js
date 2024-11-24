import { router } from "./app/shared/router.js";
import localStorageService from "./app/shared/services/local-storage.service.js";

const loadPage = () => {
  const token = localStorageService.getItem("token");
  if (!token) {
    router.navigate("/sign-in");
    return;
  }
  const user = localStorageService.getItem("user");
  if (!user) {
    router.navigate("/sign-in");
    return;
  }
  switch (user.role) {
    case "ADMIN":
      router.navigate("/admin");
      break;
    case "STUDENT":
      router.navigate("/student");
      break;
    case "TEACHER":
      router.navigate("/teacher");
      break;
    default:
      router.navigate("/sign-in");
  }
};

loadPage();
