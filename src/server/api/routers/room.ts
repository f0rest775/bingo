import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { createRoomSchema, deleteRoomSchema } from "@/schemas/room";
import { z } from "zod";

export const roomRouter = createTRPCRouter({
  resetRoom: publicProcedure
    .input(
      z.object({
        id: z.string().min(1),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.stone.updateMany({
        where: {
          roomId: input.id,
        },
        data: {
          status: false,
        },
      });
    }),
  updateByID: publicProcedure
    .input(
      z.object({
        id: z.string().min(1),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.stone.update({
        where: {
          id: input.id,
        },
        data: {
          status: true,
        },
      });
    }),

  findByID: publicProcedure
    .input(
      z.object({
        id: z.string().min(1),
      })
    )
    .query(async ({ input, ctx }) => {
      return await ctx.db.room.findFirst({
        include: {
          stones: {
            orderBy: {
              number: "asc",
            },
          },
        },
        where: {
          id: input.id,
        },
      });
    }),

  findAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.room.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });
  }),

  delete: publicProcedure
    .input(deleteRoomSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.room.delete({
        where: {
          id: input.id,
        },
      });
    }),

  create: publicProcedure
    .input(createRoomSchema)
    .mutation(async ({ ctx, input }) => {
      const room = await ctx.db.room.create({
        data: {
          name: input.name,
          duration: input.duration,
        },
      });

      const stones = Array.from({ length: 75 }, (_, index) => ({
        number: index + 1,
        roomId: room.id,
      }));

      await ctx.db.stone.createMany({
        data: stones,
      });

      return room;
    }),
});
