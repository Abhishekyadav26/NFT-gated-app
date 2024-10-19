"use client";

import { LoginButton } from "../components/LoginButton";


export const GatedContent = () => {
  return (
    <div className="p-4 pb-10 min-h-[100vh] flex flex-col items-center justify-center container max-w-screen-md">
        <LoginButton />
        <p className="mt-4">You have access to gated content.</p>
    </div>
  );
};