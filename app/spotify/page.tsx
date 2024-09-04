/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useRouter } from "next/navigation";
import { SiSpotify } from "@icons-pack/react-simple-icons";
import { useEffect } from "react";

const Page = () => {
  const router = useRouter();
  const url = loginToSpotifyURL();

  useEffect(() => {
    const accessToken = localStorage.getItem("spotifyAccessToken");
    if (accessToken) {
      router.push("/convert");
    }
  }, [])

  return (
    <main className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col items-center">
        {/* <h1 className="text-5xl font-semibold mb-">Grant Permissions</h1> */}
        <button
          onClick={() => router.push(url)}
          className="bg-[#1ed760] flex items-center px-4 py-2 gap-x-2 m-1 p-1 rounded-full text-xl font-semibold"
        >
          <SiSpotify />
          Sign in with Spotify
        </button>
        <p className="text-sm text-white/80 mt-4">
          We need Spotify account access to create Youtube playlist
        </p>
      </div>
    </main>
  );
};

function loginToSpotifyURL() {
  console.log("loginToSpotify");
  const authUrl = "https://accounts.spotify.com/authorize";
  const spotifyClientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const env = process.env.NEXT_PUBLIC_ENV;

  const scopes = [
    "playlist-read-private",
    "playlist-read-collaborative",
    "playlist-modify-private",
    "playlist-modify-public",
  ].join(",");

  const url = `${authUrl}?client_id=${spotifyClientId}&response_type=code&redirect_uri=${
    env === "development" ? "http://localhost:3000" : "https://example.com"
  }/spotify/callback&scope=${scopes}`;

  return url;
}

export default Page;
