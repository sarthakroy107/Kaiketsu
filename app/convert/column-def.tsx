import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { SiYoutube } from "@icons-pack/react-simple-icons";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";

export type YTVideo = {
  videoId: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
  channelUrl: string;
};

export const colums: ColumnDef<YTVideo>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),

    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "thumbnail",
    header: "Thumbnail",
    cell: ({ row }) => {
      return (
        <Image
          src={row.getValue("thumbnail")}
          width={100}
          height={100}
          alt="Thumbnail"
        />
      );
    },
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "channelTitle",
    header: "Channel Title",
    cell: ({ row }) => {
      return (
        <Link
          target="_blank"
          className="hover:underline hover:text-blue-500"
          href={row.getValue("channelUrl")}
        >
          {row.getValue("channelTitle")}
        </Link>
      );
    },
  },
  {
    accessorKey: "channelUrl",
    header: "watch",
    cell: ({ row }) => {
      return (
        <Dialog>
          <DialogTrigger>
            <button className="hover:text-[#ff0000] transition p-1 m-1">
              <SiYoutube />
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl flex justify-center bg-[#1f1f1f] border-black">
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${row.getValue("videoId")}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </DialogContent>
        </Dialog>
      );
    },
  },
];

export const videos: YTVideo[] = [
  {
    videoId: "RKAzrZWJQXA",
    title: "2WORLDS // Madge x VALORANT - Official Audio",
    thumbnail: "https://i.ytimg.com/vi/RKAzrZWJQXA/hqdefault.jpg",
    channelTitle: "VALORANT",
    channelUrl: "https://www.youtube.com/channel/UC8CX0LD98EDXl4UYX1MDCXg",
  },
  {
    videoId: "TJBh_hj6DzE",
    title: "Porter Robinson - Look at the Sky (Official Music Video)",
    thumbnail: "https://i.ytimg.com/vi/TJBh_hj6DzE/hqdefault.jpg",
    channelTitle: "Porter Robinson",
    channelUrl: "https://www.youtube.com/channel/UCKKKYE55BVswHgKihx5YXew",
  },
  {
    videoId: "RKAzrZWJQXA",
    title: "2WORLDS // Madge x VALORANT - Official Audio",
    thumbnail: "https://i.ytimg.com/vi/RKAzrZWJQXA/hqdefault.jpg",
    channelTitle: "VALORANT",
    channelUrl: "https://www.youtube.com/channel/UC8CX0LD98EDXl4UYX1MDCXg",
  },
  {
    videoId: "TJBh_hj6DzE",
    title: "Porter Robinson - Look at the Sky (Official Music Video)",
    thumbnail: "https://i.ytimg.com/vi/TJBh_hj6DzE/hqdefault.jpg",
    channelTitle: "Porter Robinson",
    channelUrl: "https://www.youtube.com/channel/UCKKKYE55BVswHgKihx5YXew",
  },
  {
    videoId: "RKAzrZWJQXA",
    title: "2WORLDS // Madge x VALORANT - Official Audio",
    thumbnail: "https://i.ytimg.com/vi/RKAzrZWJQXA/hqdefault.jpg",
    channelTitle: "VALORANT",
    channelUrl: "https://www.youtube.com/channel/UC8CX0LD98EDXl4UYX1MDCXg",
  },
  {
    videoId: "TJBh_hj6DzE",
    title: "Porter Robinson - Look at the Sky (Official Music Video)",
    thumbnail: "https://i.ytimg.com/vi/TJBh_hj6DzE/hqdefault.jpg",
    channelTitle: "Porter Robinson",
    channelUrl: "https://www.youtube.com/channel/UCKKKYE55BVswHgKihx5YXew",
  },
  {
    videoId: "RKAzrZWJQXA",
    title: "2WORLDS // Madge x VALORANT - Official Audio",
    thumbnail: "https://i.ytimg.com/vi/RKAzrZWJQXA/hqdefault.jpg",
    channelTitle: "VALORANT",
    channelUrl: "https://www.youtube.com/channel/UC8CX0LD98EDXl4UYX1MDCXg",
  },
  {
    videoId: "TJBh_hj6DzE",
    title: "Porter Robinson - Look at the Sky (Official Music Video)",
    thumbnail: "https://i.ytimg.com/vi/TJBh_hj6DzE/hqdefault.jpg",
    channelTitle: "Porter Robinson",
    channelUrl: "https://www.youtube.com/channel/UCKKKYE55BVswHgKihx5YXew",
  },
  {
    videoId: "RKAzrZWJQXA",
    title: "2WORLDS // Madge x VALORANT - Official Audio",
    thumbnail: "https://i.ytimg.com/vi/RKAzrZWJQXA/hqdefault.jpg",
    channelTitle: "VALORANT",
    channelUrl: "https://www.youtube.com/channel/UC8CX0LD98EDXl4UYX1MDCXg",
  },
  {
    videoId: "TJBh_hj6DzE",
    title: "Porter Robinson - Look at the Sky (Official Music Video)",
    thumbnail: "https://i.ytimg.com/vi/TJBh_hj6DzE/hqdefault.jpg",
    channelTitle: "Porter Robinson",
    channelUrl: "https://www.youtube.com/channel/UCKKKYE55BVswHgKihx5YXew",
  },
];
