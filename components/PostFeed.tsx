"use client";

import React, { useEffect, useState } from "react";
import PostInput from "./PostInput";
import Post from "./Post";
import { db } from "@/firebase/config";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

interface PostData {
  id: string;
  content: string;
  userId: string;
  username: string;
  createdAt: { seconds: number } | null;
}

export default function PostFeed() {
  const [posts, setPosts] = useState<PostData[]>([]);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as PostData[];
      setPosts(postsData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="w-[1000px]">
      <div className="font-bold text-xl pl-3 py-3">Home</div>
      <PostInput />
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
