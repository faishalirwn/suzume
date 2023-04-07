import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const songRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.song.findMany({
      include: {
        artist: true,
      },
    });
  }),
  getById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.song.findUnique({
      where: {
        id: input,
      },
      include: {
        artist: true,
        lyrics: true,
      },
    });
  }),
  getByArtistAndTitle: publicProcedure
    .input(z.object({ artistId: z.string(), title: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.song.findMany({
        where: {
          artistId: {
            equals: input.artistId,
          },
          title: {
            contains: input.title,
            mode: "insensitive",
          },
        },
        select: {
          id: true,
          title: true,
        },
      });
    }),
  getListByName: publicProcedure
    .input(z.string().min(1))
    .query(({ ctx, input }) => {
      return ctx.prisma.song.findMany({
        where: {
          title: {
            contains: input,
            mode: "insensitive",
          },
        },
        select: {
          id: true,
          title: true,
        },
      });
    }),
});
