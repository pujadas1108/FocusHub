import { Link } from "react-router-dom";
import HelpChatbox from "../components/HelpChatbox";

function Home() {
  const subjects = [
    ["☕", "Java Programming", "Core Java, OOPs, Collections, Spring Boot basics"],
    ["🌐", "Web Development", "HTML, CSS, JavaScript, React and responsive UI"],
    ["🗄️", "Database Management", "MySQL, SQL queries and database connectivity"],
    ["📘", "Software Engineering", "SDLC, UML diagrams and documentation"],
    ["🧠", "Data Structures", "Stack, Queue, Linked List, Tree and algorithms"],
    ["💻", "Project Development", "Full-stack project using React, Spring Boot and MySQL"],
  ];

  const helps = [
    ["📚", "Join Study Rooms", "Join subject-wise rooms for group learning"],
    ["👨‍🏫", "Learn from Teachers", "Attend teacher-led sessions and discussions"],
    ["📝", "Access Notes", "Download study materials shared by teachers"],
    ["⏱️", "Track Study Time", "Improve focus using productivity tools"],
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="fixed top-0 left-0 w-full z-50 bg-slate-950/80 backdrop-blur border-b border-slate-800">
        <div className="px-8 py-5 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold text-blue-400">
            FocusHub
          </h1>

          <nav className="flex gap-6 text-sm md:text-base">
            <Link to="/" className="hover:text-blue-400">Home</Link>
            
            <Link to="/teacher/login" className="hover:text-green-400">Teacher</Link>
            <Link to="/admin/login" className="hover:text-red-400">Admin</Link>
          </nav>
        </div>
      </header>

      <section className="pt-28 px-8 md:px-14 min-h-screen grid md:grid-cols-2 gap-12 items-center bg-[radial-gradient(circle_at_top_left,#1d4ed850,transparent_35%),radial-gradient(circle_at_bottom_right,#7c3aed40,transparent_35%)]">
        <div>
          

          <h2 className="text-5xl md:text-7xl font-extrabold leading-tight">
            Study Better with{" "}
            <span className="text-blue-400">FocusHub</span>
          </h2>

          <p className="text-gray-300 mt-6 text-lg leading-relaxed">
            A smart collaborative learning platform where students can join
            study rooms, learn from teachers, access notes, chat, attend live
            sessions and track productivity.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/student/register"
              className="bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-xl font-semibold shadow-lg"
            >
              Start Learning
            </Link>

            <Link
              to="/student/login"
              className="border border-blue-400 hover:bg-blue-500 px-8 py-3 rounded-xl font-semibold"
            >
              Student Login
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -top-8 -left-8 w-40 h-40 bg-blue-500/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-purple-500/30 rounded-full blur-3xl"></div>

          <div className="relative bg-slate-900/90 border border-slate-700 rounded-3xl p-8 shadow-2xl">
            <div className="bg-gradient-to-br from-blue-500/30 to-purple-500/20 rounded-2xl p-6 mb-6">
              <div className="text-7xl text-center mb-4">🎓</div>
              <h3 className="text-3xl font-bold text-center text-blue-300">
                Smart Learning Space
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-800 p-4 rounded-xl">
                <p className="text-3xl">📚</p>
                <h4 className="font-bold mt-2">Study Rooms</h4>
              </div>

              <div className="bg-slate-800 p-4 rounded-xl">
                <p className="text-3xl">📝</p>
                <h4 className="font-bold mt-2">Notes</h4>
              </div>

              <div className="bg-slate-800 p-4 rounded-xl">
                <p className="text-3xl">💬</p>
                <h4 className="font-bold mt-2">Discussion</h4>
              </div>

              <div className="bg-slate-800 p-4 rounded-xl">
                <p className="text-3xl">⏱️</p>
                <h4 className="font-bold mt-2">Focus Timer</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-8 md:px-14 py-16 grid md:grid-cols-4 gap-6">
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <h3 className="text-4xl font-bold text-blue-400">100+</h3>
          <p className="text-gray-300 mt-2">Student Applications</p>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <h3 className="text-4xl font-bold text-green-400">25+</h3>
          <p className="text-gray-300 mt-2">Teacher Mentors</p>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <h3 className="text-4xl font-bold text-purple-400">50+</h3>
          <p className="text-gray-300 mt-2">Study Rooms</p>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <h3 className="text-4xl font-bold text-orange-400">Live</h3>
          <p className="text-gray-300 mt-2">Learning Sessions</p>
        </div>
      </section>

      <section className="px-8 md:px-14 py-16">
        <h2 className="text-4xl font-bold text-center mb-4">
          What You Can Learn
        </h2>

        <p className="text-gray-400 text-center mb-10 max-w-2xl mx-auto">
          Explore subject-wise study rooms and learn practical concepts with
          teacher guidance and shared notes.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {subjects.map((item) => (
            <div
              key={item[1]}
              className="bg-slate-900 hover:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-800 transition"
            >
              <div className="text-5xl mb-4">{item[0]}</div>
              <h3 className="text-xl font-bold text-blue-400">{item[1]}</h3>
              <p className="text-gray-400 mt-3 leading-relaxed">{item[2]}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-8 md:px-14 py-16 bg-slate-900">
        <h2 className="text-4xl font-bold text-center mb-10">
          How FocusHub Helps Students
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          {helps.map((item) => (
            <div
              key={item[1]}
              className="bg-slate-800 p-6 rounded-2xl text-center border border-slate-700"
            >
              <div className="text-4xl mb-4">{item[0]}</div>
              <h3 className="text-lg font-bold text-green-400">{item[1]}</h3>
              <p className="text-gray-400 mt-2">{item[2]}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-8 md:px-14 py-16">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-10 text-center shadow-2xl">
          <h2 className="text-4xl font-bold">
            Ready to start your focused learning journey?
          </h2>

          <p className="text-blue-100 mt-4">
            Join FocusHub and make study sessions more organized,
            collaborative and productive.
          </p>

          <Link
            to="/student/register"
            className="inline-block mt-7 bg-white text-slate-900 px-8 py-3 rounded-xl font-bold hover:bg-gray-200"
          >
            Join as Student
          </Link>
        </div>
      </section>
          <HelpChatbox />
      <footer className="bg-slate-950 border-t border-slate-800 mt-10">
        <div className="max-w-7xl mx-auto px-8 py-12">

          <div className="grid md:grid-cols-4 gap-8">

            {/* About */}
            <div>
              <h3 className="text-2xl font-bold text-blue-400 mb-4">
                FocusHub
              </h3>

              <p className="text-gray-400 leading-relaxed">
                A Real-Time Collaborative Learning Platform where students
                and teachers can learn, communicate, share notes and attend
                live study sessions.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">
                Quick Links
              </h4>

              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="/" className="hover:text-blue-400">
                    Home
                  </Link>
                </li>

                <li>
                  <Link to="/student/login" className="hover:text-blue-400">
                    Student Login
                  </Link>
                </li>

                <li>
                  <Link to="/teacher/login" className="hover:text-blue-400">
                    Teacher Login
                  </Link>
                </li>

                <li>
                  <Link to="/admin/login" className="hover:text-blue-400">
                    Admin Login
                  </Link>
                </li>
              </ul>
            </div>

            {/* Courses */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">
                Popular Subjects
              </h4>

              <ul className="space-y-2 text-gray-400">
                <li>Java Programming</li>
                <li>Web Development</li>
                <li>Data Structures</li>
                <li>Database Management</li>
                <li>Software Engineering</li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">
                Contact Us
              </h4>

              <div className="space-y-3 text-gray-400">
                <p>📍 Saguna, West Bengal, India</p>

                <p>
                  📧 focushub.learning@gmail.com
                </p>

                <p>
                  📞 +91 7001412361
                </p>

                <p>
                  🌐 www.focushub.com
                </p>
              </div>
            </div>

          </div>

          {/* Social Icons */}
          <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">

            <div className="flex gap-4 text-2xl mb-4 md:mb-0">
              <a href="#" className="hover:scale-110 transition">
                📘
              </a>

              <a href="#" className="hover:scale-110 transition">
                📷
              </a>

              <a href="#" className="hover:scale-110 transition">
                💼
              </a>

              <a href="#" className="hover:scale-110 transition">
                ▶️
              </a>
            </div>

            <p className="text-gray-500 text-center">
              © 2026 FocusHub | Real-Time Collaborative Learning Platform
              
            </p>

          </div>

        </div>
      </footer>
    </div>
  );
}

export default Home;