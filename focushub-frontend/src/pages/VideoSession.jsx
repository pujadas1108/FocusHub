import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import API from "../api/api";

function VideoSession() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const socketRef = useRef(null);
  const peerRef = useRef(null);
  const localStreamRef = useRef(null);

  const [connected, setConnected] = useState(false);
  const [attendanceMarked, setAttendanceMarked] = useState(false);

  useEffect(() => {
    const socket = io("http://localhost:5000", {
      transports: ["websocket"],
    });

    socketRef.current = socket;

    const peer = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    peerRef.current = peer;

    const markAutoAttendance = async () => {
      try {
        const studentId = localStorage.getItem("studentId");
        const studentName = localStorage.getItem("studentName");

        if (!studentId) return;

        await API.post("/attendance/mark", {
          studentId: Number(studentId),
          studentName: studentName || "Student",
          teacherId: 1,
          roomId: Number(roomId),
          status: "PRESENT",
          markedBy: "AUTO_VIDEO_SESSION",
          faceVerified: false,
          confidenceScore: 0,
        });

        setAttendanceMarked(true);
        console.log("Auto attendance marked");
      } catch (err) {
        console.log("Auto attendance failed:", err);
      }
    };

    const start = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        localStreamRef.current = stream;

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        stream.getTracks().forEach((track) => {
          peer.addTrack(track, stream);
        });

        socket.emit("join-room", roomId);

        markAutoAttendance();
      } catch (err) {
        alert("Camera or microphone permission denied");
      }
    };

    peer.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
      setConnected(true);
    };

    peer.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", {
          roomId,
          candidate: event.candidate,
        });
      }
    };

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("user-joined", async () => {
      const offer = await peer.createOffer();
      await peer.setLocalDescription(offer);

      socket.emit("offer", {
        roomId,
        offer,
      });
    });

    socket.on("offer", async ({ offer }) => {
      await peer.setRemoteDescription(new RTCSessionDescription(offer));

      const answer = await peer.createAnswer();
      await peer.setLocalDescription(answer);

      socket.emit("answer", {
        roomId,
        answer,
      });
    });

    socket.on("answer", async ({ answer }) => {
      await peer.setRemoteDescription(new RTCSessionDescription(answer));
    });

    socket.on("ice-candidate", async ({ candidate }) => {
      if (candidate) {
        await peer.addIceCandidate(new RTCIceCandidate(candidate));
      }
    });

    start();

    return () => {
      socket.disconnect();
      peer.close();

      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, [roomId]);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="flex justify-between mb-6">
        <div>
          <h1 className="text-4xl font-bold text-purple-400">
            FocusHub Live Video Session
          </h1>

          <p className="text-gray-400">
            Room ID: {roomId} |{" "}
            {connected ? "Connected" : "Waiting for another user..."}
          </p>

          <p className="text-sm mt-2">
            Attendance:{" "}
            <span className={attendanceMarked ? "text-green-400" : "text-yellow-400"}>
              {attendanceMarked ? "Auto Marked PRESENT" : "Not marked yet"}
            </span>
          </p>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="bg-red-500 px-5 py-3 rounded-xl"
        >
          Leave
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-black p-4 rounded-2xl">
          <h2 className="text-green-400 text-xl font-bold mb-3">
            My Camera
          </h2>

          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-[450px] object-cover rounded-xl"
          />
        </div>

        <div className="bg-black p-4 rounded-2xl">
          <h2 className="text-blue-400 text-xl font-bold mb-3">
            Remote User
          </h2>

          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="w-full h-[450px] object-cover rounded-xl"
          />
        </div>
      </div>
    </div>
  );
}

export default VideoSession;