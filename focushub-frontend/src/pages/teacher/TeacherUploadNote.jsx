import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API from "../../api/api";

function TeacherUploadNote() {
  const navigate = useNavigate();

  const teacherId = 1;

  const [rooms, setRooms] = useState([]);
  const [title, setTitle] = useState("");
  const [roomId, setRoomId] = useState("");
  const [file, setFile] = useState(null);

  const loadTeacherRooms = async () => {
    try {
      const res = await API.get(`/rooms/teacher/${teacherId}`);
      setRooms(res.data);
    } catch (err) {
      alert("Failed to load rooms");
    }
  };

  const uploadNote = async (e) => {
    e.preventDefault();

    if (!title || !roomId || !file) {
      alert("Please fill title, select room and choose file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("roomId", roomId);
    formData.append("teacherId", teacherId);

    try {
      await axios.post(
        "http://localhost:8080/api/notes/upload",
        formData
      );

      alert("Note uploaded successfully");
      navigate("/teacher/rooms");
    } catch (err) {
      console.log("UPLOAD ERROR:", err);

      alert(
        "Status: " +
          err.response?.status +
          "\nError: " +
          (err.response?.data || err.message)
      );
    }
  };

  useEffect(() => {
    loadTeacherRooms();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950 text-white flex justify-center items-center px-4">
      <div className="bg-slate-800/90 p-8 rounded-2xl w-full max-w-md shadow-xl border border-slate-700">
        <h2 className="text-3xl font-bold text-purple-400 text-center mb-2">
          Upload Notes
        </h2>

        <p className="text-gray-400 text-center mb-6">
          Select your room and upload study material
        </p>

        <form onSubmit={uploadNote}>
          <input
            type="text"
            placeholder="Note Title"
            className="w-full p-3 mb-4 rounded bg-slate-700 text-white outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <select
            className="w-full p-3 mb-4 rounded bg-slate-700 text-white outline-none"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          >
            <option value="">Select Room</option>
            {rooms.map((room) => (
              <option key={room.roomId} value={room.roomId}>
                {room.roomName} - {room.subject}
              </option>
            ))}
          </select>

          <input
            type="file"
            className="w-full p-3 mb-4 rounded bg-slate-700 text-white outline-none"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <button className="w-full bg-purple-500 hover:bg-purple-600 p-3 rounded-xl font-semibold">
            Upload Note
          </button>
        </form>

        <button
          onClick={() => navigate("/teacher/dashboard")}
          className="w-full mt-3 bg-slate-700 hover:bg-slate-600 p-3 rounded-xl"
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default TeacherUploadNote;