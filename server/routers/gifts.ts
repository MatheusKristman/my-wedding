import { prisma } from "@/lib/db";
import { publicProcedure, router } from "../trpc";
import { z } from "zod";

export const giftsRouter = router({
  getGifts: publicProcedure
    .input(
      z.object({
        page: z.number().nullish(),
      }),
    )
    .query(async (opts) => {
      const { page } = opts.input;

      const itemsPerPage: number = 9;
      const actualPage: number = page ?? 1;
      const skip: number = (actualPage - 1) * itemsPerPage;

      const gifts = await prisma.gifts.findMany({
        skip,
        take: itemsPerPage,
      });

      return gifts;
    }),
});
