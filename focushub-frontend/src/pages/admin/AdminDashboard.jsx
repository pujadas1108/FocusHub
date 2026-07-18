import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout";

function AdminDashboard() {
  const navigate = useNavigate();
  const adminName = localStorage.getItem("adminName") || "Administrator";

  const menuItems = [
    { title: "Create Teacher", icon: "👨‍🏫", path: "/admin/create-teacher", dashboard: "/admin/dashboard" },
    { title: "Manage Teachers", icon: "📋", path: "/admin/teachers" },
    { title: "Manage Students", icon: "🎓", path: "/admin/students" },
    { title: "Analytics", icon: "📊", path: "/admin/analytics" },
    { title: "Help Queries", icon: "💬", path: "/admin/queries" },
    { title: "Merit Results", icon: "🏆", path: "/admin/merit-results" },
    { title: "Routine", icon: "📅", path: "/admin/routines" },
    { title: "Payments", icon: "💳", path: "/admin/payments" },
    { title: "Exams", icon: "📝", path: "/admin/exams" },
    { title: "Attendance", icon: "🧾", path: "/admin/attendance" },
  ];

  return (
    <DashboardLayout
      panelTitle="Admin Dashboard"
      userName={adminName}
      role="Admin"
      menuItems={menuItems}
      logoutPath="/admin/login"
    >
      <div className="bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 p-8 rounded-3xl shadow-xl mb-8">
        <h1 className="text-4xl font-bold">
          Welcome, {adminName} 👋
        </h1>
        <p className="text-red-100 mt-3">
          Manage teachers, students, routines, payments, exams and platform analytics.
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
          <h2 className="text-green-400 font-bold">Teachers</h2>
          <p className="text-3xl mt-3">👨‍🏫</p>
          <p className="text-gray-400 mt-2">Create and manage</p>
        </div>

        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
          <h2 className="text-purple-400 font-bold">Students</h2>
          <p className="text-3xl mt-3">🎓</p>
          <p className="text-gray-400 mt-2">Registered students</p>
        </div>

        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
          <h2 className="text-green-400 font-bold">Payments</h2>
          <p className="text-3xl mt-3">💳</p>
          <p className="text-gray-400 mt-2">Paid, due and partial</p>
        </div>

        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
          <h2 className="text-cyan-400 font-bold">Analytics</h2>
          <p className="text-3xl mt-3">📊</p>
          <p className="text-gray-400 mt-2">Reports and statistics</p>
        </div>
      </div>

      <h2 className="text-3xl font-bold mb-6">Quick Access</h2>

      <div className="grid md:grid-cols-3 xl:grid-cols-4 gap-6">
        {menuItems.map((item) => (
          <div
            key={item.title}
            onClick={() => navigate(item.path)}
            className="bg-slate-800 hover:bg-slate-700 p-7 rounded-2xl cursor-pointer border border-slate-700 shadow-xl transition hover:scale-105"
          >
            <div className="text-5xl mb-4">{item.icon}</div>

            <h3 className="text-xl font-bold text-cyan-400">
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

export default AdminDashboard;