"use client";
import ChatBox from "@/components/ChatBox";

export default function Home() {
  return (
    <div className="flex h-screen items-center justify-center gap-6 p-4 bg-gray-100">
      <ChatBox sender="left" />
      <ChatBox sender="right" />
    </div>
  );
}
