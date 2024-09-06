"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

export function GoogleSignIn() {

  return (
    <div  className="flex flex-col items-center">
      {/* <h1 className="text-5xl font-semibold mb-">Grant Permissions</h1> */}
      <button
        className="bg-white hover:bg-white/85 transition px-3 pr-5 py-2 rounded-[2px] text-black/85 font-semibold text-xl flex items-center"
        onClick={async () => await signIn("google")}
      >
        <Image
          src={
            "https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
          }
          width={38}
          height={38}
          alt="google icon"
        />
        Sign In to Google
      </button>
      <p className="text-sm text-white/80 mt-4">We need Google account access to create Youtube playlist</p>
    </div>
  );
}
