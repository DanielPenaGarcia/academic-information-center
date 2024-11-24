import localStorageService from "./local-storage.service.js"; // Suponiendo que tienes un servicio para manejar el localStorage

const api = {
  apiUrl: "http://localhost:3000/api/v1",

  getAuthHeader() {
    const token = localStorageService.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  },

  async get({ endpoint, query }) {
    const queryString = new URLSearchParams(query).toString();
    const headers = this.getAuthHeader();

    const response = await fetch(`${this.apiUrl}/${endpoint}?${queryString}`, {
      method: "GET",
      headers: headers,
    });
    const status = response.status;
    const data = await response.json();
    return { status, data };
  },

  async post({ endpoint, body }) {
    const headers = {
      "Content-Type": "application/json",
      ...this.getAuthHeader(),
    };
    const response = await fetch(`${this.apiUrl}/${endpoint}`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
    });
    const status = response.status;
    const data = await response.json();
    return { status, data };
  },

  async put({ endpoint, body }) {
    const headers = {
      "Content-Type": "application/json",
      ...this.getAuthHeader(),
    };

    const response = await fetch(`${this.apiUrl}/${endpoint}`, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(body),
    });
    const status = response.status;
    const data = await response.json();
    return { status, data };
  },
  async patch({ endpoint, body }) {
    const headers = {
      "Content-Type": "application/json",
      ...this.getAuthHeader(),
    };

    const response = await fetch(`${this.apiUrl}/${endpoint}`, {
      method: "PATCH",
      headers: headers,
      body: JSON.stringify(body),
    });
    const status = response.status;
    const data = await response.json();
    return { status, ...data };
  },

  async delete({ endpoint }) {
    const headers = this.getAuthHeader();

    const response = await fetch(`${this.apiUrl}/${endpoint}`, {
      method: "DELETE",
      headers: headers,
    });
    const status = response.status;
    const data = await response.json();
    return { status, data };
  },
};

export default api;
