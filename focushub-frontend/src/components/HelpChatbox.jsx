import { useState } from "react";
import API from "../api/api";

function HelpChatbox() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [queries, setQueries] = useState([]);

  const submitQuery = async () => {
    if (!name || !email || !message) {
      alert("Please fill all fields");
      return;
    }

    try {
      await API.post("/help/query", {
        name,
        email,
        message,
      });

      alert("Query sent successfully");
      setMessage("");
      loadReplies();
    } catch (err) {
      alert(err.response?.data || "Query send failed");
    }
  };

  const loadReplies = async () => {
    if (!email) {
      alert("Enter email to check replies");
      return;
    }

    try {
      const res = await API.get(`/help/user/${email}`);
      setQueries(res.data);
    } catch (err) {
      alert("Failed to load replies");
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-600 text-white px-5 py-4 rounded-full shadow-2xl z-50"
      >
        💬 Help
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 w-96 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl z-50 overflow-hidden">
          <div className="bg-blue-500 p-4">
            <h3 className="text-white font-bold text-xl">FocusHub Helpbox</h3>
            <p className="text-blue-100 text-sm">Ask your query</p>
          </div>

          <div className="p-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 mb-3 rounded bg-slate-800 text-white outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 mb-3 rounded bg-slate-800 text-white outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <textarea
              placeholder="Write your query..."
              className="w-full p-3 mb-3 rounded bg-slate-800 text-white outline-none h-24"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button
              onClick={submitQuery}
              className="w-full bg-blue-500 hover:bg-blue-600 p-3 rounded text-white font-semibold"
            >
              Send Query
            </button>

            <button
              onClick={loadReplies}
              className="w-full mt-2 bg-green-500 hover:bg-green-600 p-3 rounded text-white font-semibold"
            >
              Check Reply
            </button>

            <div className="mt-4 max-h-52 overflow-y-auto">
              {queries.map((q) => (
                <div key={q.queryId} className="bg-slate-800 p-3 rounded mb-3">
                  <p className="text-gray-300">
                    <b>You:</b> {q.message}
                  </p>

                  <p className="text-sm mt-2">
                    Status:{" "}
                    <span className={q.status === "REPLIED" ? "text-green-400" : "text-yellow-400"}>
                      {q.status}
                    </span>
                  </p>

                  {q.adminReply && (
                    <p className="text-blue-300 mt-2">
                      <b>Admin:</b> {q.adminReply}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default HelpChatbox;