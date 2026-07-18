import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DashboardLayout.css";

function DashboardLayout({
  panelTitle = "Dashboard",
  userName = "User",
  role = "Student",
  menuItems = [],
  children,
  logoutPath = "/",
}) {
  const navigate = useNavigate();

  const [open, setOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifyOpen, setNotifyOpen] = useState(false);

  const logout = () => {
    localStorage.clear();
    navigate(logoutPath);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      <aside
        className={`${
          open ? "w-72" : "w-24"
        } bg-slate-900 border-r border-slate-700 h-screen fixed left-0 top-0 p-5 overflow-y-auto sidebar-scroll transition-all duration-300`}
      >
        <div className="flex items-center justify-between mb-8">
          {open && (
            <div>
              <h1 className="text-2xl font-bold text-blue-400">FocusHub</h1>
              <p className="text-gray-400 text-sm">{role} Panel</p>
            </div>
          )}

          <button
            onClick={() => setOpen(!open)}
            className="bg-slate-800 px-3 py-2 rounded-lg"
          >
            ☰
          </button>
        </div>

        <button
          onClick={() => navigate(menuItems[0]?.dashboard || "/")}
          className="w-full flex items-center gap-4 bg-blue-600 hover:bg-blue-700 p-4 rounded-xl mb-6"
        >
          <span className="text-2xl">🏠</span>
          {open && <span className="font-bold">Dashboard</span>}
        </button>

        <div className="space-y-3 pb-8">
          {menuItems.map((item) => (
            <button
              key={item.title}
              onClick={() => navigate(item.path)}
              className="w-full flex items-center gap-4 bg-slate-800 hover:bg-slate-700 p-4 rounded-xl transition"
            >
              <span className="text-2xl">{item.icon}</span>
              {open && <span>{item.title}</span>}
            </button>
          ))}
        </div>

        <button
          onClick={logout}
          className="w-full flex items-center gap-4 bg-red-500 hover:bg-red-600 p-4 rounded-xl font-bold mb-8"
        >
          <span>🚪</span>
          {open && <span>Logout</span>}
        </button>
      </aside>

      <main
        className={`${
          open ? "ml-72" : "ml-24"
        } flex-1 transition-all duration-300`}
      >
        <nav className="h-20 bg-slate-900/95 border-b border-slate-700 flex items-center justify-between px-8 sticky top-0 z-20">
          <div>
            <h2 className="text-2xl font-bold">{panelTitle}</h2>
            <p className="text-gray-400 text-sm">Welcome, {userName}</p>
          </div>

          <div className="flex items-center gap-4 relative">
            <input
              placeholder="Search..."
              className="hidden md:block bg-slate-800 border border-slate-700 px-4 py-3 rounded-xl outline-none focus:border-blue-500"
            />

            <button
              onClick={() => setNotifyOpen(!notifyOpen)}
              className="relative bg-slate-800 hover:bg-slate-700 px-4 py-3 rounded-xl"
            >
              🔔
              <span className="absolute -top-1 -right-1 bg-red-500 text-xs w-5 h-5 rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            <button
                onClick={() => {
                    if (role === "Student") navigate("/student/help");
                    else if (role === "Teacher") navigate("/teacher/payments");
                    else navigate("/admin/help");
                }}
                className="bg-slate-800 hover:bg-slate-700 px-4 py-3 rounded-xl"
                >
                💬
            </button>

            <button
                onClick={() => {
                    if (role === "Student") navigate("/student/routine");
                    else if (role === "Teacher") navigate("/teacher/routine");
                    else navigate("/admin/routines");
                }}
                className="bg-slate-800 hover:bg-slate-700 px-4 py-3 rounded-xl"
                >
                📅
            </button>

            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="bg-slate-800 hover:bg-slate-700 px-4 py-3 rounded-xl flex items-center gap-2"
            >
              👤 <span className="hidden md:inline">{userName}</span> ▼
              
            </button>

            {notifyOpen && (
              <div className="absolute right-20 top-16 w-80 bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl p-5">
                <h3 className="text-lg font-bold text-blue-400 mb-4">
                  Notifications
                </h3>

                <div className="space-y-3">
                  <div className="bg-slate-900 p-3 rounded-xl">
                    New study material uploaded
                  </div>
                  <div className="bg-slate-900 p-3 rounded-xl">
                    Attendance marked successfully
                  </div>
                  <div className="bg-slate-900 p-3 rounded-xl">
                    Payment due reminder
                  </div>
                </div>
              </div>
            )}

            {profileOpen && (
              <div className="absolute right-0 top-16 w-64 bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl p-5">
                <div className="text-center border-b border-slate-700 pb-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-blue-600 mx-auto flex items-center justify-center text-3xl">
                    👤
                  </div>

                  <h3 className="font-bold mt-3">{userName}</h3>
                  <p className="text-gray-400 text-sm">{role}</p>
                </div>

                <button
                    onClick={() => {
                        if (role === "Student") navigate("/student/profile");
                        else if (role === "Teacher") navigate("/teacher/profile");
                        else navigate("/admin/profile");
                    }}
                    className="w-full text-left hover:bg-slate-700 p-3 rounded-xl"
                    >
                    View Profile
                </button>

                <button
                    onClick={() => navigate(`/${role.toLowerCase()}/settings`)}
                    className="w-full text-left hover:bg-slate-700 p-3 rounded-xl"
                    >
                    Settings
                </button>

                <button
                  onClick={logout}
                  className="w-full text-left hover:bg-red-600 p-3 rounded-xl text-red-400 hover:text-white"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </nav>

        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}

export default DashboardLayout;