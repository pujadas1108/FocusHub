import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";

function TeacherCreateRoom() {
  const navigate = useNavigate();

  const [roomName, setRoomName] = useState("");
  const [subject, setSubject] = useState("");

  const cardStyle =
    "bg-slate-800 p-8 rounded-2xl shadow-xl border border-slate-700";

  const createRoom = async (e) => {
    e.preventDefault();

    try {
      await API.post("/rooms/create", {
        roomName,
        subject,
        teacherId: 1,
      });

      alert("Study room created successfully");
      navigate("/teacher/dashboard");
    } catch (err) {
      alert(err.response?.data || "Room create failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex justify-center items-center px-4 text-white">
      <div className={cardStyle}>
        <h2 className="text-3xl font-bold text-center mb-6 text-green-400">
          Create Study Room
        </h2>

        <form onSubmit={createRoom}>
          <input
            type="text"
            placeholder="Room Name"
            className="w-full p-3 mb-4 rounded bg-slate-700 text-white"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Subject"
            className="w-full p-3 mb-4 rounded bg-slate-700 text-white"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />

          <button className="w-full bg-green-500 hover:bg-green-600 text-white p-3 rounded font-semibold">
            Create Room
          </button>
        </form>
      </div>
    </div>
  );
}

export default TeacherCreateRoom;