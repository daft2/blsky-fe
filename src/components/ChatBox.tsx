"use client";
import { useEffect, useRef, useState } from "react";

interface Message {
  sender: "left" | "right";
  text: string;
}

const STORAGE_KEY = "chatMessages";

const ChatBox = ({ sender }: { sender: "left" | "right" }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [flash, setFlash] = useState(false);
  const ws = useRef<WebSocket | null>(null);
  const chatRef = useRef<HTMLDivElement | null>(null);

  // Retrieve stored messages on initial render
  useEffect(() => {
    const storedMessages = localStorage.getItem(STORAGE_KEY);
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  // Set up WebSocket connection and message handling
  useEffect(() => {
    if (!ws.current) {
      ws.current = new WebSocket("ws://localhost:4000");

      ws.current.onmessage = (event) => {
        const newMessage: Message = JSON.parse(event.data);

        // Prevent adding the message from the current sender (to avoid duplication)
        if (newMessage.sender !== sender) {
          setMessages((prev) => {
            const updatedMessages = [...prev, newMessage];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMessages));
            return updatedMessages;
          });

          setFlash(true);
          setTimeout(() => setFlash(false), 500);
        }
      };

      ws.current.onclose = () => {
        ws.current = null;
      };
    }

    return () => {
      ws.current?.close();
    };
  }, [sender]); // Make sure the effect runs when `sender` changes

  // Scroll to bottom of the chat on new messages
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle sending messages
  const sendMessage = () => {
    if (input.trim() && ws.current) {
      const messageData = { sender, text: input };
      ws.current.send(JSON.stringify(messageData));

      setMessages((prev) => {
        const updatedMessages = [...prev, messageData];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMessages));
        return updatedMessages;
      });

      setInput("");
    }
  };

  return (
    <div
      className={`w-1/2 flex flex-col rounded-xl shadow-lg border p-4  ${
        flash ? "animate-[flash_0.5s]" : ""
      } ${sender === "left" ? "bg-green-200" : "bg-blue-200"}`}
    >
      {/* Chat history */}
      <div
        ref={chatRef}
        className="flex flex-col overflow-y-auto p-3 relative space-y-2 max-h-[400px] border rounded-lg bg-white"
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex p-2 rounded-lg max-w-[75%] text-black ${
              msg.sender === sender
                ? "text-right self-end"
                : "text-left self-start"
            } ${msg.sender === "left" ? "bg-green-300" : "bg-blue-300"}`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input box */}
      <div className="flex mt-2 border p-2 rounded-lg bg-white">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 rounded-lg outline-none text-black"
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
