const API_BASE_URL = import.meta.env.VITE_API_URL;

export async function getUsers() {
  const res = await fetch(`${API_BASE_URL}/users/`);
  return res.json();
}
