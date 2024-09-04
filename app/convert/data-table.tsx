"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LucideMoveRight } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { YTVideo } from "./column-def";
import { FormEventHandler, useEffect, useState } from "react";
import { addTracksToPlaylist, createPlaylist } from "../yt-functions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { BarLoader } from "react-spinners"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    table.toggleAllPageRowsSelected(true);
  }, [])

  return (
    <div className="text-center flex flex-col items-center">
      <CreateYTPlaylist
        data={
          table
            .getSelectedRowModel()
            .rows.map((row) => row.original) as YTVideo[]
        }
      />
      <div className="rounded-md border bg-[#1f1f1f]/40">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function CreateYTPlaylist({ data }: { data: YTVideo[] }) {
  const [playlistName, setPlaylistName] = useState<string>("");
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const router = useRouter();

  const createPlaylistAndAddTracks: FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    console.log("Creating playlist", playlistName);

    try {
      const playlistId = await createPlaylist(playlistName);

      await addTracksToPlaylist(data, playlistId);
      console.log(playlistId);
      setTimeout(() => {
        window.open(`https://www.youtube.com/playlist?list=${playlistId}`);
      }, 1000);

      toast.success("Playlist created successfully");
      //window.open(`https://www.youtube.com/playlist?list=${playlistId}`);
      router.push("/convert");
    } catch (error) {
      console.error("Error creating playlist:", error);
      console.error(error);
      toast.error("Error creating playlist");
    }
  };
  return (
    <Dialog>
      <DialogTrigger className="my-5 text-lg font-semibold border border-white rounded-full px-4 py-2 hover:bg-white hover:text-black transition flex gap-x-1 items-center">
        Convert to youtube playlist
        <LucideMoveRight className="inline-block ml-2" />
      </DialogTrigger>
      <DialogContent className="bg-[#1f1f1f] border-black">
        <form
          onSubmit={createPlaylistAndAddTracks}
          className="flex flex-col items-center"
        >
          <div className="w-full">
            <label className="block text-xl font-medium">Playlist name</label>
            <input
              disabled={isCreating}
              onChange={(e) => setPlaylistName(e.target.value)}
              type="text"
              placeholder="Enter playlist name"
              className="w-full mt-3 rounded-[2px] focus:outline-none focus:ring-0 px-3 py-1"
            />
          </div>
          <button
            type="submit"
            disabled={isCreating || playlistName.length === 0}
            className="bg-white w-24 h-8 flex justify-center items-center text-black px-3 py-1 rounded-sm text-lg font-medium text-center mt-5 disabled:bg-white/70"
          >
            {isCreating ? <BarLoader /> : "Create"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}