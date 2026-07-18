import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import API from "../api/api";

function RoomChat() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const stompRef = useRef(null);
  const bottomRef = useRef(null);

  const studentId = localStorage.getItem("studentId");
  const teacherId = localStorage.getItem("teacherId");

  const senderId = studentId || teacherId || 0;
  const senderName =
    localStorage.getItem("studentName") ||
    localStorage.getItem("teacherName") ||
    "User";

  const senderRole = studentId ? "STUDENT" : "TEACHER";

  const loadOldMessages = async () => {
    try {
      const res = await API.get(`/chat/room/${roomId}`);
      setMessages(res.data);
    } catch (err) {
      console.log("Old messages load failed", err);
    }
  };

  useEffect(() => {
    loadOldMessages();

    const socket = new SockJS("http://localhost:8080/chat");

    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,

      onConnect: () => {
        console.log("✅ Chat connected successfully");

        client.subscribe(`/topic/room/${roomId}`, (msg) => {
          const newMessage = JSON.parse(msg.body);
          console.log("Received:", newMessage);

          setMessages((prev) => [...prev, newMessage]);
        });
      },

      onStompError: (frame) => {
        console.log("STOMP Error:", frame);
      },

      onWebSocketError: (error) => {
        console.log("WebSocket Error:", error);
      },

      onDisconnect: () => {
        console.log("Disconnected");
      },
    });

    client.activate();
    stompRef.current = client;

    return () => {
      client.deactivate();
    };
  }, [roomId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!text.trim()) return;

    if (!stompRef.current || !stompRef.current.connected) {
      alert("Chat server not connected yet. Please wait.");
      return;
    }

    const message = {
      roomId: Number(roomId),
      senderId: Number(senderId),
      senderName,
      senderRole,
      messageContent: text,
    };

    stompRef.current.publish({
      destination: `/app/chat.send/${roomId}`,
      body: JSON.stringify(message),
    });

    setText("");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex justify-center items-center p-6">
      <div className="w-full max-w-4xl bg-slate-900 rounded-3xl border border-slate-700 shadow-2xl overflow-hidden">
        <div className="bg-slate-800 p-5 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-blue-400">
              FocusHub Room Chat
            </h1>
            <p className="text-gray-400">Room ID: {roomId}</p>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="bg-red-500 px-5 py-3 rounded-xl"
          >
            Back
          </button>
        </div>

        <div className="h-[500px] overflow-y-auto p-6 space-y-4">
          {messages.length === 0 ? (
            <p className="text-center text-gray-500 mt-20">
              No messages yet. Start conversation.
            </p>
          ) : (
            messages.map((m) => {
              const isMe = Number(m.senderId) === Number(senderId);

              return (
                <div
                  key={m.messageId || Math.random()}
                  className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-md p-4 rounded-2xl ${
                      isMe
                        ? "bg-blue-600 text-white"
                        : "bg-slate-800 text-gray-100"
                    }`}
                  >
                    <p className="text-sm font-bold mb-1">
                      {m.senderName}{" "}
                      <span className="text-xs opacity-70">
                        ({m.senderRole})
                      </span>
                    </p>

                    <p>{m.messageContent}</p>

                    <p className="text-xs opacity-60 mt-2">
                      {m.sentAt ? new Date(m.sentAt).toLocaleString() : ""}
                    </p>
                  </div>
                </div>
              );
            })
          )}

          <div ref={bottomRef}></div>
        </div>

        <div className="p-5 bg-slate-800 flex gap-3">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your message..."
            className="flex-1 bg-slate-900 p-4 rounded-xl outline-none border border-slate-700"
          />

          <button
            onClick={sendMessage}
            className="bg-blue-500 hover:bg-blue-600 px-8 rounded-xl font-bold"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoomChat;