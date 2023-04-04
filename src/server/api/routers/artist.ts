import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const artistRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.artist.findMany();
  }),
  getById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.artist.findUnique({
      where: {
        id: input,
      },
    });
  }),
  getListByName: publicProcedure
    .input(z.string().min(1))
    .query(({ ctx, input }) => {
      return ctx.prisma.artist.findMany({
        where: {
          name: {
            contains: input,
            mode: "insensitive",
          },
        },
        select: {
          id: true,
          name: true,
        },
        take: 10,
      });
    }),
});
