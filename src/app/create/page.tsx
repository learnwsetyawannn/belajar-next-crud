"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);
    await fetch("api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
      }),
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    setIsLoading(false);

    router.push("/");
  };

  return (
    <div>
      <form
        className="w-[500px] mx-auto pt-20 flex flex-col gap-2"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Masukan Judul"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded-md"
        />
        <input
          type="text"
          placeholder="Masukan Kontent"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border p-2 rounded-md"
        />
        <button disabled={isLoading} type="submit">
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Page;
