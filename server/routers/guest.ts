import { z } from "zod";
import { TRPCError } from "@trpc/server";

import { prisma } from "@/lib/db";
import { publicProcedure, router } from "../trpc";

export const guestRouter = router({
  registerGuest: publicProcedure
    .input(
      z.object({
        name: z
          .string()
          .min(1, "O nome é obrigatório")
          .includes(" ", { message: "É preciso inserir o sobrenome" })
          .min(6, "O nome precisa ter no mínimo 6 caracteres")
          .max(100, "O nome só pode ter no máximo 100 caracteres"),
        attend: z.enum(["yes", "no"], {
          required_error: "Você precisa selecionar uma das opções",
        }),
        adultQuantity: z.string().min(1, "É preciso ter ao menos 1 adulto"),
        adultNames: z.array(
          z.object({
            value: z
              .string()
              .includes(" ", { message: "É preciso inserir o sobrenome" })
              .min(6, "O nome precisa ter no mínimo 6 caracteres")
              .max(100, "O nome só pode ter no máximo 100 caracteres"),
          })
        ),
        kidsQuantity: z.string().optional(),
        kidsNames: z
          .array(
            z.object({
              value: z
                .string()
                .includes(" ", { message: "É preciso inserir o sobrenome" })
                .min(6, "O nome precisa ter no mínimo 6 caracteres")
                .max(100, "O nome só pode ter no máximo 100 caracteres"),
            })
          )
          .optional(),
        email: z.string().email("E-mail inválido").min(1, "E-mail é obrigatório"),
        tel: z.string().min(1, "Telefone é obrigatório").length(15, "Telefone inválido"),
        message: z.string(),
        termsCheck: z.boolean().default(false),
      })
    )
    .mutation(async (opts) => {
      const { name, attend, adultQuantity, adultNames, kidsQuantity, kidsNames, email, tel, message, termsCheck } =
        opts.input;

      const attendFormatted = attend === "yes" ? true : attend === "no" ? false : undefined;
      const adultNamesFormatted = adultNames.map((item) => item.value);
      const kidsNamesFormatted = kidsNames?.map((item) => item.value);

      if (attendFormatted === undefined) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Selecione se irá comparecer no evento",
        });
      }

      await prisma.guest.create({
        data: {
          name,
          attend: attendFormatted,
          adultQuantity: Number(adultQuantity),
          adultNames: adultNamesFormatted,
          kidsQuantity: Number(kidsQuantity),
          kidsNames: kidsNamesFormatted ?? [],
          email,
          tel,
          message,
          termsCheck,
        },
      });

      return {};
    }),
});
