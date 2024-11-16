const API_URL = "http://localhost:3000/api/v1";

document.addEventListener("DOMContentLoaded", function () {
  async function login({ email, password }) {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ academicId: email, password }),
      });
      if (!response.ok) {
        throw new Error("Error en la autenticación");
      }
      const data = await response.json();
      console.log("Login exitoso:", data);
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
