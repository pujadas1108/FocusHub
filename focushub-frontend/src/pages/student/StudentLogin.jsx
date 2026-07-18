import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api/api";

function StudentLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginStudent = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const res = await API.post("/student/login", {
        email,
        password,
      });

      localStorage.setItem("studentToken", res.data.token);
      localStorage.setItem("studentId", res.data.studentId);
      localStorage.setItem("studentName", res.data.name);
      localStorage.setItem("studentEmail", res.data.email);

      localStorage.removeItem("teacherToken");
      localStorage.removeItem("adminToken");

      const meritRes = await API.get(
        `/merit/student/${res.data.studentId}`
      );

      if (meritRes.data.length === 0) {
        navigate("/student/merit-test");
      } else {
        navigate("/student/dashboard");
      }
    } catch (err) {
      alert(err.response?.data || err.message || "Student login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center px-4">
      <div className="grid md:grid-cols-2 bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden max-w-5xl w-full">
        <div className="p-10 hidden md:flex flex-col justify-center bg-blue-600/20">
          <div className="text-7xl mb-6">🎓</div>
          <h1 className="text-4xl font-extrabold text-white">
            Welcome Back Student
          </h1>
          <p className="text-gray-300 mt-4">
            Login, complete your merit test, then start learning.
          </p>
        </div>

        <div className="p-10">
          <h2 className="text-3xl font-bold text-blue-400 mb-2">
            Student Login
          </h2>

          <p className="text-gray-400 mb-8">
            Login to continue learning
          </p>

          <form onSubmit={loginStudent}>
            <input
              type="email"
              placeholder="Email address"
              className="w-full p-4 mb-4 rounded-xl bg-slate-800 text-white border border-slate-700 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-4 mb-5 rounded-xl bg-slate-800 text-white border border-slate-700 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 p-4 rounded-xl text-white font-bold"
            >
              Login
            </button>
          </form>

          <p className="text-gray-400 text-center mt-6">
            New student?{" "}
            <Link
              to="/student/register"
              className="text-blue-400 font-semibold"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default StudentLogin;