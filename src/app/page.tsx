"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="flex flex-row items-center justify-center w-full">
          HI to explore with AI Assistant switch to
          <button
            className="text-indigo-500 ml-2"
            onClick={() => router.push("/chat")}
          >
            CHAT WITH AI
          </button>
        </div>
      </main>
    </>
  );
}
