import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";

function StudentAttendance() {
  const navigate = useNavigate();

  const studentId = localStorage.getItem("studentId");

  const [attendance, setAttendance] = useState([]);

  const loadAttendance = async () => {
    try {
      const res = await API.get(`/attendance/student/${studentId}`);
      setAttendance(res.data);
    } catch (err) {
      alert("Failed to load attendance");
    }
  };

  useEffect(() => {
    loadAttendance();
  }, []);

  const total = attendance.length;
  const present = attendance.filter((a) => a.status === "PRESENT").length;
  const percentage =
    total === 0 ? 0 : Math.round((present / total) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-5xl font-bold text-blue-400">
            My Attendance
          </h1>
          <p className="text-gray-300 mt-2">
            Track your class attendance records
          </p>
        </div>

        <button
          onClick={() => navigate("/student/dashboard")}
          className="bg-slate-700 hover:bg-slate-600 px-5 py-3 rounded-xl"
        >
          Back
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-800 p-6 rounded-2xl">
          <h2 className="text-xl text-blue-400 font-bold">
            Total Classes
          </h2>
          <p className="text-4xl font-bold mt-3">{total}</p>
        </div>

        <div className="bg-slate-800 p-6 rounded-2xl">
          <h2 className="text-xl text-green-400 font-bold">
            Present
          </h2>
          <p className="text-4xl font-bold mt-3">{present}</p>
        </div>

        <div className="bg-slate-800 p-6 rounded-2xl">
          <h2 className="text-xl text-yellow-400 font-bold">
            Attendance %
          </h2>
          <p className="text-4xl font-bold mt-3">{percentage}%</p>
        </div>
      </div>

      {attendance.length === 0 ? (
        <div className="bg-slate-800 p-6 rounded-2xl">
          <p className="text-gray-400">No attendance records found.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {attendance.map((a) => (
            <div
              key={a.attendanceId}
              className="bg-slate-800 p-6 rounded-2xl border border-slate-700"
            >
              <h2 className="text-xl font-bold text-blue-400">
                Room ID: {a.roomId}
              </h2>

              <p className="text-gray-300 mt-2">
                Teacher ID: {a.teacherId}
              </p>

              <p>Date: {a.attendanceDate}</p>

              <p className="mt-2">
                Status:{" "}
                <span
                  className={
                    a.status === "PRESENT"
                      ? "text-green-400"
                      : "text-red-400"
                  }
                >
                  {a.status}
                </span>
              </p>

              <p className="text-gray-400 text-sm mt-2">
                Face Verified: {a.faceVerified ? "Yes" : "No"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default StudentAttendance;