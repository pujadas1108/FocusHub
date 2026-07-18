import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";

function AdminRoutines() {
  const navigate = useNavigate();

  const [routines, setRoutines] = useState([]);

  const loadRoutines = async () => {
    try {
      const res = await API.get("/routines/all");
      setRoutines(res.data);
    } catch (err) {
      alert("Failed to load routines");
    }
  };

  const deleteRoutine = async (routineId) => {
    if (!window.confirm("Delete this routine?")) return;

    try {
      await API.delete(`/routines/delete/${routineId}`);
      alert("Routine deleted");
      loadRoutines();
    } catch (err) {
      alert("Delete failed");
    }
  };

  useEffect(() => {
    loadRoutines();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-5xl font-bold text-red-400">
          Manage Routines
        </h1>

        <button
          onClick={() => navigate("/admin/create-routine")}
          className="bg-red-500 hover:bg-red-600 px-5 py-3 rounded-xl"
        >
          Create Routine
        </button>
      </div>

      {routines.length === 0 ? (
        <p className="text-gray-400">No routines found.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {routines.map((r) => (
            <div key={r.routineId} className="bg-slate-800 p-6 rounded-2xl">
              <h2 className="text-2xl font-bold text-blue-400">
                {r.title}
              </h2>

              <p className="text-gray-300 mt-2">Subject: {r.subject}</p>
              <p>Day: {r.dayName}</p>
              <p>
                Time: {r.startTime} - {r.endTime}
              </p>
              <p>Teacher ID: {r.teacherId}</p>

              <p className="mt-2">
                Level:{" "}
                <span className="text-yellow-400 font-bold">
                  {r.targetLevel}
                </span>
              </p>

              <p className="text-gray-400 mt-2">{r.description}</p>

              <button
                onClick={() => deleteRoutine(r.routineId)}
                className="mt-4 bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminRoutines;