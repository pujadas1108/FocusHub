import { useEffect, useState } from "react";
import API from "../../api/api";

function AdminCertificates() {

  const [results, setResults] = useState([]);

  const loadResults = async () => {

    const res =
      await API.get("/exams/results/all");

    setResults(res.data);
  };

  const issueCertificate = async (id) => {

    await API.put(
      `/exams/certificate/${id}`
    );

    alert("Certificate issued");

    loadResults();
  };

  useEffect(() => {
    loadResults();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">

      <h1 className="text-5xl font-bold text-green-400 mb-8">
        Certificates
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        {results.map((r) => (

          <div
            key={r.resultId}
            className="bg-slate-800 p-6 rounded-2xl"
          >
            <h2 className="text-xl font-bold">
              Student ID: {r.studentId}
            </h2>

            <p>Score: {r.score}</p>

            <p>Rank: {r.rankPosition}</p>

            <p>
              Eligible:
              {r.certificateEligible
                ? " Yes"
                : " No"}
            </p>

            {!r.certificateIssued &&
              r.certificateEligible && (

                <button
                  onClick={() =>
                    issueCertificate(r.resultId)
                  }
                  className="mt-4 bg-green-500 px-4 py-2 rounded"
                >
                  Issue Certificate
                </button>
              )}

          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminCertificates;