import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";

function StudentNotes() {
  const navigate = useNavigate();

  const [roomId, setRoomId] = useState("");
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadNotes = async () => {
    if (!roomId) {
      alert("Please enter Room ID");
      return;
    }

    try {
      setLoading(true);
      const res = await API.get(`/notes/room/${roomId}`);
      setNotes(res.data);
    } catch (err) {
      alert(err.response?.data || "Failed to load notes");
    } finally {
      setLoading(false);
    }
  };

  const downloadNote = (fileName) => {
    window.open(
      `http://localhost:8080/api/notes/download/${fileName}`,
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950 text-white p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-5xl font-extrabold text-purple-400">
            Study Notes
          </h1>
          <p className="text-gray-300 mt-2">
            Access notes uploaded by teachers
          </p>
        </div>

        <button
          onClick={() => navigate("/student/dashboard")}
          className="bg-slate-700 hover:bg-slate-600 px-5 py-3 rounded-xl"
        >
          Back
        </button>
      </div>

      <div className="bg-slate-800/90 p-6 rounded-2xl border border-slate-700 mb-8">
        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="number"
            placeholder="Enter Room ID"
            className="flex-1 p-4 rounded-xl bg-slate-700 text-white outline-none"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />

          <button
            onClick={loadNotes}
            className="bg-purple-500 hover:bg-purple-600 px-6 py-3 rounded-xl font-semibold"
          >
            Load Notes
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-gray-300">Loading notes...</p>
      ) : notes.length === 0 ? (
        <div className="bg-slate-800 p-6 rounded-2xl">
          <p className="text-gray-400">No notes found.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {notes.map((note) => (
            <div key={note.noteId} className="bg-slate-800 p-6 rounded-2xl">
              <div className="text-4xl mb-3">📝</div>

              <h2 className="text-xl font-bold text-purple-400">
                {note.title}
              </h2>

              <p className="text-gray-400 mt-2 text-sm">
                {note.fileName}
              </p>

              <button
                onClick={() => downloadNote(note.fileName)}
                className="mt-5 bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg"
              >
                Download
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default StudentNotes;