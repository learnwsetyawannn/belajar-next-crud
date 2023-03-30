"use client";
import { Post } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  post: Post;
}

const Item = ({ post }: Props) => {
  const router = useRouter();
  const handleDelete = async (id: number) => {
    await fetch("/api/post?id=" + id, {
      method: "DELETE",
    });
    router.refresh();
  };

  return (
    <div className="text-base mt-4 w-full shadow-sm border rounded-md p-4">
      <h2 className="font-normal">ID: {post.id}</h2>
      <h1 className="font-normal">{post.title}</h1>
      <p className="font-normal">{post.content}</p>
      <div className="mt-4 space-x-3">
        <button
          onClick={() => router.push(`/update/${post.id}`)}
          className="text-black font-semibold"
        >
          Update
        </button>
        <button
          onClick={() => handleDelete(post.id)}
          className="text-red-500 font-semibold"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Item;
