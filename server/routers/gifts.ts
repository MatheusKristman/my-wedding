import { prisma } from "@/lib/db";
import { publicProcedure, router } from "../trpc";
import { z } from "zod";

export const giftsRouter = router({
  getGifts: publicProcedure
    .input(
      z.object({
        page: z.number().nullish(),
        items: z.number(),
      }),
    )
    .query(async (opts) => {
      const { page, items } = opts.input;

      const actualPage: number = page ?? 1;
      const skip: number = (actualPage - 1) * items;

      const gifts = await prisma.gifts.findMany({
        skip,
        take: items,
      });

      const totalGifts = await prisma.gifts.count();

      const pages = Math.ceil(totalGifts / items);

      return { gifts, totalGifts, pages };
    }),
  getCartGifts: publicProcedure
    .input(
      z.object({
        ids: z.array(z.string().min(1)),
      }),
    )
    .query(async (opts) => {
      const { ids } = opts.input;

      const gifts = await prisma.gifts.findMany({
        where: {
          id: {
            in: ids,
          },
        },
      });

      return gifts;
    }),
});
