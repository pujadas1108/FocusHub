import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginAdmin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const res = await API.post("/admin/login", {
        email,
        password,
      });

      const token = res.data?.token || res.data;

      if (!token) {
        alert("Token not received from backend");
        return;
      }

      localStorage.setItem("adminToken", token);
      localStorage.removeItem("studentToken");
      localStorage.removeItem("teacherToken");

      alert("Admin login successful");
      navigate("/admin/dashboard");
    } catch (err) {
      alert(err.response?.data || err.message || "Admin login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-red-950 to-slate-900 flex items-center justify-center px-4">
      <div className="grid md:grid-cols-2 bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden max-w-5xl w-full">
        <div className="p-10 hidden md:flex flex-col justify-center bg-red-600/20">
          <div className="text-7xl mb-6">👨‍💼</div>
          <h1 className="text-4xl font-extrabold text-white">
            Admin Control
          </h1>
          <p className="text-gray-300 mt-4">
            Manage teachers, students, study rooms and platform analytics.
          </p>
        </div>

        <div className="p-10">
          <h2 className="text-3xl font-bold text-red-400 mb-2">
            Admin Login
          </h2>
          <p className="text-gray-400 mb-8">
            Secure access for platform management
          </p>

          <form onSubmit={loginAdmin}>
            <input
              type="email"
              placeholder="Admin Email"
              className="w-full p-4 mb-4 rounded-xl bg-slate-800 text-white border border-slate-700 outline-none focus:border-red-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-4 mb-5 rounded-xl bg-slate-800 text-white border border-slate-700 outline-none focus:border-red-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 p-4 rounded-xl text-white font-bold"
            >
              Login as Admin
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;