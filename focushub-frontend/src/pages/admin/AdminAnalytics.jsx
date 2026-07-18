import { useEffect, useState } from "react";
import API from "../../api/api";

function AdminAnalytics() {

  const [data, setData] = useState(null);

  const loadAnalytics = async () => {
    try {
      const res = await API.get("/analytics/dashboard");
      setData(res.data);
    } catch {
      alert("Failed to load analytics");
    }
  };

  useEffect(() => {
    loadAnalytics();
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex justify-center items-center">
        Loading Analytics...
      </div>
    );
  }

  const card =
    "bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-700";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white p-8">

      <h1 className="text-5xl font-bold text-cyan-400 mb-10">
        FocusHub Analytics
      </h1>

      <div className="grid md:grid-cols-4 gap-6">

        <div className={card}>
          <h2 className="text-cyan-400 font-bold">Students</h2>
          <p className="text-4xl mt-3">{data.totalStudents}</p>
        </div>

        <div className={card}>
          <h2 className="text-green-400 font-bold">Teachers</h2>
          <p className="text-4xl mt-3">{data.totalTeachers}</p>
        </div>

        <div className={card}>
          <h2 className="text-blue-400 font-bold">Rooms</h2>
          <p className="text-4xl mt-3">{data.totalRooms}</p>
        </div>

        <div className={card}>
          <h2 className="text-purple-400 font-bold">Notes</h2>
          <p className="text-4xl mt-3">{data.totalNotes}</p>
        </div>

        <div className={card}>
          <h2 className="text-yellow-400 font-bold">Merit Tests</h2>
          <p className="text-4xl mt-3">{data.totalMeritTests}</p>
        </div>

        <div className={card}>
          <h2 className="text-pink-400 font-bold">Routines</h2>
          <p className="text-4xl mt-3">{data.totalRoutines}</p>
        </div>

        <div className={card}>
          <h2 className="text-green-300 font-bold">Payments</h2>
          <p className="text-4xl mt-3">{data.totalPayments}</p>
        </div>

        <div className={card}>
          <h2 className="text-orange-400 font-bold">Attendance</h2>
          <p className="text-4xl mt-3">{data.totalAttendance}</p>
        </div>

        <div className={card}>
          <h2 className="text-red-400 font-bold">Exams</h2>
          <p className="text-4xl mt-3">{data.totalExams}</p>
        </div>

        <div className={card}>
          <h2 className="text-cyan-300 font-bold">Queries</h2>
          <p className="text-4xl mt-3">{data.totalQueries}</p>
        </div>

      </div>
    </div>
  );
}

export default AdminAnalytics;