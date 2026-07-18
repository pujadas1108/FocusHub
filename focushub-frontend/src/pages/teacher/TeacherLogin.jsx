import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";

function TeacherLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginTeacher = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const res = await API.post("/teacher/login", {
        email,
        password,
      });

      const token = res.data?.token || res.data;

      if (!token) {
        alert("Token not received from backend");
        return;
      }

      localStorage.setItem("teacherToken", token);
      localStorage.removeItem("studentToken");
      localStorage.removeItem("adminToken");

      alert("Teacher login successful");
      navigate("/teacher/dashboard");
    } catch (err) {
      alert(err.response?.data || err.message || "Teacher login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-green-950 to-slate-900 flex items-center justify-center px-4">
      <div className="grid md:grid-cols-2 bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden max-w-5xl w-full">
        <div className="p-10 hidden md:flex flex-col justify-center bg-green-600/20">
          <div className="text-7xl mb-6">👨‍🏫</div>
          <h1 className="text-4xl font-extrabold text-white">
            Teacher Portal
          </h1>
          <p className="text-gray-300 mt-4">
            Create study rooms, upload notes, start sessions and guide students.
          </p>
        </div>

        <div className="p-10">
          <h2 className="text-3xl font-bold text-green-400 mb-2">
            Teacher Login
          </h2>
          <p className="text-gray-400 mb-8">
            Teacher account is created by admin only
          </p>

          <form onSubmit={loginTeacher}>
            <input
              type="email"
              placeholder="Teacher Email"
              className="w-full p-4 mb-4 rounded-xl bg-slate-800 text-white border border-slate-700 outline-none focus:border-green-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-4 mb-5 rounded-xl bg-slate-800 text-white border border-slate-700 outline-none focus:border-green-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 p-4 rounded-xl text-white font-bold"
            >
              Login as Teacher
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TeacherLogin;