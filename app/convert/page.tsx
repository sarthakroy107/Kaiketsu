"use client";

import { FormEventHandler, useEffect, useState } from "react";
import { DisplayTracks } from "./dispay-tracks";
import { LucideSearch } from "lucide-react";
import { toast } from "sonner";
import { usePostHog } from "posthog-js/react";

export default function Page() {
  const [playlistURL, setPlaylistURL] = useState<string>("");
  const [tracks, setTracks] = useState<any[] | null>(null);
  const posthog = usePostHog();

  const fetchTracks: FormEventHandler<HTMLFormElement> = async (e) => {

    e.preventDefault();

    if (
      playlistURL.length === 0 ||
      !playlistURL.includes("spotify") ||
      !playlistURL.includes("playlist")
    ) {
      return;
    }

    const spotifyURL = `https://api.spotify.com/v1/playlists/${playlistURL.substring(
      playlistURL.indexOf("playlist/") + 9,
      playlistURL.indexOf("?")
    )}/tracks`;

    const spotifyAccerssToken = localStorage.getItem("spotifyAccessToken");

    if (!spotifyAccerssToken) {
      console.log("No access token");
      return;
    }

    fetch(spotifyURL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${spotifyAccerssToken}`,
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          posthog.capture("Error fetching playlist 1 from spotify", { response: response });
          toast.error("Error fetching playlist 1");
        }
        return await response.json();
      })
      .then((data: any) => {
        console.log(data);
        if (!data.items) {
          posthog.capture("Error fetching playlist 2", { data: data });
          toast.error("Error fetching playlist 2");

          return;
        }
        setTracks(data.items);
        posthog.capture("Spotify playlist fetched successfully", { playlistURL: playlistURL });
      });
  };

  useEffect(() => {}, [tracks]);

  return (
    <main className="w-full">
      <div className="max-w-full flex flex-col items-center mt-40">
        <h1 className="text-4xl g:text-5xl font-semibold mb-12">Convert playlist</h1>
        <form className="flex items-center mb-6" onSubmit={fetchTracks}>
          <input
            type="text"
            placeholder="Space your spotify url link here"
            className="h-10 w-[300px] lg:w-[400px] rounded-l-full pl-5 pr-1 bg-[#1f1f1f] focus:outline-none text-white placeholder:text-slate-400/40"
            onChange={(e) => setPlaylistURL(e.target.value)}
          />
          <button
            disabled={
              playlistURL.length === 0 ||
              !playlistURL.includes("spotify") ||
              !playlistURL.includes("playlist")
            }
            title="Search"
            type="submit"
            className="bg-slate-400/30 h-10 pl-3 pr-4 rounded-r-full disabled:cursor-not-allowed disabled:text-white/60"
          >
            <LucideSearch />
          </button>
        </form>
        {tracks && <DisplayTracks tracks={tracks} />}
      </div>
    </main>
  );
}