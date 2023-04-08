import { Language } from "@prisma/client";
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
  createNewArtist: protectedProcedure
    .input(
      z.object({
        artistName: z.string().min(1),
        bio: z.string(),
        artistCover: z.string(),
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
      const artist = await ctx.prisma.artist.create({
        data: {
          name: input.artistName,
          bio: input.bio,
          cover: input.artistCover,
          songs: {
            create: {
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
          },
        },
      });
      return artist;
    }),
});
