import { useEffect, useState } from "react";
import API from "../../api/api";

function AdminAttendance() {
  const [attendance, setAttendance] = useState([]);

  const loadAttendance = async () => {
    try {
      const res = await API.get("/attendance/all");
      setAttendance(res.data);
    } catch {
      alert("Failed to load attendance");
    }
  };

  useEffect(() => {
    loadAttendance();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-5xl font-bold text-blue-400 mb-8">
        Attendance Reports
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {attendance.map((a) => (
          <div
            key={a.attendanceId}
            className="bg-slate-800 p-6 rounded-2xl"
          >
            <h2 className="text-xl font-bold text-green-400">
              {a.studentName}
            </h2>

            <p>Student ID: {a.studentId}</p>
            <p>Teacher ID: {a.teacherId}</p>
            <p>Room ID: {a.roomId}</p>
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
              Marked By: {a.markedBy}
            </p>

            <p className="text-gray-400 text-sm">
              Face Verified: {a.faceVerified ? "Yes" : "No"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminAttendance;