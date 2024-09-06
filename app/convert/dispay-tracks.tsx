"use client";

import { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { colums, YTVideo } from "./column-def";

export function DisplayTracks({ tracks }: { tracks: any[] }) {
  const googleAPIKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  const [YTTracks, setYTTracks] = useState<YTVideo[] | null>(null);

  useEffect(() => {
    if (!tracks || tracks.length === 0 || !googleAPIKey) {
      return;
    }
    console.log(tracks);
    console.log("Brum brum");

    const fetchTracks = async () => {
      try {
        // Use Promise.all to wait for all fetch operations to complete
        const fetchPromises = tracks.map(async (track) => {
          const searchURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${track.track.name} ${track.track.artists[0].name}&key=${googleAPIKey}`;
          const response = await fetch(searchURL);
          const data = await response.json();

          return data.items[0];
        });

        const spotifyTracks = await Promise.all(fetchPromises);
        console.log(spotifyTracks);

        setYTTracks(
          spotifyTracks.map((track) => {
            return {
              videoId: track.id.videoId,
              title: track.snippet.title,
              thumbnail: track.snippet.thumbnails.high.url,
              channelTitle: track.snippet.channelTitle,
              channelUrl: `https://www.youtube.com/channel/${track.snippet.channelId}`,
            } satisfies YTVideo;
          })
        );
        //setYTTracks(videos);
      } catch (error) {
        console.error("Error fetching YouTube data:", error);
      }
    };

    fetchTracks();
  }, [tracks, googleAPIKey]);

  useEffect(() => {
    console.log("In all tracks use effect");
  }, [YTTracks]);

  return (
    <>{YTTracks && <DataTable columns={colums} data={YTTracks} />}</>
  );
}
