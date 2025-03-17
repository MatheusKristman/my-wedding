import { prisma } from "@/lib/db";
import { publicProcedure, router } from "../trpc";
import { z } from "zod";
import { Gifts } from "@prisma/client";
import { TRPCError } from "@trpc/server";

export const giftsRouter = router({
  getGifts: publicProcedure
    .input(
      z.object({
        page: z.number().nullish(),
        items: z.number(),
        filter: z.string().min(1),
      }),
    )
    .query(async (opts) => {
      const { page, items, filter } = opts.input;

      const actualPage: number = page ?? 1;
      const skip: number = (actualPage - 1) * items;
      let gifts: Gifts[] = [];

      if (filter === "a_z") {
        gifts = await prisma.gifts.findMany({
          where: {
            stock: {
              gt: 0,
            },
          },
          skip,
          take: items,
          orderBy: {
            name: "asc",
          },
        });
      }

      if (filter === "desc_price") {
        gifts = await prisma.gifts.findMany({
          where: {
            stock: {
              gt: 0,
            },
          },
          skip,
          take: items,
          orderBy: {
            price: "desc",
          },
        });
      }

      if (filter === "asc_price") {
        gifts = await prisma.gifts.findMany({
          where: {
            stock: {
              gt: 0,
            },
          },
          skip,
          take: items,
          orderBy: {
            price: "asc",
          },
        });
      }

      if (filter === "favorites") {
        gifts = await prisma.gifts.findMany({
          where: {
            stock: {
              gt: 0,
            },
          },
          skip,
          take: items,
          orderBy: {
            favorite: "desc",
          },
        });
      }

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

      const hasNoLink = gifts.filter((gift) => !gift.link).length > 0;

      return { gifts, hasNoLink };
    }),
  handleGiftSubmit: publicProcedure
    .input(
      z.object({
        ids: z.array(z.string().min(1)),
        name: z.string().min(1),
        message: z.string(),
        giftMethod: z.string().min(1),
      }),
    )
    .mutation(async (opts) => {
      const { ids, name, message, giftMethod } = opts.input;

      const giftWithoutStock = await prisma.gifts.findMany({
        where: {
          id: {
            in: ids,
          },
          stock: {
            equals: 0,
          },
        },
      });

      if (giftWithoutStock.length > 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "Um dos items selecionados já foram comprados, recarregue a pagina para ter a lista atualizada!",
        });
      }

      const purchaseCreated = await prisma.purchase.create({
        data: {
          name,
          message,
          giftMethod,
          giftsIds: ids,
        },
      });

      await prisma.gifts.updateMany({
        where: {
          id: {
            in: ids,
          },
        },
        data: {
          stock: {
            decrement: 1,
          },
          purchasesIds: {
            push: purchaseCreated.id,
          },
        },
      });

      return {};
    }),
});
