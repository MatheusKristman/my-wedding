"use client";

import { z } from "zod";
import Link from "next/link";
import { motion } from "motion/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import { trpc } from "@/lib/trpc-client";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
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
      }),
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
        }),
      )
      .optional(),
    email: z.string().email("E-mail inválido").min(1, "E-mail é obrigatório"),
    tel: z
      .string()
      .min(1, "Telefone é obrigatório")
      .length(15, "Telefone inválido"),
    message: z.string(),
    termsCheck: z.boolean().default(false),
  })
  .superRefine(({ kidsNames, adultNames, name }, ctx) => {
    if (kidsNames !== undefined) {
      const kids = kidsNames.map((item) => item.value);
      const uniqueValues = new Set(kids);

      if (uniqueValues.size !== kids.length) {
        ctx.addIssue({
          message: "Os nomes não podem ser repetidos",
          path: ["kidsQuantity"],
          code: "custom",
        });
      }
    }

    const hasName = adultNames.map((item) => item.value).includes(name);

    if (hasName) {
      ctx.addIssue({
        message: "Os nomes não podem ser o mesmo do convidado primário",
        path: ["adultQuantity"],
        code: "custom",
      });

      return;
    }

    const adults = adultNames.map((item) => item.value);
    const uniqueValues = new Set(adults);

    if (uniqueValues.size !== adults.length) {
      ctx.addIssue({
        message: "Os nomes não podem ser repetidos",
        path: ["adultQuantity"],
        code: "custom",
      });
    }
  });

export default function ConfirmPresencePage() {
  const [notPresent, setNotPresent] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      adultNames: [],
      adultQuantity: "1",
      attend: "yes",
      email: "",
      kidsNames: [],
      kidsQuantity: "0",
      message: "",
      tel: "",
      termsCheck: false,
    },
  });

  const adultQuantity = Number(form.watch("adultQuantity") || 1);
  const kidsQuantity = Number(form.watch("kidsQuantity") || 1);
  const termsCheck = form.watch("termsCheck");

  const router = useRouter();
  const kidsInputRef = useRef<HTMLLabelElement | null>(null);

  const {
    fields: adultFields,
    append: adultAppend,
    remove: adultRemove,
  } = useFieldArray({
    control: form.control,
    name: "adultNames",
  });

  const {
    fields: kidsFields,
    append: kidsAppend,
    remove: kidsRemove,
  } = useFieldArray({
    control: form.control,
    name: "kidsNames",
  });

  const titleContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const titleItem = {
    hidden: { opacity: 0, y: 100 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "circOut",
      },
    },
  };

  useEffect(() => {
    console.log({ errors: form.formState.errors });
  }, [form.formState.errors]);

  useEffect(() => {
    const currentLength = adultFields.length;

    if (adultQuantity > currentLength) {
      for (let i = currentLength; i < adultQuantity - 1; i++) {
        adultAppend({ value: "" });
      }
    } else if (adultQuantity < currentLength) {
      for (let i = currentLength - 1; i >= adultQuantity - 1; i--) {
        adultRemove(i);
      }
    }
  }, [adultQuantity]);

  useEffect(() => {
    const currentLength = kidsFields.length;

    if (kidsQuantity > currentLength) {
      for (let i = currentLength; i < kidsQuantity; i++) {
        kidsAppend({ value: "" });
      }
    } else if (kidsQuantity < currentLength) {
      for (let i = currentLength - 1; i >= kidsQuantity; i--) {
        kidsRemove(i);
      }
    }
  }, [kidsQuantity]);

  const { mutate: registerGuest, isPending } =
    trpc.guestRouter.registerGuest.useMutation({
      onSuccess: ({ attend }) => {
        if (attend) {
          router.push("/confirmar-presenca/confirmado");
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
          setNotPresent(true);
        }
      },
      onError: (error) => {
        console.log({ error });
      },
    });

  function handleTel(event: ChangeEvent<HTMLInputElement>) {
    let value = event.target.value.replace(/[^\d]/g, "");

    value = value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");

    form.setValue("tel", value);
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (form.formState.errors.kidsQuantity !== undefined) {
      kidsInputRef.current?.scroll({ top: 0, behavior: "smooth" });
    }

    if (termsCheck) {
      registerGuest(values);
    }
  }

  return (
    <section className="w-full relative mt-16 pb-12 sm:mt-24 sm:pb-24">
      <Image
        src="/floral.png"
        alt="Flores"
        width={200}
        height={500}
        className="object-contain object-center absolute -top-10 -left-10 z-10 lg:left-10"
      />

      <div className="w-full px-6 flex flex-col gap-12 z-20 relative sm:px-16 sm:max-w-[600px] sm:mx-auto lg:flex-row lg:max-w-[1350px] lg:justify-between">
        <div className="w-full flex flex-col gap-5 lg:w-[465px] lg:min-w-[465px]">
          <div className="w-full relative">
            {notPresent ? (
              <h1 className="font-fonde text-5xl leading-[60px] sm:text-7xl sm:leading-[80px]">
                Sentiremos sua Falta!
              </h1>
            ) : (
              <motion.h1
                initial="hidden"
                animate="show"
                variants={titleContainer}
                className="font-fonde text-5xl leading-[60px] sm:text-7xl sm:leading-[80px] sm:w-[480px]"
              >
                <span className="whitespace-nowrap mr-4">
                  <motion.span variants={titleItem} className="inline-block">
                    C
                  </motion.span>
                  <motion.span variants={titleItem} className="inline-block">
                    o
                  </motion.span>
                  <motion.span variants={titleItem} className="inline-block">
                    n
                  </motion.span>
                  <motion.span variants={titleItem} className="inline-block">
                    f
                  </motion.span>
                  <motion.span variants={titleItem} className="inline-block">
                    i
                  </motion.span>
                  <motion.span variants={titleItem} className="inline-block">
                    r
                  </motion.span>
                  <motion.span variants={titleItem} className="inline-block">
                    m
                  </motion.span>
                  <motion.span variants={titleItem} className="inline-block">
                    e
                  </motion.span>
                </span>

                <span className="whitespace-nowrap mr-4">
                  <motion.span variants={titleItem} className="inline-block">
                    s
                  </motion.span>
                  <motion.span variants={titleItem} className="inline-block">
                    u
                  </motion.span>
                  <motion.span variants={titleItem} className="inline-block">
                    a
                  </motion.span>
                </span>

                <span className="whitespace-nowrap">
                  <motion.span variants={titleItem} className="inline-block">
                    P
                  </motion.span>
                  <motion.span variants={titleItem} className="inline-block">
                    r
                  </motion.span>
                  <motion.span variants={titleItem} className="inline-block">
                    e
                  </motion.span>
                  <motion.span variants={titleItem} className="inline-block">
                    s
                  </motion.span>
                  <motion.span variants={titleItem} className="inline-block">
                    e
                  </motion.span>
                  <motion.span variants={titleItem} className="inline-block">
                    n
                  </motion.span>
                  <motion.span variants={titleItem} className="inline-block">
                    ç
                  </motion.span>
                  <motion.span variants={titleItem} className="inline-block">
                    a
                  </motion.span>
                </span>
              </motion.h1>
            )}

            {!notPresent && (
              <Image
                src="right-arrow.svg"
                alt="Seta"
                width={110}
                height={110}
                className="object-contain object-center hidden lg:block absolute -bottom-6 right-8 animate-arrow-right"
              />
            )}
          </div>

          <div className="w-full h-px bg-primary" />

          {notPresent && (
            <p className="font-montserrat text-2xl font-light text-secondary">
              Entendemos que nem sempre é possível estar presente, mas saiba que
              sentiremos muito a sua falta nesse dia especial.
            </p>
          )}
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full p-6 bg-primary flex flex-col gap-12 lg:max-w-xl"
          >
            <div className="w-full flex flex-col gap-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg text-background font-semibold">
                      Nome Completo
                    </FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Insira o nome completo"
                        className="dark-input w-full"
                        disabled={notPresent}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="attend"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg text-background font-semibold">
                      Você irá ao evento?
                    </FormLabel>

                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex items-center gap-4"
                        disabled={notPresent}
                      >
                        <FormItem className="flex items-center gap-2">
                          <FormControl>
                            <RadioGroupItem value="yes" />
                          </FormControl>

                          <FormLabel className="!mt-0.5 font-light text-base text-background">
                            Sim
                          </FormLabel>
                        </FormItem>

                        <FormItem className="flex items-center gap-2">
                          <FormControl>
                            <RadioGroupItem value="no" />
                          </FormControl>

                          <FormLabel className="!mt-0.5 font-light text-base text-background">
                            Não
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="adultQuantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg text-background font-semibold">
                      Quantidade de adultos (incluindo você)
                    </FormLabel>

                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={notPresent}
                    >
                      <FormControl>
                        <SelectTrigger
                          className="bg-primary border-background text-background normal-case"
                          ref={field.ref}
                          onBlur={field.onBlur}
                        >
                          <SelectValue placeholder="Selecione a quantidade de adultos" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        <SelectItem value="1">1 Adulto</SelectItem>

                        <SelectItem value="2">2 Adultos</SelectItem>

                        <SelectItem value="3">3 Adultos</SelectItem>

                        <SelectItem value="4">4 Adultos</SelectItem>

                        <SelectItem value="5">5 Adultos</SelectItem>

                        <SelectItem value="6">6 Adultos</SelectItem>

                        <SelectItem value="7">7 Adultos</SelectItem>

                        <SelectItem value="8">8 Adultos</SelectItem>

                        <SelectItem value="9">9 Adultos</SelectItem>

                        <SelectItem value="10">10 Adultos</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {adultQuantity > 1 &&
                adultFields.map((item, index) => (
                  <FormField
                    key={item.id}
                    name={`adultNames.${index}.value`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg text-background font-semibold">
                          Acompanhante - {index + 1}
                        </FormLabel>

                        <FormControl>
                          <Input
                            placeholder="Insira o nome completo"
                            className="dark-input w-full"
                            disabled={notPresent}
                            {...field}
                          />
                        </FormControl>

                        {form.formState.errors?.adultNames?.[index]?.value
                          ?.message && (
                          <FormMessage>
                            {
                              form.formState.errors?.adultNames?.[index]?.value
                                ?.message
                            }
                          </FormMessage>
                        )}
                      </FormItem>
                    )}
                  />
                ))}

              <FormField
                control={form.control}
                name="kidsQuantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      ref={kidsInputRef}
                      className="text-lg text-background font-semibold"
                    >
                      Quantidade de crianças (0 - 7 anos)
                    </FormLabel>

                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={notPresent}
                    >
                      <FormControl>
                        <SelectTrigger
                          className="bg-primary border-background text-background normal-case"
                          ref={field.ref}
                          onBlur={field.onBlur}
                        >
                          <SelectValue placeholder="Selecione a quantidade de crianças" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        <SelectItem value="0">Nenhuma Criança</SelectItem>

                        <SelectItem value="1">1 Criança</SelectItem>

                        <SelectItem value="2">2 Crianças</SelectItem>

                        <SelectItem value="3">3 Crianças</SelectItem>

                        <SelectItem value="4">4 Crianças</SelectItem>

                        <SelectItem value="5">5 Crianças</SelectItem>

                        <SelectItem value="6">6 Crianças</SelectItem>

                        <SelectItem value="7">7 Crianças</SelectItem>

                        <SelectItem value="8">8 Crianças</SelectItem>

                        <SelectItem value="9">9 Crianças</SelectItem>

                        <SelectItem value="10">10 Crianças</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {kidsQuantity > 0 &&
                kidsFields.map((item, index) => (
                  <FormField
                    key={item.id}
                    name={`kidsNames.${index}.value`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg text-background font-semibold">
                          Nome da criança - {index + 1}
                        </FormLabel>

                        <FormControl>
                          <Input
                            placeholder="Insira o nome completo"
                            className="dark-input w-full"
                            disabled={notPresent}
                            {...field}
                          />
                        </FormControl>

                        {form.formState.errors?.kidsNames?.[index]?.value
                          ?.message && (
                          <FormMessage>
                            {
                              form.formState.errors?.kidsNames?.[index]?.value
                                ?.message
                            }
                          </FormMessage>
                        )}
                      </FormItem>
                    )}
                  />
                ))}

              <FormField
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg text-background font-semibold">
                      E-mail
                    </FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Insira o e-mail"
                        className="dark-input w-full"
                        disabled={notPresent}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="tel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg text-background font-semibold">
                      Telefone para contato
                    </FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Insira o telefone"
                        className="dark-input w-full"
                        maxLength={15}
                        disabled={notPresent}
                        {...field}
                        onChange={handleTel}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg text-background font-semibold">
                      Mensagem
                    </FormLabel>

                    <FormControl>
                      <Textarea
                        placeholder="Insira a sua mensagem"
                        className="dark-input w-full !h-40 resize-none"
                        disabled={notPresent}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="termsCheck"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={notPresent}
                      />
                    </FormControl>

                    {/* TODO: adicionar pagina e links dos termos e politicas */}
                    <FormLabel className="!mt-0 leading-none text-sm text-background font-normal">
                      Declaro que tive acesso, li e concordo com os{" "}
                      <Link href="#" className="underline">
                        Termos de Uso
                      </Link>{" "}
                      e{" "}
                      <Link href="#" className="underline">
                        Política de Privacidade
                      </Link>
                      .
                    </FormLabel>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              variant="light"
              type="submit"
              disabled={!termsCheck || isPending || notPresent}
            >
              Confirmar Presença
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
}
