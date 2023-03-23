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
});
