import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";

function StudentRoutine() {
  const navigate = useNavigate();

  const [routines, setRoutines] = useState([]);
  const [level, setLevel] = useState("");
  const [loading, setLoading] = useState(false);

  const loadRoutine = async () => {
    try {
      setLoading(true);

      const studentId = localStorage.getItem("studentId");

      if (!studentId) {
        navigate("/student/login");
        return;
      }

      const meritRes = await API.get(`/merit/student/${studentId}`);

      if (meritRes.data.length === 0) {
        navigate("/student/merit-test");
        return;
      }

      const latest = meritRes.data[meritRes.data.length - 1];

      if (!latest.published) {
        alert("Your merit result is under admin review.");
        navigate("/student/dashboard");
        return;
      }

      setLevel(latest.meritLevel);

      const res = await API.get(`/routines/student/${latest.meritLevel}`);
      setRoutines(res.data);
    } catch (err) {
      alert(err.response?.data || "Failed to load routine");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRoutine();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-pink-950 text-white p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-5xl font-bold text-pink-400">
            My Routine
          </h1>
          <p className="text-gray-300 mt-2">
            Merit Level: {level || "Loading..."}
          </p>
        </div>

        <button
          onClick={() => navigate("/student/dashboard")}
          className="bg-slate-700 hover:bg-slate-600 px-5 py-3 rounded-xl"
        >
          Back
        </button>
      </div>

      {loading ? (
        <p className="text-gray-400">Loading routine...</p>
      ) : routines.length === 0 ? (
        <div className="bg-slate-800 p-6 rounded-2xl">
          <p className="text-gray-400">
            No routine available for your level.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {routines.map((r) => (
            <div
              key={r.routineId}
              className="bg-slate-800 p-6 rounded-2xl border border-slate-700"
            >
              <h2 className="text-2xl font-bold text-pink-400">
                {r.title}
              </h2>

              <p className="text-gray-300 mt-3">
                Subject: {r.subject}
              </p>

              <p>Day: {r.dayName}</p>

              <p>
                Time: {r.startTime} - {r.endTime}
              </p>

              <p>Teacher ID: {r.teacherId}</p>

              <p className="text-yellow-400 mt-2">
                Level: {r.targetLevel}
              </p>

              <p className="text-gray-400 mt-2">
                {r.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default StudentRoutine;