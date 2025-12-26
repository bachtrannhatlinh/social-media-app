"use client";

import {
  CalendarIcon,
  ChartBarIcon,
  FaceSmileIcon,
  MapPinIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import React, { use, useState } from "react";
import { db } from "@/firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAppSelector } from "@/lib/hooks";
import { toast } from "react-toastify";

export default function PostInput() {
  const { username, userId } = useAppSelector((state) => state.userInfo);

  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim()) return;

    if(!username || !userId) {
      return toast.error("You must be logged in to post.");
    }
    
    setLoading(true);
    try {
      await addDoc(collection(db, "posts"), {
        content: text,
        username: username || "Anonymous",
        userId: userId,
        createdAt: serverTimestamp(),
      });
      setText("");
    } catch (error) {
      console.error("Error adding post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex space-x-5 p-3 border-y border-gray-200">
      <Image
        src={"/assets/troll-logo.jpg"}
        alt="Logo"
        className="w-11 h-11"
        width={44}
        height={44}
      />

      <div className="w-full">
        <textarea
          placeholder="What's happening?"
          className="resize-none w-full outline-none min-h-[50px] text-lg"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="flex justify-between pt-5 border-t border-gray-200">
          <div className="flex space-x-1.5">
            <PhotoIcon className="w-[22px] h-[22px] text-[#F4AF01]" />
            <ChartBarIcon className="w-[22px] h-[22px] text-[#F4AF01]" />
            <FaceSmileIcon className="w-[22px] h-[22px] text-[#F4AF01]" />
            <CalendarIcon className="w-[22px] h-[22px] text-[#F4AF01]" />
            <MapPinIcon className="w-[22px] h-[22px] text-[#F4AF01]" />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading || !text.trim()}
            className="bg-[#F4AF81] text-white w-[80px] h-[36px] rounded-full
              text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "..." : "Bumble"}
          </button>
        </div>
      </div>
    </div>
  );
}
