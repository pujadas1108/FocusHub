import { useEffect, useState } from "react";
import API from "../../api/api";

function AdminQueries() {
  const [queries, setQueries] = useState([]);
  const [replyText, setReplyText] = useState({});

  const loadQueries = async () => {
    try {
      const res = await API.get("/help/all");
      setQueries(res.data);
    } catch (err) {
      alert("Failed to load queries");
    }
  };

  const sendReply = async (queryId) => {
    if (!replyText[queryId]) {
      alert("Please write reply");
      return;
    }

    try {
      await API.put(`/help/reply/${queryId}`, {
        reply: replyText[queryId],
      });

      alert("Reply sent");
      setReplyText({ ...replyText, [queryId]: "" });
      loadQueries();
    } catch (err) {
      alert("Reply failed");
    }
  };

  useEffect(() => {
    loadQueries();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-5xl font-bold text-red-400 mb-8">
        Help Queries
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {queries.map((q) => (
          <div key={q.queryId} className="bg-slate-800 p-6 rounded-2xl">
            <h2 className="text-xl font-bold text-blue-400">{q.name}</h2>
            <p className="text-gray-400">{q.email}</p>

            <p className="mt-4 text-gray-200">
              <b>Query:</b> {q.message}
            </p>

            <p className="mt-2">
              Status:{" "}
              <span className={q.status === "REPLIED" ? "text-green-400" : "text-yellow-400"}>
                {q.status}
              </span>
            </p>

            {q.adminReply && (
              <p className="mt-3 text-green-300">
                <b>Previous Reply:</b> {q.adminReply}
              </p>
            )}

            <textarea
              placeholder="Write reply..."
              className="w-full mt-4 p-3 rounded bg-slate-700 text-white outline-none"
              value={replyText[q.queryId] || ""}
              onChange={(e) =>
                setReplyText({
                  ...replyText,
                  [q.queryId]: e.target.value,
                })
              }
            />

            <button
              onClick={() => sendReply(q.queryId)}
              className="mt-3 bg-green-500 hover:bg-green-600 px-5 py-2 rounded"
            >
              Reply
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminQueries;