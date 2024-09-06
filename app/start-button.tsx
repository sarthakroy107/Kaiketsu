"use client";
import { useSpotifyLogin } from "./_providers/context";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";

export function StartButton() {
  const { isSpotifyLoggedIn } = useSpotifyLogin();
  const session = useSession();

  useEffect(() => {}, [isSpotifyLoggedIn, session]);
  return (
    <Link
      href={"/google"}
      className="bg-[#5b21b6] hover:bg-[#572b9e] transition w-48 p-2 rounded-[3px] text-xl font-medium "
    >
      {session.status === "authenticated" &&
      session.data.user &&
      session.data.user.googleAccessToken &&
      isSpotifyLoggedIn
        ? "Convert"
        : "Get started"}
    </Link>
  );
}
