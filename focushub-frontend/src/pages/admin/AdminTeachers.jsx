import { useEffect, useState } from "react";
import API from "../../api/api";

function AdminTeachers() {
  const [teachers, setTeachers] = useState([]);

  const loadTeachers = async () => {
    try {
      const res = await API.get("/teacher/all");
      setTeachers(res.data);
    } catch (err) {
      alert(err.response?.data || "Failed to load teachers");
    }
  };

  const deleteTeacher = async (teacherId) => {
    if (!window.confirm("Delete this teacher?")) return;

    try {
      await API.delete(`/teacher/delete/${teacherId}`);
      alert("Teacher deleted");
      loadTeachers();
    } catch (err) {
      alert(err.response?.data || "Delete failed");
    }
  };

  useEffect(() => {
    loadTeachers();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-4xl font-bold text-red-400 mb-8">
        Manage Teachers
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {teachers.map((teacher) => (
          <div key={teacher.teacherId} className="bg-slate-800 p-6 rounded-xl">
            <h2 className="text-xl font-bold">{teacher.name}</h2>
            <p className="text-gray-400">{teacher.email}</p>
            <p className="text-gray-300 mt-2">
              Specialization: {teacher.specialization}
            </p>
            <p className="text-gray-300">
              Experience: {teacher.experience} years
            </p>

            <button
              onClick={() => deleteTeacher(teacher.teacherId)}
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

export default AdminTeachers;