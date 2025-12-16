'use client'

import PostFeed from "@/components/PostFeed";
import Sidebar from "@/components/Sidebar";
import Widgets from "@/components/Widgets";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { openModal, closeModal } from '@/features/modalAuth/authSlice';
import BasicModal from "@/components/BasicModal";


export default function Home() {
  const { isOpen } = useAppSelector((state) => state.authModal);
  const dispatch = useAppDispatch()

  const handleLogin = () => {
    dispatch(openModal());
  }

  const handleClose = () => {
    dispatch(closeModal());
  }

  return (
    <>
      <BasicModal open={isOpen} handleClose={handleClose}/>
      <main
        className="flex justify-center min-h-screen text-[#0F1419]
    max-w-[1440px] mx-auto"
      >
        <Sidebar />
        <PostFeed />
        <Widgets />
      </main>
      <div className="flex justify-between p-10 border-t mt-2 bg-yellow-400 px-80">
        <div className="text-lg">
          <h1>Welcome to SocialApp</h1>
          <p>Join now and connect with friends!</p>
        </div>
        <div className="space-x-3">
          <button className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">SignUp</button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleLogin}>Login</button>
        </div>
      </div>
    </>
  );
}
