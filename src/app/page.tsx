import React from "react";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import Item from "./item";

const prisma = new PrismaClient();

const getPosts = async () => {
  const res = await fetch(process.env.BASE_URL + "/api/post", {
    next: { revalidate: 0 },
  });
  const json = await res.json();
  return json;
};

// const getPostFromDB = async () => {
//   const posts = await prisma.post.findMany({});
//   return posts;
// };

export default async function page() {
  const posts = await getPosts();

  return (
    <div className="max-w-[1200px] mx-auto py-8">
      <Link
        href={"/create"}
        className="bg-black text-zinc-100 px-6 py-2 rounded"
      >
        Create
      </Link>
      <div className="grid grid-cols-2 gap-4">
        {posts?.posts.map((post: any, index: number) => {
          return <Item key={index} post={post} />;
        })}
      </div>
    </div>
  );
}
