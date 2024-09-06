/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { SiGithub, SiGoogle, SiSpotify } from "@icons-pack/react-simple-icons";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LucideEllipsisVertical } from "lucide-react";
import { useSpotifyLogin } from "@/app/_providers/context";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";

export function Navbar() {
  return (
    <nav className="w-full h-16 bg-[#0b0b0b] backdrop:blur-[50px] fixed top-0 flex justify-between items-center border-b border-1 border-white/10">
      <Link href={"/"} title="Home">
        <Image
          src="/kaiketsu.svg"
          alt="Logo"
          width={150}
          height={150}
          className="ml-7"
        />
      </Link>
      <div className="mr-10 flex items-center gap-x-2">
        <Link
          href={"https://github.com/sarthakroy107/kaiketsu"}
          target="_blank"
        >
          <div
            title="Github"
            className="group p-2 hover:bg-white/10 backdrop:blur-sm rounded-sm transition"
          >
            <SiGithub
              className="text-white/80 group-hover:text-white/100 cursor-pointer"
              size={30}
            />
          </div>
        </Link>
        <MobileViewButton />
        <div className="hidden md:block">
          <GoogleButton />
        </div>
        <div className="hidden md:block">
          <SpotifyButton />
        </div>
      </div>
    </nav>
  );
}

function MobileViewButton() {
  return (
    <Popover>
      <PopoverTrigger className="block md:hidden group p-2 hover:bg-white/10 backdrop:blur-sm rounded-sm transition">
        <LucideEllipsisVertical
          size={25}
          className="text-white/80 group-hover:text-white/100 cursor-pointer"
        />
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col gap-y-2 p-2">
          <GoogleButton />
          <SpotifyButton />
        </div>
      </PopoverContent>
    </Popover>
  );
}
function GoogleButton() {
  const session = useSession();

  useEffect(() => {}, [session]);
  return (
    <>
      {session.status === "authenticated" && session.data.user ? (
        <button
          title="Sign out from Google"
          onClick={() => signOut()}
          className="flex items-center gap-x-2 bg-white/80 text-black hover:text-red-500 px-3 py-1.5 font-semibold h-fit rounded-full hover:bg-white transition"
        >
          <SiGoogle size={16} />
          Sign out
        </button>
      ) : (
        <Link href={"/google"} title="Sign in to Google">
          <div className="flex items-center gap-x-2 bg-white/80 text-black hover:text-[#5b21b6] px-3 py-1.5 font-semibold h-fit rounded-full hover:bg-white transition">
            <SiGoogle size={16} />
            Sign In
          </div>
        </Link>
      )}
    </>
  );
}

function SpotifyButton() {
  const { isSpotifyLoggedIn, setSpotifyLoggedIn } = useSpotifyLogin();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname === "/convert" && !isSpotifyLoggedIn) {
      router.push("/");
    }
  }, [isSpotifyLoggedIn]);
  return (
    <>
      {isSpotifyLoggedIn ? (
        <button
          title="Sign out from Spotify"
          onClick={() => {
            signOutFromSpotify();
            toast.success("Successfully signed out from Spotify");
            setSpotifyLoggedIn(false);
          }}
          className="bg-transparent hover:bg-[#1ed760] border border-[#1ed760] flex items-center px-4 text-[#1ed760] hover:text-red-500 py-1.5 gap-x-2 rounded-full font-semibold transition"
        >
          <SiSpotify size={20} />
          Sign out
        </button>
      ) : (
        <Link title="Sign in to Spotify" href={"/spotify"}>
          <div className="bg-transparent hover:bg-[#1ed760] border border-[#1ed760] flex items-center px-4 text-[#1ed760] hover:text-white py-1.5 gap-x-2 rounded-full font-semibold transition">
            <SiSpotify size={20} />
            Sign in
          </div>
        </Link>
      )}
    </>
  );
}

function signOutFromSpotify() {
  localStorage.removeItem("spotifyAccessToken");
  localStorage.removeItem("spotifyRefreshToken");
  localStorage.removeItem("spotifyTokenExpire");
}
