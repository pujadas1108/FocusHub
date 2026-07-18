import { useEffect, useState } from "react";
import API from "../../api/api";

function AdminExams() {
  const [exams, setExams] = useState([]);
  const [form, setForm] = useState({
    examTitle: "",
    subject: "",
    targetLevel: "ALL",
    totalMarks: 100,
    examDate: "",
  });

  const loadExams = async () => {
    const res = await API.get("/exams/all");
    setExams(res.data);
  };

  const createExam = async (e) => {
    e.preventDefault();

    await API.post("/exams/create", {
      ...form,
      totalMarks: Number(form.totalMarks),
    });

    alert("Exam created");
    setForm({
      examTitle: "",
      subject: "",
      targetLevel: "ALL",
      totalMarks: 100,
      examDate: "",
    });

    loadExams();
  };

  useEffect(() => {
    loadExams();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-5xl font-bold text-orange-400 mb-8">
        Exam Management
      </h1>

      <form onSubmit={createExam} className="bg-slate-800 p-6 rounded-2xl grid md:grid-cols-3 gap-4 mb-8">
        <input placeholder="Exam Title" className="p-3 rounded bg-slate-700"
          value={form.examTitle}
          onChange={(e) => setForm({ ...form, examTitle: e.target.value })}
        />

        <input placeholder="Subject" className="p-3 rounded bg-slate-700"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
        />

        <select className="p-3 rounded bg-slate-700"
          value={form.targetLevel}
          onChange={(e) => setForm({ ...form, targetLevel: e.target.value })}
        >
          <option value="ALL">ALL</option>
          <option value="LOW">LOW</option>
          <option value="MIDDLE">MIDDLE</option>
          <option value="HIGH">HIGH</option>
        </select>

        <input type="number" placeholder="Total Marks" className="p-3 rounded bg-slate-700"
          value={form.totalMarks}
          onChange={(e) => setForm({ ...form, totalMarks: e.target.value })}
        />

        <input type="date" className="p-3 rounded bg-slate-700"
          value={form.examDate}
          onChange={(e) => setForm({ ...form, examDate: e.target.value })}
        />

        <button className="bg-orange-500 hover:bg-orange-600 rounded font-bold">
          Create Exam
        </button>
      </form>

      <div className="grid md:grid-cols-3 gap-6">
        {exams.map((exam) => (
          <div key={exam.examId} className="bg-slate-800 p-6 rounded-2xl">
            <h2 className="text-xl font-bold text-orange-400">{exam.examTitle}</h2>
            <p>Subject: {exam.subject}</p>
            <p>Level: {exam.targetLevel}</p>
            <p>Marks: {exam.totalMarks}</p>
            <p>Date: {exam.examDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminExams;