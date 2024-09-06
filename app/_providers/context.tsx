"use client";

import { createContext, useContext, useEffect, useState } from "react";

const SpotifyLoginContext = createContext<
  | {
      isSpotifyLoggedIn: boolean | null;
      setSpotifyLoggedIn: React.Dispatch<React.SetStateAction<boolean | null>>;
    }
  | undefined
>(undefined);

export function SpotifyLoginProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSpotifyLoggedIn, setSpotifyLoggedIn] = useState<boolean | null>(
    null
  );

  useEffect(() => {
    if (
      localStorage.getItem("spotifyAccessToken") &&
      localStorage.getItem("spotifyRefreshToken") &&
      localStorage.getItem("spotifyTokenExpire")
    ) {
      setSpotifyLoggedIn(true);
    } else {
      setSpotifyLoggedIn(false);
    }
  }, []);

  return (
    <SpotifyLoginContext.Provider
      value={{ isSpotifyLoggedIn: isSpotifyLoggedIn, setSpotifyLoggedIn }}
    >
      {children}
    </SpotifyLoginContext.Provider>
  );
}

export function useSpotifyLogin() {
  const context = useContext(SpotifyLoginContext);
  if (!context) {
    throw new Error(
      "useSpotifyLogin must be used within a SpotifyLoginProvider"
    );
  }
  return context;
}
