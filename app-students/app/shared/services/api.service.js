import localStorageService from "./local-storage.service.js";

const api = {
  apiUrl: `http://localhost:3000/api/v1`,

  getAuthHeader(contentType = "application/json") {
    const token = localStorageService.getItem("token");
    const headers = {
      "Content-Type": contentType,
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    return headers;
  },
  
  async get({ endpoint, query, contentType = "application/json" }) {
    const queryString = new URLSearchParams(query).toString();
    const headers = this.getAuthHeader(contentType);  
    debugger;
    const response = await fetch(`${this.apiUrl}/${endpoint}?${queryString}`, {
      method: "GET",
      headers: headers,
    });
    const status = response.status;
    const data = await response.json();
    return { status, data };
  },

  async getBlob({ endpoint, query }) {
    const queryString = new URLSearchParams(query).toString();
    const headers = this.getAuthHeader("application/pdf");
    const response = await fetch(`${this.apiUrl}/${endpoint}?${queryString}`, {
      method: "GET",
      headers: headers,
    });
    if (!response.ok) {
      throw new Error(`Error fetching the PDF: ${response.status}`);
    }
    const status = response.status;
    const blob = await response.blob();
    return { status, blob };
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
    debugger;
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
