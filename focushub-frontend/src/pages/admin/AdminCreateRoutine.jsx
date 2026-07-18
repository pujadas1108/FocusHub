import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";

function AdminCreateRoutine() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    subject: "",
    dayName: "",
    startTime: "",
    endTime: "",
    teacherId: "",
    targetLevel: "ALL",
    description: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const createRoutine = async (e) => {
    e.preventDefault();

    if (
      !form.title ||
      !form.subject ||
      !form.dayName ||
      !form.startTime ||
      !form.endTime ||
      !form.teacherId
    ) {
      alert("Please fill required fields");
      return;
    }

    try {
      await API.post("/routines/create", {
        ...form,
        teacherId: Number(form.teacherId),
      });

      alert("Routine created successfully");
      navigate("/admin/routines");
    } catch (err) {
      alert(err.response?.data || "Routine creation failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-red-950 text-white flex justify-center items-center p-8">
      <div className="bg-slate-800/90 p-8 rounded-2xl w-full max-w-2xl border border-slate-700 shadow-xl">
        <h1 className="text-4xl font-bold text-red-400 mb-2">
          Create Routine
        </h1>

        <p className="text-gray-400 mb-6">
          Admin can create class routine based on teacher and merit level.
        </p>

        <form onSubmit={createRoutine} className="grid md:grid-cols-2 gap-4">
          <input
            name="title"
            placeholder="Class Title"
            className="p-4 rounded-xl bg-slate-700 outline-none"
            value={form.title}
            onChange={handleChange}
          />

          <input
            name="subject"
            placeholder="Subject"
            className="p-4 rounded-xl bg-slate-700 outline-none"
            value={form.subject}
            onChange={handleChange}
          />

          <select
            name="dayName"
            className="p-4 rounded-xl bg-slate-700 outline-none"
            value={form.dayName}
            onChange={handleChange}
          >
            <option value="">Select Day</option>
            <option>Monday</option>
            <option>Tuesday</option>
            <option>Wednesday</option>
            <option>Thursday</option>
            <option>Friday</option>
            <option>Saturday</option>
            <option>Sunday</option>
          </select>

          <input
            name="teacherId"
            type="number"
            placeholder="Teacher ID"
            className="p-4 rounded-xl bg-slate-700 outline-none"
            value={form.teacherId}
            onChange={handleChange}
          />

          <input
            name="startTime"
            type="time"
            className="p-4 rounded-xl bg-slate-700 outline-none"
            value={form.startTime}
            onChange={handleChange}
          />

          <input
            name="endTime"
            type="time"
            className="p-4 rounded-xl bg-slate-700 outline-none"
            value={form.endTime}
            onChange={handleChange}
          />

          <select
            name="targetLevel"
            className="p-4 rounded-xl bg-slate-700 outline-none"
            value={form.targetLevel}
            onChange={handleChange}
          >
            <option value="ALL">ALL Students</option>
            <option value="LOW">LOW - Beginner</option>
            <option value="MIDDLE">MIDDLE - Intermediate</option>
            <option value="HIGH">HIGH - Advanced</option>
          </select>

          <textarea
            name="description"
            placeholder="Description"
            className="p-4 rounded-xl bg-slate-700 outline-none md:col-span-2"
            value={form.description}
            onChange={handleChange}
          />

          <button className="md:col-span-2 bg-red-500 hover:bg-red-600 p-4 rounded-xl font-bold">
            Create Routine
          </button>
        </form>

        <button
          onClick={() => navigate("/admin/dashboard")}
          className="w-full mt-4 bg-slate-700 hover:bg-slate-600 p-3 rounded-xl"
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default AdminCreateRoutine;