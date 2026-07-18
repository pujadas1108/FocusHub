import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";

function StudentRooms() {
  const navigate = useNavigate();

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadRooms = async () => {
    try {
      setLoading(true);
      const res = await API.get("/rooms/all");
      setRooms(res.data);
    } catch (err) {
      console.log(err);
      alert(err.response?.data || "Rooms load failed");
    } finally {
      setLoading(false);
    }
  };

  const joinRoom = async (roomId) => {
    try {
      await API.post("/rooms/join", {
        roomId: roomId,
        studentId: 1,
      });

      alert("Room joined successfully");
      navigate("/student/joined-rooms");
    } catch (err) {
      alert(err.response?.data || "Join failed");
    }
  };

  useEffect(() => {
    loadRooms();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-5xl font-extrabold text-blue-400">
            Study Rooms
          </h1>
          <p className="text-gray-300 mt-2">
            Join rooms, chat and attend video sessions
          </p>
        </div>

        <button
          onClick={() => navigate("/student/dashboard")}
          className="bg-slate-700 hover:bg-slate-600 px-5 py-3 rounded-xl"
        >
          Back
        </button>
      </div>

      {loading ? (
        <p className="text-gray-300">Loading rooms...</p>
      ) : rooms.length === 0 ? (
        <div className="bg-slate-800 p-8 rounded-2xl">
          <p className="text-gray-300">No rooms found.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div
              key={room.roomId}
              className="bg-slate-800/90 p-6 rounded-2xl shadow-xl border border-slate-700"
            >
              <div className="text-4xl mb-4">📚</div>

              <h2 className="text-2xl font-bold text-white">
                {room.roomName}
              </h2>

              <p className="text-gray-300 mt-2">
                Subject: {room.subject}
              </p>

              <p className="text-gray-400 text-sm mt-1">
                Room ID: {room.roomId}
              </p>

              <div className="flex flex-wrap gap-2 mt-6">
                <button
                  onClick={() => joinRoom(room.roomId)}
                  className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg"
                >
                  Join
                </button>

                <button
                  onClick={() => navigate(`/room/${room.roomId}/chat`)}
                  className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg"
                >
                  Chat
                </button>

                <button
                  onClick={() => navigate(`/room/${room.roomId}/video`)}
                  className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-lg"
                >
                  Video
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default StudentRooms;