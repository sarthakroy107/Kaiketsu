"use server";

import { auth } from "@/auth";
import { YTVideo } from "./convert/column-def";

export async function createPlaylist(playlistName: string) {
  const session = await auth();
  // console.log(session);
  // console.log("Creating playlist");

  const accessToken = session?.user.googleAccessToken;

  if (!accessToken) {
    console.log("No access token");
    return;
  }

  const res = await fetch(
    "https://www.googleapis.com/youtube/v3/playlists?part=snippet,status",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        snippet: {
          title: playlistName,
        },
        status: {
          privacyStatus: "public",
        },
      }),
    }
  );

  if (!res.ok) {
    const error = await res.json();
    console.error("Error creating playlist:", error);
    return;
  }

  const playlist = await res.json();
  console.log("Playlist created successfully:", playlist);
  return playlist.id;
}

export async function addTracksToPlaylist(tracks: YTVideo[], playlistId: string) {
  // const demoTracks = ["TJBh_hj6DzE", "lzMkFIw8ETM"]
  tracks.forEach(async (track) => {
    const videoId = track.videoId;

    await addTrackToPlaylist(videoId, playlistId);
  });
  // demoTracks.forEach(async (videoId) => {
  //   await addTrackToPlaylist(videoId, playlistId);
  // });
}

export async function addTrackToPlaylist(videoId: string, playlistId: string) {
  const session = await auth();
  console.log(session);
  console.log("Adding track to playlist");

  const accessToken = session?.user.googleAccessToken;

  if (!accessToken) {
    console.log("No access token");
    return;
  }

  const maxRetries = 5;
  let retryCount = 0;
  let backoffTime = 1000; // Start with 1 second

  while (retryCount < maxRetries) {
    try {
      const res = await fetch(
        "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            snippet: {
              playlistId,
              resourceId: {
                kind: "youtube#video",
                videoId: videoId,
              },
            },
          }),
        }
      );

      if (res.ok) {
        const playlist = await res.json();
        console.log("Track added to playlist successfully:", playlist);
        return playlist; // Successfully added track, exit function
      } else {
        const error = await res.json();
        console.error("Error adding track to playlist:", error);
        console.log("---------------------");
        console.log(error);
        console.log("---------------------");
        console.log(error.errors);
        console.log("---------------------");
        console.log(error.error);

        // Throw error to handle in catch block
        throw error;
      }
    } catch (err) {
      console.log(
        `Attempt ${retryCount + 1} failed. Retrying in ${
          backoffTime / 1000
        } seconds...`
      );
      retryCount += 1;
      await new Promise((r) => setTimeout(r, backoffTime));
      backoffTime *= 2; // Exponential backoff
    }
  }

  console.log("Max retries reached. Could not add track to playlist.");
}
