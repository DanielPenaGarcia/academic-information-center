import authService from "../../../../shared/services/auth.service.js";
import localStorageService from "../../../../shared/services/local-storage.service.js";
import { router } from "../../../../shared/router.js";

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");

  async function login({ user, password }) {
    const response = await authService.login({ academicId: user, password });
    if (response.status !== 200) {
      alert("Login fallido. Verifica tus credenciales.");
      debugger;
    }
    localStorageService.setItem("token", response.data.token);
    localStorageService.setItem("user", response.data.user);
    redirectByUser(response.data.user);
  }

  async function onSubmitLogin(event) {
    event.preventDefault();
    const user = document.getElementById("user").value;
    const password = document.getElementById("password").value;
    if (!user || !password) {
      alert("Por favor llena todos los campos.");
      return;
    }
    await login({ user, password });
  }
  loginForm.addEventListener("submit", onSubmitLogin);
});

function redirectByUser(user) {
  if (user.role === "ADMIN") {
    router.navigate("/admin");
  } else if (user.role === "STUDENT") {
    router.navigate("/student");
  } else if (user.role === "TEACHER") {
    router.navigate("/teacher");
  }
}
