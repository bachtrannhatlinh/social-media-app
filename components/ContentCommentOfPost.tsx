"use client";

import {
  ArrowLeftIcon,
  CalendarIcon,
  ChartBarIcon,
  FaceSmileIcon,
  MapPinIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { FiShare } from "react-icons/fi";
import { IoStatsChart } from "react-icons/io5";
import { useAppSelector } from "@/lib/hooks";
import { db } from "@/firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";

interface PostData {
  id: string;
  content: string;
  userId: string;
  username: string;
  createdAt: { seconds: number } | null;
}

interface CommentData {
  id: string;
  content: string;
  userId: string;
  username: string;
  createdAt: { seconds: number } | null;
}

interface ContentCommentOfPostProps {
  post: PostData | null;
  comments: CommentData[];
  postId: string;
}

function formatTimeAgo(seconds: number): string {
  const now = Date.now() / 1000;
  const diff = now - seconds;

  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

const ContentCommentOfPost = ({ post, comments, postId }: ContentCommentOfPostProps) => {
  const { username, userId } = useAppSelector((state) => state.userInfo);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddComment = async () => {
    if (!commentText.trim()) return;

    if (!username || !userId) {
      return toast.error("You must be logged in to comment.");
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "posts", postId, "comments"), {
        content: commentText,
        username,
        userId,
        createdAt: serverTimestamp(),
      });
      setCommentText("");
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Failed to add comment.");
    } finally {
      setLoading(false);
    }
  };

  if (!post) {
    return (
      <div className="border-r w-[600px]">
        <div className="flex flex-row items-center space-x-10 p-3">
          <Link href="/">
            <ArrowLeftIcon className="w-[22px] h-[22px]" />
          </Link>
          <span className="font-bold text-xl">Post not found</span>
        </div>
      </div>
    );
  }

  const postTimeAgo = post.createdAt ? formatTimeAgo(post.createdAt.seconds) : "just now";

  return (
    <div className="border-r w-[600px]">
      <div className="flex flex-row items-center space-x-10 p-3">
        <Link href="/">
          <ArrowLeftIcon className="w-[22px] h-[22px]" />
        </Link>
        <span className="font-bold text-xl">Bumble</span>
      </div>

      {/* Post Content */}
      <div className="flex flex-col space-y-3 border-y border-gray-200 p-3">
        <div className="flex justify-between">
          <div className="flex space-x-3">
            <Image
              src={"/assets/troll-logo.jpg"}
              alt="Avatar"
              width={44}
              height={44}
              className="w-11 h-11 rounded-full"
            />
            <div>
              <div className="font-bold text-[#0F1419]">{post.username}</div>
              <div className="text-[#707E89] text-sm">{postTimeAgo}</div>
            </div>
          </div>
        </div>
        <div className="font-normal text-base">{post.content}</div>
      </div>

      <div className="flex flex-row space-x-3 items-center p-3 border-b border-gray-200">
        <span className="font-bold text-lg">{comments.length}</span>
        <span className="font-normal text-sm">Comments</span>
      </div>

      {/* Add Comment Input */}
      <div className="flex space-x-3 p-3 border-b border-gray-200">
        <Image
          src={"/assets/troll-logo.jpg"}
          alt="Avatar"
          width={44}
          height={44}
          className="w-11 h-11 rounded-full"
        />
        <div className="flex-1">
          <textarea
            placeholder="Write a comment..."
            className="resize-none w-full outline-none min-h-[50px] text-base"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <div className="flex justify-between pt-3 border-t border-gray-200">
            <div className="flex space-x-1.5">
              <PhotoIcon className="w-[22px] h-[22px] text-[#F4AF01]" />
              <ChartBarIcon className="w-[22px] h-[22px] text-[#F4AF01]" />
              <FaceSmileIcon className="w-[22px] h-[22px] text-[#F4AF01]" />
              <CalendarIcon className="w-[22px] h-[22px] text-[#F4AF01]" />
              <MapPinIcon className="w-[22px] h-[22px] text-[#F4AF01]" />
            </div>
            <button
              onClick={handleAddComment}
              disabled={loading || !commentText.trim()}
              className="bg-[#F4AF81] text-white px-4 py-1.5 rounded-full text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "..." : "Reply"}
            </button>
          </div>
        </div>
      </div>

      {/* Comments List */}
      {comments.map((comment) => {
        const commentTimeAgo = comment.createdAt
          ? formatTimeAgo(comment.createdAt.seconds)
          : "just now";

        return (
          <div key={comment.id} className="border-b border-gray-200">
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
                  <span className="font-bold text-[#0F1419] inline-block whitespace-nowrap overflow-hidden text-ellipsis max-w-[100px] sm:max-w-[160px]">
                    {comment.username}
                  </span>
                  <span>·</span>
                  <span className="whitespace-nowrap">{commentTimeAgo}</span>
                </div>
                <p className="mt-1 text-[#0F1419]">{comment.content}</p>
                <div className="flex justify-between mt-3 max-w-[400px] text-[#707E89]">
                  <div className="flex items-center space-x-2 cursor-pointer hover:text-blue-500 group">
                    <FaRegComment className="w-4 h-4" />
                  </div>
                  <div className="flex items-center space-x-2 cursor-pointer hover:text-red-500 group">
                    <AiOutlineHeart className="w-4 h-4" />
                  </div>
                  <div className="flex items-center space-x-2 cursor-pointer hover:text-blue-500 group">
                    <IoStatsChart className="w-4 h-4" />
                  </div>
                  <button className="flex items-center space-x-2 cursor-pointer hover:text-blue-500 group">
                    <FiShare className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {comments.length === 0 && (
        <div className="p-6 text-center text-[#707E89]">
          No comments yet. Be the first to comment!
        </div>
      )}
    </div>
  );
};

export default ContentCommentOfPost;
