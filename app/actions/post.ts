"use server";

import { db } from "@/firebase/config";
import { collection, addDoc, serverTimestamp, updateDoc, doc, deleteDoc } from "firebase/firestore";

export async function createPost(content: string, username: string, userId: string) {
  if (!content.trim()) {
    throw new Error("Post content cannot be empty.");
  } 
  const docRef = await addDoc(collection(db, "posts"), {
    content,
    username: username || "Anonymous",
    userId,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updatePost(content: string, userId: string) {
  if (!content.trim()) {
    throw new Error("Post content cannot be empty.");
  } 
  const postRef = doc(db, "posts", userId);
  const updateDocId = await updateDoc(postRef, {
    content,
  });
  return updateDocId;
    
}

export async function deletePost(postId: string) {
  const postRef = doc(db, "posts", postId);
  return await deleteDoc(postRef);
}