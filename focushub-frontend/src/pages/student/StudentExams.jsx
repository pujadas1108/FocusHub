import { useEffect, useState } from "react";
import API from "../../api/api";

function StudentExams() {
  const [exams, setExams] = useState([]);

  const getMeritLevel = async () => {
    const studentId = localStorage.getItem("studentId");
    const res = await API.get(`/merit/student/${studentId}`);
    const latest = res.data[res.data.length - 1];
    return latest?.published ? latest.meritLevel : "ALL";
  };

  const loadExams = async () => {
    const level = await getMeritLevel();
    const res = await API.get(`/exams/student/${level}`);
    setExams(res.data);
  };

  const submitExam = async (exam) => {
    const score = prompt("Enter obtained score:");

    if (!score) return;

    await API.post("/exams/submit", {
      examId: exam.examId,
      studentId: Number(localStorage.getItem("studentId")),
      studentName: localStorage.getItem("studentName"),
      score: Number(score),
    });

    alert("Exam submitted");
  };

  useEffect(() => {
    loadExams();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-5xl font-bold text-orange-400 mb-8">
        My Exams
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {exams.map((exam) => (
          <div key={exam.examId} className="bg-slate-800 p-6 rounded-2xl">
            <h2 className="text-xl font-bold text-orange-400">{exam.examTitle}</h2>
            <p>Subject: {exam.subject}</p>
            <p>Level: {exam.targetLevel}</p>
            <p>Marks: {exam.totalMarks}</p>
            <p>Date: {exam.examDate}</p>

            <button
              onClick={() => submitExam(exam)}
              className="mt-4 bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded"
            >
              Submit Score
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentExams;