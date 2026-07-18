import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";

function StudentProductivity() {
  const navigate = useNavigate();

  const studentId = 1;

  const [focusMinutes, setFocusMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadLogs = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/productivity/student/${studentId}`);
      setLogs(res.data);
    } catch (err) {
      alert(err.response?.data || "Failed to load productivity logs");
    } finally {
      setLoading(false);
    }
  };

  const saveSession = async () => {
    if (!focusMinutes || !breakMinutes) {
      alert("Please enter focus and break minutes");
      return;
    }

    try {
      await API.post("/productivity/save", {
        studentId,
        focusMinutes: Number(focusMinutes),
        breakMinutes: Number(breakMinutes),
      });

      alert("Session saved successfully");
      loadLogs();
    } catch (err) {
      alert(err.response?.data || "Failed to save session");
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-green-950 text-white p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-5xl font-extrabold text-green-400">
            Productivity Tracker
          </h1>
          <p className="text-gray-300 mt-2">
            Save Pomodoro sessions and track your focus score
          </p>
        </div>

        <button
          onClick={() => navigate("/student/dashboard")}
          className="bg-slate-700 hover:bg-slate-600 px-5 py-3 rounded-xl"
        >
          Back
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-slate-800/90 p-8 rounded-2xl border border-slate-700 shadow-xl">
          <h2 className="text-2xl font-bold text-green-400 mb-5">
            Add Study Session
          </h2>

          <label className="text-gray-300">Focus Minutes</label>
          <input
            type="number"
            className="w-full p-4 mt-2 mb-4 rounded-xl bg-slate-700 text-white outline-none"
            value={focusMinutes}
            onChange={(e) => setFocusMinutes(e.target.value)}
          />

          <label className="text-gray-300">Break Minutes</label>
          <input
            type="number"
            className="w-full p-4 mt-2 mb-5 rounded-xl bg-slate-700 text-white outline-none"
            value={breakMinutes}
            onChange={(e) => setBreakMinutes(e.target.value)}
          />

          <button
            onClick={saveSession}
            className="w-full bg-green-500 hover:bg-green-600 p-4 rounded-xl font-bold"
          >
            Save Session
          </button>
        </div>

        <div className="bg-slate-800/90 p-8 rounded-2xl border border-slate-700 shadow-xl">
          <h2 className="text-2xl font-bold text-blue-400 mb-5">
            Summary
          </h2>

          <p className="text-gray-300">
            Total Sessions:{" "}
            <span className="text-white font-bold">{logs.length}</span>
          </p>

          <p className="text-gray-300 mt-3">
            Total Study Minutes:{" "}
            <span className="text-white font-bold">
              {logs.reduce((sum, log) => sum + (log.focusMinutes || 0), 0)}
            </span>
          </p>

          <p className="text-gray-300 mt-3">
            Average Focus Score:{" "}
            <span className="text-green-400 font-bold">
              {logs.length === 0
                ? 0
                : Math.round(
                    logs.reduce((sum, log) => sum + (log.focusScore || 0), 0) /
                      logs.length
                  )}
              %
            </span>
          </p>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-3xl font-bold mb-5">Session History</h2>

        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : logs.length === 0 ? (
          <div className="bg-slate-800 p-6 rounded-2xl">
            <p className="text-gray-400">No productivity logs yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {logs.map((log) => (
              <div key={log.logId} className="bg-slate-800 p-6 rounded-2xl">
                <p>Focus: {log.focusMinutes} min</p>
                <p>Break: {log.breakMinutes} min</p>
                <p>Total: {log.totalMinutes} min</p>
                <p className="text-green-400 font-bold">
                  Focus Score: {log.focusScore}%
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Date: {log.date}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentProductivity;