import { useEffect, useState } from "react";
import API from "../../api/api";

function AdminStudents() {
  const [students, setStudents] = useState([]);

  const loadStudents = async () => {
    try {
      const res = await API.get("/student/all");
      setStudents(res.data);
    } catch (err) {
      alert(err.response?.data || "Failed to load students");
    }
  };

  const deleteStudent = async (studentId) => {
    if (!window.confirm("Delete this student?")) return;

    try {
      await API.delete(`/student/delete/${studentId}`);
      alert("Student deleted");
      loadStudents();
    } catch (err) {
      alert(err.response?.data || "Delete failed");
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-4xl font-bold text-red-400 mb-8">
        Manage Students
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {students.map((student) => (
          <div key={student.studentId} className="bg-slate-800 p-6 rounded-xl">
            <h2 className="text-xl font-bold">{student.name}</h2>
            <p className="text-gray-400">{student.email}</p>

            <p className="text-gray-300 mt-2">
              Study Streak: {student.studyStreak}
            </p>

            <p className="text-gray-300">
              Total Hours: {student.totalHours}
            </p>

            <p className="text-gray-300">
              Focus Score: {student.focusScore}
            </p>

            <button
              onClick={() => deleteStudent(student.studentId)}
              className="mt-4 bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminStudents;