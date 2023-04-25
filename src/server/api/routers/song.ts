import { Language } from "@prisma/client";
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
          },
        },
        select: {
          id: true,
          title: true,
        },
      });
    }),
  createNewSong: protectedProcedure
    .input(
      z.object({
        artistId: z.string(),
        songTitle: z.string().min(1),
        altSongTitle: z.string(),
        language: z.nativeEnum(Language),
        songCover: z.string(),
        videoLink: z.string(),
        lyrics: z.array(
          z.object({
            language: z.nativeEnum(Language),
            content: z.string(),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const song = await ctx.prisma.song.create({
        data: {
          artistId: input.artistId,
          title: input.songTitle,
          altTitle: input.altSongTitle,
          language: input.language,
          cover: input.songCover,
          videoLink: input.videoLink,
          lyrics: {
            create: input.lyrics.map((lyric) => ({
              language: lyric.language,
              content: lyric.content,
            })),
          },
        },
      });
      return song;
    }),
});
