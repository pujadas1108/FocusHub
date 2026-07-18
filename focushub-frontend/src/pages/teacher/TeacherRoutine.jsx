import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";

function TeacherRoutine() {
  const navigate = useNavigate();

  const teacherId = 1;

  const [routines, setRoutines] = useState([]);

  const loadRoutine = async () => {
    try {
      const res = await API.get(`/routines/teacher/${teacherId}`);
      setRoutines(res.data);
    } catch (err) {
      alert("Failed to load teacher routine");
    }
  };

  useEffect(() => {
    loadRoutine();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-green-950 text-white p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-5xl font-bold text-green-400">
          Teacher Routine
        </h1>

        <button
          onClick={() => navigate("/teacher/dashboard")}
          className="bg-slate-700 hover:bg-slate-600 px-5 py-3 rounded-xl"
        >
          Back
        </button>
      </div>

      {routines.length === 0 ? (
        <p className="text-gray-400">No routine assigned.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {routines.map((r) => (
            <div key={r.routineId} className="bg-slate-800 p-6 rounded-2xl">
              <h2 className="text-2xl font-bold text-green-400">
                {r.title}
              </h2>

              <p className="text-gray-300 mt-2">Subject: {r.subject}</p>
              <p>Day: {r.dayName}</p>
              <p>
                Time: {r.startTime} - {r.endTime}
              </p>

              <p className="text-yellow-400 mt-2">
                Target Level: {r.targetLevel}
              </p>

              <p className="text-gray-400 mt-2">{r.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TeacherRoutine;