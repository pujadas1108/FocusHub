import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout";

function StudentDashboard() {
  const navigate = useNavigate();
  const studentName = localStorage.getItem("studentName") || "Student";

  const menuItems = [
    { title: "Study Rooms", icon: "📚", path: "/student/rooms", dashboard: "/student/dashboard" },
    { title: "Notes", icon: "📝", path: "/student/notes" },
    { title: "Routine", icon: "📅", path: "/student/routine" },
    { title: "Attendance", icon: "✅", path: "/student/attendance" },
    { title: "Merit Test", icon: "🧪", path: "/student/merit-test" },
    { title: "Results", icon: "🏆", path: "/student/results" },
    { title: "Productivity", icon: "⏱️", path: "/student/productivity" },
    { title: "Payments", icon: "💳", path: "/student/payments" },
    { title: "Certificates", icon: "🎓", path: "/student/certificates" },
    { title: "Performance", icon: "🤖", path: "/student/performance" },
    { title: "Profile", icon: "👤", path: "/student/profile" },
    { title: "Help Query", icon: "💬", path: "/student/help" },
  ];

  const cards = menuItems.slice(0, 10);

  return (
    <DashboardLayout
      panelTitle="Student Dashboard"
      userName={studentName}
      role="Student"
      menuItems={menuItems}
      logoutPath="/student/login"
    >
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-3xl shadow-xl mb-8">
        <h1 className="text-4xl font-bold">Welcome Back, {studentName} 👋</h1>
        <p className="text-blue-100 mt-3">
          Manage your learning, attendance, payments and performance from one place.
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
          <h2 className="text-blue-400 font-bold">Attendance</h2>
          <p className="text-3xl mt-3">85%</p>
        </div>

        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
          <h2 className="text-green-400 font-bold">Study Hours</h2>
          <p className="text-3xl mt-3">24h</p>
        </div>

        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
          <h2 className="text-yellow-400 font-bold">Upcoming Exam</h2>
          <p className="text-3xl mt-3">2</p>
        </div>

        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
          <h2 className="text-red-400 font-bold">Payment Due</h2>
          <p className="text-3xl mt-3">₹500</p>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-white mb-6">Quick Access</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {cards.map((item) => (
          <div
            key={item.title}
            onClick={() => navigate(item.path)}
            className="bg-slate-800 hover:bg-slate-700 p-7 rounded-2xl cursor-pointer border border-slate-700 shadow-xl transition"
          >
            <div className="text-5xl mb-4">{item.icon}</div>
            <h3 className="text-xl font-bold text-blue-400">{item.title}</h3>
            <p className="text-gray-400 mt-2">Open {item.title}</p>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}

export default StudentDashboard;