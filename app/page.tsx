"use client";

import PostFeed from "@/components/PostFeed";
import Sidebar from "@/components/Sidebar";
import Widgets from "@/components/Widgets";
import SignUpPrompt from "@/components/SignUpPrompt";
import { useAppSelector } from "@/lib/hooks";

export default function Home() {
  const { username, email } = useAppSelector((state) => state.userInfo);

  return (
    <>
      <main
        className="flex justify-center min-h-screen text-[#0F1419]
    max-w-[1440px] mx-auto"
      >
        <Sidebar username={username} email={email} />
        <PostFeed />
        <Widgets />
      </main>
      {!username ? <SignUpPrompt /> : null}
    </>
  );
}
