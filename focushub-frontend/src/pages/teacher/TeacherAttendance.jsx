import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";

function TeacherAttendance() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    studentId: "",
    studentName: "",
    teacherId: "1",
    roomId: "",
    status: "PRESENT",
  });

  const markAttendance = async (e) => {
    e.preventDefault();

    if (!form.studentId || !form.studentName || !form.roomId) {
      alert("Please fill student and room details");
      return;
    }

    try {
      await API.post("/attendance/mark", {
        studentId: Number(form.studentId),
        studentName: form.studentName,
        teacherId: Number(form.teacherId),
        roomId: Number(form.roomId),
        status: form.status,
        markedBy: "TEACHER",
        faceVerified: false,
        confidenceScore: 0,
      });

      alert("Attendance marked successfully");

      setForm({
        studentId: "",
        studentName: "",
        teacherId: "1",
        roomId: "",
        status: "PRESENT",
      });
    } catch (err) {
      alert(err.response?.data || "Attendance failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-green-950 text-white flex justify-center items-center p-8">
      <div className="bg-slate-800/90 p-8 rounded-2xl w-full max-w-xl border border-slate-700 shadow-xl">
        <h1 className="text-4xl font-bold text-green-400 mb-2">
          Mark Attendance
        </h1>

        <p className="text-gray-400 mb-6">
          Teacher can mark student attendance for study rooms.
        </p>

        <form onSubmit={markAttendance} className="space-y-4">
          <input
            type="number"
            placeholder="Student ID"
            className="w-full p-4 rounded-xl bg-slate-700 outline-none"
            value={form.studentId}
            onChange={(e) =>
              setForm({ ...form, studentId: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Student Name"
            className="w-full p-4 rounded-xl bg-slate-700 outline-none"
            value={form.studentName}
            onChange={(e) =>
              setForm({ ...form, studentName: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Room ID"
            className="w-full p-4 rounded-xl bg-slate-700 outline-none"
            value={form.roomId}
            onChange={(e) =>
              setForm({ ...form, roomId: e.target.value })
            }
          />

          <select
            className="w-full p-4 rounded-xl bg-slate-700 outline-none"
            value={form.status}
            onChange={(e) =>
              setForm({ ...form, status: e.target.value })
            }
          >
            <option value="PRESENT">PRESENT</option>
            <option value="ABSENT">ABSENT</option>
          </select>

          <button className="w-full bg-green-500 hover:bg-green-600 p-4 rounded-xl font-bold">
            Mark Attendance
          </button>
        </form>

        <button
          onClick={() => navigate("/teacher/dashboard")}
          className="w-full mt-4 bg-slate-700 hover:bg-slate-600 p-3 rounded-xl"
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default TeacherAttendance;