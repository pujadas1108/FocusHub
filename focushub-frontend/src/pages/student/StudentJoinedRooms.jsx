import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";

function StudentJoinedRooms() {
  const navigate = useNavigate();

  const studentId = 1;

  const [joinedRooms, setJoinedRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadJoinedRooms = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/rooms/joined/${studentId}`);
      setJoinedRooms(res.data);
    } catch (err) {
      alert(err.response?.data || "Failed to load joined rooms");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJoinedRooms();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 text-white p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-5xl font-extrabold text-cyan-400">
            Joined Rooms
          </h1>
          <p className="text-gray-300 mt-2">
            Rooms you have joined for study and discussion
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
        <p className="text-gray-300">Loading joined rooms...</p>
      ) : joinedRooms.length === 0 ? (
        <div className="bg-slate-800 p-8 rounded-2xl">
          <p className="text-gray-400">You have not joined any room yet.</p>

          <button
            onClick={() => navigate("/student/rooms")}
            className="mt-5 bg-blue-500 hover:bg-blue-600 px-5 py-3 rounded-xl"
          >
            Browse Study Rooms
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {joinedRooms.map((item) => (
            <div
              key={item.id}
              className="bg-slate-800/90 p-6 rounded-2xl border border-slate-700 shadow-xl"
            >
              <div className="text-4xl mb-4">✅</div>

              <h2 className="text-xl font-bold text-cyan-400">
                Joined Room
              </h2>

              <p className="text-gray-300 mt-3">
                Room ID: {item.roomId}
              </p>

              <p className="text-gray-400 text-sm">
                Student ID: {item.studentId}
              </p>

              <div className="flex gap-2 mt-5">
                <button
                  onClick={() => navigate(`/room/${item.roomId}/chat`)}
                  className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg"
                >
                  Chat
                </button>

                <button
                  onClick={() => navigate(`/room/${item.roomId}/video`)}
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

export default StudentJoinedRooms;