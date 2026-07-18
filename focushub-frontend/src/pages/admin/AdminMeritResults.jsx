import { useEffect, useState } from "react";
import API from "../../api/api";

function AdminMeritResults() {
  const [results, setResults] = useState([]);

  const loadResults = async () => {
    try {
      const res = await API.get("/merit/all");
      setResults(res.data);
    } catch (err) {
      alert("Failed to load merit results");
    }
  };

  const publishResult = async (resultId) => {
    try {
      await API.put(`/merit/publish/${resultId}`);
      alert("Result published successfully");
      loadResults();
    } catch (err) {
      alert("Publish failed");
    }
  };

  useEffect(() => {
    loadResults();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-5xl font-bold text-yellow-400 mb-8">
        Merit Test Results
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {results.map((r) => (
          <div key={r.resultId} className="bg-slate-800 p-6 rounded-2xl">
            <h2 className="text-xl font-bold text-blue-400">
              Student ID: {r.studentId}
            </h2>

            <p className="mt-3">Score: {r.score}</p>
            <p>Level: {r.meritLevel}</p>

            <p className="mt-2">
              Status:{" "}
              <span className={r.published ? "text-green-400" : "text-yellow-400"}>
                {r.published ? "PUBLISHED" : "PENDING REVIEW"}
              </span>
            </p>

            {!r.published && (
              <button
                onClick={() => publishResult(r.resultId)}
                className="mt-5 bg-green-500 hover:bg-green-600 px-5 py-2 rounded"
              >
                Publish Result
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminMeritResults;