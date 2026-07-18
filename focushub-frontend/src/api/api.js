import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

const publicUrls = [
  "/student/send-otp",
  "/student/verify-otp",
  "/student/register",
  "/student/login",
  "/teacher/login",
  "/admin/login",
];

API.interceptors.request.use((config) => {
  const isPublic = publicUrls.some((url) =>
    config.url?.includes(url)
  );

  if (!isPublic) {
    const adminToken = localStorage.getItem("adminToken");
    const teacherToken = localStorage.getItem("teacherToken");
    const studentToken = localStorage.getItem("studentToken");

    const token = adminToken || teacherToken || studentToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export default API;