"use client";
import signOutFirebase from "../firebase/auth/signout";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <div
        style={{
          position: "sticky",
          top: 0,
        }}
        className="flex justify-between items-center "
      >
        <h1 className="flex text-black  p-2 justify-center">Chat GPT</h1>
        <button
          style={{ width: 100 }}
          className="border-black border-solid text-white bg-black  p-2 rounded flex justify-center m-4"
          onClick={() => {
            signOutFirebase();
          }}
        >
          Sign out
        </button>
      </div>
      {children}
    </div>
  );
}
