import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";

function TeacherRooms() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);

  const teacherId = 1;

  const loadRooms = async () => {
    try {
      const res = await API.get(`/rooms/teacher/${teacherId}`);
      setRooms(res.data);
    } catch (err) {
      alert(err.response?.data || "Failed to load teacher rooms");
    }
  };

  const deleteRoom = async (roomId) => {
    if (!window.confirm("Delete this room?")) return;

    try {
      await API.delete(`/rooms/delete/${roomId}`);
      alert("Room deleted");
      loadRooms();
    } catch (err) {
      alert(err.response?.data || "Delete failed");
    }
  };

  useEffect(() => {
    loadRooms();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-4xl font-bold text-green-400 mb-8">
        My Study Rooms
      </h1>

      {rooms.length === 0 ? (
        <p className="text-gray-400">No rooms created yet.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div key={room.roomId} className="bg-slate-800 p-6 rounded-xl">
              <h2 className="text-2xl font-bold mb-2">
                {room.roomName}
              </h2>

              <p className="text-gray-300 mb-4">
                Subject: {room.subject}
              </p>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => navigate(`/room/${room.roomId}/chat`)}
                  className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
                >
                  Chat
                </button>

                <button
                  onClick={() => navigate(`/room/${room.roomId}/video`)}
                  className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded"
                >
                  Start Session
                </button>

                <button
                  onClick={() => navigate("/teacher/upload-note")}
                  className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
                >
                  Upload Notes0 
                </button>

                <button
                  onClick={() => deleteRoom(room.roomId)}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TeacherRooms;