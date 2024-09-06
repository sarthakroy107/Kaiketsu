/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { GoogleSignIn } from "../convert/google-signin";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useSpotifyLogin } from "../_providers/context";
import { useEffect } from "react";

export default function Page() {
  const session = useSession();
  const { isSpotifyLoggedIn } = useSpotifyLogin();
  const router = useRouter();
  
  useEffect(() => {
    if (
      session.status === "authenticated" &&
      session.data.user &&
      session.data.user.googleAccessToken
    ) {
      if (isSpotifyLoggedIn) {
        router.push("/convert");
      } else {
        router.push("/spotify");
      }
    }
  }, []);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <GoogleSignIn />
    </div>
  );
}
