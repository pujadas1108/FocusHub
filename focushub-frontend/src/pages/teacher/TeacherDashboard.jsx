import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout";

function TeacherDashboard() {
  const navigate = useNavigate();
  const teacherName = localStorage.getItem("teacherName") || "Teacher";

  const menuItems = [
    { title: "Create Room", icon: "➕", path: "/teacher/create-room", dashboard: "/teacher/dashboard" },
    { title: "My Rooms", icon: "📚", path: "/teacher/rooms" },
    { title: "Upload Notes", icon: "📝", path: "/teacher/upload-note" },
    { title: "Attendance", icon: "✅", path: "/teacher/attendance" },
    { title: "Routine", icon: "📅", path: "/teacher/routine" },
    { title: "Student Payments", icon: "💳", path: "/teacher/payments" },
    { title: "Profile", icon: "👤", path: "/teacher/profile" },
  ];

  return (
    <DashboardLayout
      panelTitle="Teacher Dashboard"
      userName={teacherName}
      role="Teacher"
      menuItems={menuItems}
      logoutPath="/teacher/login"
    >
      <div className="bg-gradient-to-r from-green-600 to-blue-600 p-8 rounded-3xl shadow-xl mb-8">
        <h1 className="text-4xl font-bold">
          Welcome, {teacherName} 👋
        </h1>
        <p className="text-green-100 mt-3">
          Manage rooms, notes, attendance, routines and student progress.
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
          <h2 className="text-green-400 font-bold">My Rooms</h2>
          <p className="text-3xl mt-3">Manage</p>
        </div>

        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
          <h2 className="text-blue-400 font-bold">Notes</h2>
          <p className="text-3xl mt-3">Upload</p>
        </div>

        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
          <h2 className="text-yellow-400 font-bold">Attendance</h2>
          <p className="text-3xl mt-3">Mark</p>
        </div>

        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
          <h2 className="text-purple-400 font-bold">Routine</h2>
          <p className="text-3xl mt-3">View</p>
        </div>
      </div>

      <h2 className="text-3xl font-bold mb-6">Quick Access</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <div
            key={item.title}
            onClick={() => navigate(item.path)}
            className="bg-slate-800 hover:bg-slate-700 p-7 rounded-2xl cursor-pointer border border-slate-700 shadow-xl transition"
          >
            <div className="text-5xl mb-4">{item.icon}</div>
            <h3 className="text-xl font-bold text-green-400">
              {item.title}
            </h3>
            <p className="text-gray-400 mt-2">
              Open {item.title}
            </p>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}

export default TeacherDashboard;