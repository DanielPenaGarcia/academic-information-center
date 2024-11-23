import authService from "../../../../shared/services/auth.service.js";
import localStorageService from "../../../../shared/services/local-storage.service.js";

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");

  async function login({ user, password }) {
    try {
      const response = await authService.login({ academicId: user, password });
      localStorageService.setItem("token", response.data.token);
      localStorageService.setItem("user", response.data.user);
    } catch (error) {
      console.error("Hubo un problema con el login:", error);
      alert("Login fallido. Verifica tus credenciales.");
    }
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
