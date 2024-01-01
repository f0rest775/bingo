"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { api } from "@/trpc/react";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { deleteRoom } from "@/schemas/room";

export default function TBingo() {
  const { data } = api.room.findAll.useQuery();

  const utils = api.useUtils();

  const { mutateAsync: deleteRoom } = api.room.delete.useMutation();

  async function handleDeleteRoom(roomId: deleteRoom) {
    try {
      await deleteRoom(roomId);
      await utils.room.findAll.reset();
    } catch (err) {
      alert("Falha ao deletar room!");
    }
  }

  return (
    <main className="w-full px-16">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Duração (min)</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((room) => (
            <TableRow key={room.id}>
              <TableCell className="font-medium">{room.id}</TableCell>
              <TableCell>{room.name}</TableCell>
              <TableCell>{room.duration}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreHorizontal className="w-5 h-5 shrink-0" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link href={`/bingo/${room.id}`}>Ver sala</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        handleDeleteRoom({
                          id: room.id,
                        })
                      }
                      className={cn("cursor-pointer")}
                    >
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
