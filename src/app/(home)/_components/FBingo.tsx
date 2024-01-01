"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useForm } from "react-hook-form";
import { createRoomSchema, createRoomFormData } from "@/schemas/room";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";

import { api } from "@/trpc/react";
import { Loader } from "lucide-react";

export default function FBingo() {
  const { mutateAsync: createRoom, isLoading } = api.room.create.useMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<createRoomFormData>({
    resolver: zodResolver(createRoomSchema),
  });

  const utils = api.useUtils();

  async function handleRoomSubmitted(data: createRoomFormData) {
    try {
      await createRoom(data);
      await utils.room.findAll.reset();
      reset();
    } catch (err) {
      alert("erro ao criar room");
    } finally {
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Criar Sala</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Novo sala</SheetTitle>
          <SheetDescription>
            Insira as informações para criação da sua sala personalizada.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit(handleRoomSubmitted)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nome
              </Label>
              <Input
                id="name"
                placeholder="nome da sala.."
                className={cn(
                  "col-span-3",
                  errors.name && "focus-visible:ring-red-500"
                )}
                {...register("name")}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="duration" className="text-right">
                Duração
              </Label>
              <Input
                id="duration"
                placeholder="duração da sala.."
                {...register("duration")}
                className={cn(
                  "col-span-3",
                  errors.duration && "focus-visible:ring-red-500"
                )}
              />
            </div>
          </div>
          <SheetFooter>
            <Button type="submit" className={cn("w-24")}>
              {isLoading && (
                <Loader className="w-5 h-5 shrink-0 animate-spin" />
              )}
              {!isLoading && "Criar sala"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
