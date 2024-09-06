/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useSpotifyLogin } from "@/app/_providers/context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { RingLoader } from "react-spinners";
import { toast } from "sonner";

export default function Page({
  searchParams,
}: {
  searchParams: { code: string };
}) {
  const router = useRouter();
  const code = searchParams.code;
  const { setSpotifyLoggedIn } = useSpotifyLogin();

  useEffect(() => {
    (async () => {
      if (code) {
        const result = await loginToSpotifyURL(code);
        
        if (result) {
          toast.success("Successfully logged in to Spotify");
          router.push("/convert");
          setSpotifyLoggedIn(true);
        }
      } else {
        toast.error("Code not found");
        router.push("/spotify");
      }
    })();
  }, []);

  return (
    <main className="flex justify-center items-center w-full h-screen">
      <RingLoader color="#fff" size={75} />
    </main>
  );
}

async function loginToSpotifyURL(code: string) {
  const spotifyClientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const spotifyClientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;
  const env = process.env.NEXT_PUBLIC_ENV;
  const spotifyTokenUrl = "https://accounts.spotify.com/api/token";

  const redirectUri = `${
    env === "development" ? "http://localhost:3000" : "https://kaiketsu.online"
  }/spotify/callback`;

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code: code,
    redirect_uri: encodeURI(redirectUri),
    client_id: spotifyClientId!,
    client_secret: spotifyClientSecret!,
  }).toString();

  try {
    const response = await fetch(spotifyTokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " + btoa(spotifyClientId + ":" + spotifyClientSecret),
      },

      body: body,
    });

    return handleAuthorizationResponse(response);
  } catch (error) {
    console.error("Error fetching access token:", error);
    return false;
  }
}

async function handleAuthorizationResponse(response: Response) {
  if (response.ok) {
    const data = await response.json();

    const currentDate = new Date();
    currentDate.setTime(currentDate.getTime() + 1 * 60 * 60 * 1000); // Set token expiration to 1 hour later

    if (data.access_token !== undefined && data.refresh_token !== undefined) {
      const accessToken = data.access_token;
      localStorage.setItem("spotifyAccessToken", accessToken);

      const refreshToken = data.refresh_token;
      localStorage.setItem("spotifyRefreshToken", refreshToken);

      localStorage.setItem("spotifyTokenExpire", currentDate.toString());
    }

    return true;
  } else {
    const errorText = await response.text();
    console.log("Error response:", errorText);
    return false;
  }
}
