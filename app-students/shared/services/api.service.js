const api = {
  apiUrl: "http://localhost:3000/api/v1",
  token: localStorage.getItem("token"),

  headers: {
    "Content-Type": "application/json",
    Authorization: token? `Bearer ${token}` : "",
  },

  async get({ endpoint, query }) {
    const queryString = new URLSearchParams(query).toString();
    const response = await fetch(`${this.apiUrl}/${endpoint}?${queryString}`);
    return response.json();
  },

  async post({ endpoint, body }) {
    const response = await fetch(`${this.apiUrl}/${endpoint}`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
    return response.json();
  },

  async put({ endpoint, body }) {
    const response = await fetch(`${this.apiUrl}/${endpoint}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(body),
    });
    return response.json();
  },

  async delete({ endpoint }) {
    const response = await fetch(`${this.apiUrl}/${endpoint}`, {
      method: "DELETE",
      headers,
    });
    return response.json();
  },
};

export default api;
