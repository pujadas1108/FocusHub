import { useEffect, useState } from "react";
import API from "../../api/api";
import CertificateTemplate from "../../components/CertificateTemplate";

function StudentCertificates() {
  const [results, setResults] = useState([]);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  const loadResults = async () => {
    try {
      const studentId = localStorage.getItem("studentId");
      const res = await API.get(`/exams/results/student/${studentId}`);
      setResults(res.data);
    } catch (err) {
      alert("Failed to load certificates");
    }
  };

  const downloadCertificate = (result) => {
    setSelectedCertificate(result);

    setTimeout(() => {
      window.print();
    }, 300);
  };

  useEffect(() => {
    loadResults();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-5xl font-bold text-green-400 mb-8">
        Certificates & Prizes
      </h1>

      <div className="grid md:grid-cols-2 gap-6 print:hidden">
        {results.map((r) => (
          <div key={r.resultId} className="bg-slate-800 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-yellow-400">
              Exam ID: {r.examId}
            </h2>

            <p className="mt-3">Score: {r.score}</p>
            <p>Rank: {r.rankPosition}</p>

            {r.certificateEligible ? (
              <p className="text-green-400 mt-3">
                Certificate Eligible ✅
              </p>
            ) : (
              <p className="text-red-400 mt-3">
                Not Certificate Eligible ❌
              </p>
            )}

            {r.certificateIssued ? (
              <p className="text-blue-400 mt-2">
                Certificate Issued ✅
              </p>
            ) : (
              <p className="text-yellow-400 mt-2">
                Certificate Not Issued Yet
              </p>
            )}

            {r.prizeEligible && (
              <p className="text-yellow-400 mt-2">
                Prize Eligible 🏆
              </p>
            )}

            {r.certificateIssued && (
              <button
                onClick={() => downloadCertificate(r)}
                className="mt-4 bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
              >
                Download Certificate
              </button>
            )}
          </div>
        ))}
      </div>

      {selectedCertificate && (
        <div className="hidden print:block">
          <CertificateTemplate
            studentName={selectedCertificate.studentName}
            score={selectedCertificate.score}
            rank={selectedCertificate.rankPosition}
          />
        </div>
      )}
    </div>
  );
}

export default StudentCertificates;