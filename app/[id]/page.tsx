"use client";

import ContentCommentOfPost from "@/components/ContentCommentOfPost";
import Sidebar from "@/components/Sidebar";
import { db } from "@/firebase/config";
import { doc, onSnapshot, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

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

const PostDetailPage = () => {
  const params = useParams();
  const id = params.id as string;

  const [post, setPost] = useState<PostData | null>(null);
  const [comments, setComments] = useState<CommentData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const postRef = doc(db, "posts", id);
    const unsubscribePost = onSnapshot(postRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        console.log(data, "data");
        setPost({
          id: snapshot.id,
          content: data.content ?? "",
          userId: data.userId ?? "",
          username: data.username ?? "",
          createdAt: data.createdAt ?? null,
        });
      }
      setLoading(false);
    });

    const commentsRef = collection(db, "posts", id, "comments");
    const unsubscribeComments = onSnapshot(commentsRef, (snapshot) => {
      const commentsData: CommentData[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        console.log(data, "data111");
        return {
          id: doc.id,
          content: data.content ?? "",
          userId: data.userId ?? "",
          username: data.username ?? "",
          createdAt: data.createdAt ?? null,
        };
      });
      console.log(commentsData, "commentdata");
      setComments(commentsData);
    });

    return () => {
      unsubscribePost();
      unsubscribeComments();
    };
  }, [id]);

  if (loading) {
    return (
      <main className="flex justify-center min-h-screen text-[#0F1419] max-w-[1440px] mx-auto">
        <Sidebar />
        <div className="flex items-center justify-center w-[600px]">
          Loading...
        </div>
      </main>
    );
  }

  return (
    <main className="flex justify-center min-h-screen text-[#0F1419] max-w-[1440px] mx-auto">
      <Sidebar />
      <ContentCommentOfPost post={post} comments={comments} postId={id} />
    </main>
  );
};

export default PostDetailPage;
