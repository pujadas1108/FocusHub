import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="w-full bg-slate-950 text-white px-8 py-4 flex justify-between items-center shadow-lg">
      <Link to="/" className="text-2xl font-bold text-blue-400">
        FocusHub
      </Link>

      <div className="flex gap-6">
        <Link to="/" className="hover:text-blue-400">Home</Link>
        <Link to="/student/login" className="hover:text-blue-400">Student</Link>
        <Link to="/teacher/login" className="hover:text-blue-400">Teacher</Link>
        <Link to="/admin/login" className="hover:text-blue-400">Admin</Link>
      </div>
    </nav>
  );
}

export default Navbar;