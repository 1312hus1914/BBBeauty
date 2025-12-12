// src/api/client.js

const BASE_URL = process.env.REACT_APP_API_URL;


const getToken = () => localStorage.getItem("bb_token");

async function request(path, options = {}) {
  const url = BASE_URL + path;

  const headers = options.headers ? { ...options.headers } : {};

  // Ако body-то е FormData, НЕ слагаме Content-Type (браузърът сам го наглася)
  const isFormData = options.body instanceof FormData;
  if (!isFormData) {
    headers["Content-Type"] = headers["Content-Type"] || "application/json";
  }

  const token = getToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    ...options,
    headers,
  });

  let data = null;
  try {
    data = await res.json();
  } catch (e) {
    data = null;
  }

  if (!res.ok) {
    const err = new Error(data?.message || "Грешка при заявката.");
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}

const api = {
  get(path) {
    return request(path);
  },
  post(path, body) {
    return request(path, {
      method: "POST",
      body: JSON.stringify(body),
    });
  },
  postForm(path, formData) {
    return request(path, {
      method: "POST",
      body: formData,
    });

  },
  put(path, body) {
    return request(path, {
      method: "PUT",
      body: JSON.stringify(body),
    });
  },

  patch(path, body) {
    return request(path, {
      method: "PATCH",
      body: JSON.stringify(body ?? {}),
    });
  },


  delete(path) {
    return request(path, {
      method: "DELETE",
    });
  },

};

export default api;
