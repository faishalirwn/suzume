import { Language } from "@prisma/client";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const lyricsRouter = createTRPCRouter({
  createNewTranslation: publicProcedure
    .input(
      z.array(
        z.object({
          songId: z.string(),
          language: z.nativeEnum(Language),
          content: z.string(),
        })
      )
    )
    .mutation(async ({ ctx, input }) => {
      const song = await ctx.prisma.lyric.createMany({
        data: input.map((lyric) => ({
          songId: lyric.songId,
          language: lyric.language,
          content: lyric.content,
        })),
      });
      return song;
    }),
});
