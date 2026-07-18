import { useState } from "react";
import API from "../../api/api";
import { useNavigate } from "react-router-dom";

function AdminCreateTeacher() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [experience, setExperience] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/teacher/create", {
        name,
        email,
        password,
        specialization,
        experience: parseInt(experience),
      });

      alert("Teacher created successfully");
      navigate("/admin/dashboard");
    } catch (err) {
  console.log("FULL ERROR:", err);
  console.log("STATUS:", err.response?.status);
  console.log("DATA:", err.response?.data);

  alert(
    "Status: " +
      err.response?.status +
      "\nError: " +
      (err.response?.data || "Teacher creation failed")
  );
}
  };

  return (
    <div className="min-h-screen bg-slate-900 flex justify-center items-center px-4">
      <div className="bg-slate-800 p-8 rounded-xl w-full max-w-md shadow-lg">
        <h2 className="text-3xl text-white font-bold text-center mb-6">
          Create Teacher
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 mb-4 rounded bg-slate-700 text-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-4 rounded bg-slate-700 text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-4 rounded bg-slate-700 text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="text"
            placeholder="Specialization"
            className="w-full p-3 mb-4 rounded bg-slate-700 text-white"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
          />

          <input
            type="number"
            placeholder="Experience (years)"
            className="w-full p-3 mb-4 rounded bg-slate-700 text-white"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white p-3 rounded font-semibold"
          >
            Create Teacher
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminCreateTeacher;