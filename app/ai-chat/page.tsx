"use client";

import { useEffect, useState } from "react";

export default function AIChatPage() {

  const [message, setMessage] =
    useState("");

  const [reply, setReply] =
    useState("");

  const [history, setHistory] =
    useState<any[]>([]);

  const sendMessage = async () => {

    const res = await fetch(
      "http://localhost:5000/api/ai/chat",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${localStorage.getItem("token")}`,
        },

        body: JSON.stringify({
          message,
        }),
      }
    );

    const data = await res.json();

    setReply(data.reply);

    fetchHistory();
  };

  const fetchHistory = async () => {

    const res = await fetch(
      "http://localhost:5000/api/ai/history",
      {
        headers: {
          Authorization:
            `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const data = await res.json();

    setHistory(data.chats);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (

    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        AI Medical Chat
      </h1>

      <input
        type="text"
        placeholder="Enter symptoms"

        className="border p-3 w-full"

        value={message}

        onChange={(e) =>
          setMessage(e.target.value)
        }
      />

      <button
        onClick={sendMessage}

        className="bg-blue-500 text-white px-6 py-3 mt-4"
      >
        Ask AI
      </button>

      {reply && (

        <div className="mt-6 p-4 border">

          <h2 className="font-bold">
            AI Response:
          </h2>

          <p>{reply}</p>

        </div>
      )}

      <h2 className="text-2xl font-bold mt-10 mb-4">
        Chat History
      </h2>

      <div className="space-y-4">

        {history.map((chat) => (

          <div
            key={chat._id}

            className="border p-4 rounded"
          >

            <p>
              <strong>You:</strong>
              {" "}
              {chat.message}
            </p>

            <p className="mt-2">
              <strong>AI:</strong>
              {" "}
              {chat.reply}
            </p>

          </div>
        ))}
      </div>
    </div>
  );
}