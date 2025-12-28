"use client";

import PostFeed from "@/components/PostFeed";
import Sidebar from "@/components/Sidebar";
import Widgets from "@/components/Widgets";
import SignUpPrompt from "@/components/SignUpPrompt";

export default function Home() {
  return (
    <>
      <main
        className="flex justify-center min-h-screen text-[#0F1419]
    max-w-[1440px] mx-auto"
      >
        <Sidebar />
        <PostFeed />
        <Widgets />
      </main>
      <SignUpPrompt />
    </>
  );
}
