const API_BASE =
  process.env.NODE_ENV === "production"
    ? "https://homework4webdev.onrender.com"
    : "http://localhost:5050";

export default API_BASE;
