import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";

function StudentPerformance() {
  const navigate = useNavigate();

  const [performance, setPerformance] = useState(null);

  const loadPerformance = async () => {
    try {
      const studentId = localStorage.getItem("studentId");

      if (!studentId) {
        navigate("/student/login");
        return;
      }

      const res = await API.get(`/performance/student/${studentId}`);
      setPerformance(res.data);
    } catch (err) {
      alert(err.response?.data || "Failed to load performance");
    }
  };

  useEffect(() => {
    loadPerformance();
  }, []);

  if (!performance) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex justify-center items-center">
        Loading AI Performance...
      </div>
    );
  }

  const riskColor =
    performance.riskLevel === "LOW"
      ? "text-green-400 border-green-500"
      : performance.riskLevel === "MEDIUM"
      ? "text-yellow-400 border-yellow-500"
      : "text-red-400 border-red-500";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 text-white p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-5xl font-extrabold text-cyan-400">
            AI Performance Dashboard
          </h1>

          <p className="text-gray-300 mt-2">
            Academic risk prediction based on attendance, exams and productivity
          </p>
        </div>

        <button
          onClick={() => navigate("/student/dashboard")}
          className="bg-slate-700 hover:bg-slate-600 px-5 py-3 rounded-xl"
        >
          Back
        </button>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
          <h2 className="text-blue-400 font-bold text-xl">Attendance</h2>
          <p className="text-4xl font-bold mt-3">
            {performance.attendancePercentage.toFixed(1)}%
          </p>
        </div>

        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
          <h2 className="text-orange-400 font-bold text-xl">Exam Score</h2>
          <p className="text-4xl font-bold mt-3">
            {performance.averageExamScore.toFixed(1)}%
          </p>
        </div>

        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
          <h2 className="text-green-400 font-bold text-xl">Productivity</h2>
          <p className="text-4xl font-bold mt-3">
            {performance.productivityScore.toFixed(1)}%
          </p>
        </div>

        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
          <h2 className="text-purple-400 font-bold text-xl">Final Score</h2>
          <p className="text-4xl font-bold mt-3">
            {performance.finalScore.toFixed(1)}%
          </p>
        </div>
      </div>

      <div className={`bg-slate-800 p-8 rounded-2xl border ${riskColor}`}>
        <h2 className="text-3xl font-bold">
          🤖 Risk Level:{" "}
          <span className={riskColor.split(" ")[0]}>
            {performance.riskLevel}
          </span>
        </h2>

        <p className="text-gray-300 text-lg mt-5">
          {performance.recommendation}
        </p>
      </div>
    </div>
  );
}

export default StudentPerformance;