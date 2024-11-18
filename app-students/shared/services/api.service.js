const api = {
  apiUrl: "http://localhost:3000/api/v1",

  async get({ endpoint, query }) {
    const queryString = new URLSearchParams(query).toString();
    const response = await fetch(`${this.apiUrl}/${endpoint}?${queryString}`);
    return response.json();
  },

  async post({ endpoint, body }) {
    const response = await fetch(`${this.apiUrl}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return response.json();
  },

  async put({ endpoint, body }) {
    const response = await fetch(`${this.apiUrl}/${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return response.json();
  },

  async delete({ endpoint }) {
    const response = await fetch(`${this.apiUrl}/${endpoint}`, {
      method: "DELETE",
    });
    return response.json();
  },
};

export default api;
