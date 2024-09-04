"use client";
import { FormEventHandler, useEffect, useState } from "react";
import { DisplayTracks } from "./dispay-tracks";
import { LucideSearch } from "lucide-react";
import { toast } from "sonner";
export default function Page() {
  const [playlistURL, setPlaylistURL] = useState<string>("");
  const [tracks, setTracks] = useState<any[] | null>(null);

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
          toast.error("Error fetching playlist 1");
        }
        return await response.json();
      })
      .then((data: any) => {
        console.log(data);
        if (!data.items) {
          toast.error("Error fetching playlist 2");
          return;
        }
        setTracks(data.items);
      });
  };

  useEffect(() => {}, [tracks]);

  return (
    <main className="min-h-screen w-full flex justify-center items-center">
      <div className="flex flex-col items-center mt-36 mb-20">
        <h1 className="text-5xl font-semibold mb-12">Convert playlist</h1>
        <form className="flex items-center mb-6" onSubmit={fetchTracks}>
          <input
            type="text"
            className="h-10 w-[400px] rounded-l-full pl-5 pr-1 bg-[#1f1f1f] focus:outline-none text-white"
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
//https://open.spotify.com/playlist/37i9dQZF1EpotQ7qohgqYx?si=94e69ac58dac46ac
