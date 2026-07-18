import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api/api";

function StudentRegister() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const sendOtp = async () => {
    try {
      const res = await API.post("/student/send-otp", { email });
      alert(res.data);
      setOtpSent(true);
    } catch (err) {
      alert(err.response?.data || "OTP send failed");
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await API.post("/student/verify-otp", { email, otp });
      alert(res.data);
      setOtpVerified(true);
    } catch (err) {
      alert(err.response?.data || "OTP verification failed");
    }
  };

  const registerStudent = async (e) => {
    e.preventDefault();

    if (!otpVerified) {
      alert("Please verify OTP first");
      return;
    }

    try {
      await API.post("/student/register", { name, email, password });
      alert("Registration successful");
      navigate("/student/login");
    } catch (err) {
      alert(err.response?.data || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 flex items-center justify-center px-4">
      <div className="grid md:grid-cols-2 bg-slate-900/80 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden max-w-5xl w-full">
        <div className="p-10 hidden md:flex flex-col justify-center bg-purple-600/20">
          <div className="text-7xl mb-6">📚</div>
          <h1 className="text-4xl font-extrabold text-white">Create Student Account</h1>
          <p className="text-gray-300 mt-4">
            Start your smart learning journey with FocusHub.
          </p>
        </div>

        <div className="p-10">
          <h2 className="text-3xl font-bold text-blue-400 mb-2">
            Student Register
          </h2>
          <p className="text-gray-400 mb-8">Verify email and create account</p>

          <form onSubmit={registerStudent}>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-4 mb-4 rounded-xl bg-slate-800 text-white border border-slate-700 outline-none focus:border-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <div className="flex gap-2 mb-4">
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 p-4 rounded-xl bg-slate-800 text-white border border-slate-700 outline-none focus:border-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button
                type="button"
                onClick={sendOtp}
                className="bg-yellow-500 hover:bg-yellow-600 px-5 rounded-xl font-bold"
              >
                OTP
              </button>
            </div>

            {otpSent && (
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  placeholder="Enter OTP"
                  className="flex-1 p-4 rounded-xl bg-slate-800 text-white border border-slate-700 outline-none focus:border-green-500"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />

                <button
                  type="button"
                  onClick={verifyOtp}
                  className="bg-green-500 hover:bg-green-600 px-5 rounded-xl font-bold"
                >
                  Verify
                </button>
              </div>
            )}

            {otpVerified && (
              <p className="text-green-400 mb-4">OTP verified successfully ✅</p>
            )}

            <input
              type="password"
              placeholder="Password"
              className="w-full p-4 mb-5 rounded-xl bg-slate-800 text-white border border-slate-700 outline-none focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="w-full bg-blue-500 hover:bg-blue-600 p-4 rounded-xl text-white font-bold">
              Register
            </button>
          </form>

          <button
            onClick={() => (window.location.href = "http://localhost:8080/oauth2/authorization/google")}
            className="w-full mt-4 bg-white text-slate-900 p-4 rounded-xl font-bold"
          >
            Continue with Google
          </button>

          <p className="text-gray-400 text-center mt-6">
            Already registered?{" "}
            <Link to="/student/login" className="text-blue-400 font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default StudentRegister;