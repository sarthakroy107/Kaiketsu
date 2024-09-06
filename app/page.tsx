import Link from "next/link";
import "./stars.css";
import React from "react";
import { Youtube } from "lucide-react"

// interface CustomCSSProperties extends React.CSSProperties {
//   "--i"?: number;
// }

export default async function Page() {
  return (
    <main className="w-full h-screen flex justify-center items-center text-white">
      <div className="text-center">
        <h1 className="text-6xl md:text-6xl lg:text-8xl font-semibold">Kaiketsu</h1>
        <p className="text-base md:text-xl font-medium my-2 text-white/75">
          Convert Spotify playlist to Youtube playlist
        </p>
        <div className="flex flex-col md:flex-row gap-y-2 md:gap-y-0 md:gap-x-2 items-center md:justify-center mt-4 px-3">
          <Link
            href={"/google"}
            className="bg-[#5b21b6] hover:bg-[#572b9e] transition w-48 p-2 rounded-[3px] text-xl font-medium "
          >
            Get Started
          </Link>
          <Link
            target="_blank"
            href={"https://youtu.be/qN07H2KISEM?si=_A4m269IqvNHBBfa"}
            className="bg-[#ff0000] w-48 rounded-[3px] text-xl font-medium p-2 flex items-center justify-center"
          >
            <Youtube size={24} className="inline-block mr-2" />
            Demo video
          </Link>
        </div>
      </div>
    </main>
  );
}
