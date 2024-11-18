import authService from "../../../../shared/services/auth.service.js";
import localStorageService from "../../../../shared/services/local-storage.service.js";

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");

  async function login({ email, password }) {
    try {
      const response = await authService.login({
        endpoint: "auth/login",
        body: { academicId: email, password },
      });
      localStorageService.setItem("token", response.token);
      localStorageService.setItem("user", response.user);
    } catch (error) {
      console.error("Hubo un problema con el login:", error);
      alert("Login fallido. Verifica tus credenciales.");
    }
  }

  async function onSubmitLogin(event) {
    event.preventDefault(); // Evita el recargo del formulario
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
      alert("Por favor llena todos los campos.");
      return;
    }

    await login({ email, password });
  }

  loginForm.addEventListener("submit", onSubmitLogin);
});
