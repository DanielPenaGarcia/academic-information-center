const API_URL = "http://localhost:3001/api";

document.addEventListener("DOMContentLoaded", function () {
  async function login({ email, password }) {
    try {
      const response = await fetch(`${API_URL}/auth/login/student`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error("Error en la autenticación");
      }
      const data = await response.json();
      console.log("Login exitoso:", data);
      const user = await getUser();
      console.log("Usuario:", user);
    } catch (error) {
      console.error("Hubo un problema con el login:", error);
    }
  }

  async function getUser() {
    try {
      const response = await fetch(`${API_URL}/auth/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      return await response.json();
    } catch (error) {
      console.error("Hubo un problema con el login:", error);
    }
  }

  async function onClickLogin(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    await login({ email, password });
  }
  const loginBtn = document.getElementById("loginBtn");
  loginBtn.addEventListener("click", onClickLogin);
});
