import axios from "axios";

const BASE_URL = "http://localhost:8000/api/";

const api = axios.create({
  baseURL: BASE_URL,
});

// Set the Authorization header for all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("user.token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

const MostOrdersProducts = {
  getMostOrdered: () => api.get("most_ordered_product/?num=3"),
};

export default MostOrdersProducts;
