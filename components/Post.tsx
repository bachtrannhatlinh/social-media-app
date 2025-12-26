import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaRegComment } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { IoStatsChart } from "react-icons/io5";
import { FiShare } from "react-icons/fi";
import { useAppDispatch } from "@/lib/hooks";
import { openReplyCommentModal } from "@/features/replyCommentModal/replyCommentSlice";
import ReplyCommentModal from "./Modals/ReplyCommentModal";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/config";

interface PostProps {
  post: {
    id: string;
    content: string;
    userId: string;
    username: string;
    createdAt: { seconds: number } | null;
  };
}

function formatTimeAgo(seconds: number): string {
  const now = Date.now() / 1000;
  const diff = now - seconds;

  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function Post({ post }: PostProps) {
  const dispatch = useAppDispatch();
  const [commentCount, setCommentCount] = useState(0);
  const timeAgo = post.createdAt
    ? formatTimeAgo(post.createdAt.seconds)
    : "just now";

  useEffect(() => {
    const q = query(
      collection(db, "comments"),
      where("parentCommentId", "==", post.id)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setCommentCount(snapshot.size);
    });
    return () => unsubscribe();
  }, [post.id]);

  const handleReplyComment = () => {
    dispatch(openReplyCommentModal({
      commentId: post.id,
      userId: post.userId,
      username: post.username,
      displayName: post.username,
      content: post.content,
    }));
  };

  return (
    <>
      <ReplyCommentModal />
      <div className="border-b border-gray-200">
        <div className="flex p-3 space-x-3">
          <Image
            src={"/assets/troll-logo.jpg"}
            alt="Avatar"
            width={44}
            height={44}
            className="w-11 h-11 rounded-full"
          />
          <div className="flex-1 text-[15px]">
            <div className="flex items-center space-x-1 text-[#707E89]">
              <span
                className="font-bold text-[#0F1419] 
              inline-block whitespace-nowrap overflow-hidden text-ellipsis
              max-w-[100px] sm:max-w-[160px]
            "
              >
                {post.username}
              </span>
              <span
                className="whitespace-nowrap inline-block overflow-hidden text-ellipsis
              max-w-[100px] sm:max-w-[160px]"
              >
                {post.username}
              </span>
              <span>·</span>
              <span className="whitespace-nowrap">{timeAgo}</span>
            </div>
            <p className="mt-1 text-[#0F1419]">{post.content}</p>
            <div className="flex justify-between mt-3 max-w-[400px] text-[#707E89]">
              <button
                className="flex items-center space-x-2 cursor-pointer hover:text-blue-500 group"
                onClick={handleReplyComment}
              >
                <FaRegComment className="w-4 h-4" />
                <span className="text-sm">{commentCount}</span>
              </button>
              <div className="flex items-center space-x-2 cursor-pointer hover:text-red-500 group">
                <AiOutlineHeart className="w-4 h-4" />
                <span className="text-sm">0</span>
              </div>
              <div className="flex items-center space-x-2 cursor-pointer hover:text-blue-500 group">
                <IoStatsChart className="w-4 h-4" />
              </div>
              <div className="flex items-center cursor-pointer hover:text-blue-500 group">
                <FiShare className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
