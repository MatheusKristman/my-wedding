"use client";

import Image from "next/image";
import { motion } from "motion/react";

export default function GuestConfirmedPage() {
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

  return (
    <section className="w-full relative mt-16 pb-12 sm:pb-24 sm:mt-24">
      <Image
        src="/floral.png"
        alt="Flores"
        width={200}
        height={500}
        className="object-contain object-center absolute -top-10 -left-10 z-10 lg:left-10"
      />

      <div className="w-full px-6 flex flex-col gap-12 z-20 relative sm:px-16 sm:mx-auto lg:flex-row lg:max-w-[1350px] lg:justify-between">
        <div className="w-full flex flex-col gap-5 sm:mx-auto sm:w-[465px] lg:min-w-[465px]">
          <motion.h1
            initial="hidden"
            animate="show"
            variants={titleContainer}
            className="font-fonde text-5xl leading-[60px] sm:text-7xl sm:leading-[80px]"
          >
            <span className="whitespace-nowrap mr-4">
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

            <span className="whitespace-nowrap">
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
                a
              </motion.span>
              <motion.span variants={titleItem} className="inline-block">
                d
              </motion.span>
              <motion.span variants={titleItem} className="inline-block">
                a
              </motion.span>
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "100%" }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="w-full h-px bg-primary"
          />

          <div className="w-full flex flex-col gap-5">
            <motion.h3
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.7, ease: "easeOut" }}
              className="font-fonde text-3xl leading-[40px] sm:text-4xl sm:leading-[45px]"
            >
              Muito obrigado por confirmar sua presença!
            </motion.h3>

            <div className="w-full flex flex-col gap-4">
              <motion.p
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.7, ease: "easeOut" }}
                className="font-montserrat text-xl font-light text-secondary sm:text-2xl"
              >
                Estamos muito felizes em saber que você estará conosco nesse dia
                tão especial!
              </motion.p>

              <motion.p
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3, duration: 0.7, ease: "easeOut" }}
                className="font-montserrat text-xl font-light text-secondary sm:text-2xl"
              >
                Mal podemos esperar para celebrar juntos esse momento único.
              </motion.p>
            </div>
          </div>
        </div>

        <div className="w-full p-6 bg-primary flex flex-col gap-12 mx-auto max-w-[590px]">
          <div className="w-full flex flex-col gap-5">
            <motion.h4
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="font-fonde text-3xl text-white text-center sm:text-5xl"
            >
              Compartilhe os melhores momentos!
            </motion.h4>

            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
              className="font-montserrat text-xl text-white font-light text-center sm:text-3xl"
            >
              Baixe o app e envie suas fotos para o álbum compartilhado do
              casamento!
            </motion.p>
          </div>

          <div className="relative aspect-square w-full max-w-[330px] mx-auto [&_canvas]:!w-full [&_canvas]:!h-full">
            <Image
              src="/dots-memories-qr-code.jpg"
              alt="Dots Memories"
              fill
              className="object-contain object-center"
            />
          </div>

          <div className="w-full flex flex-col items-center gap-7 sm:flex-row sm:justify-around">
            <motion.a
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.3, duration: 0.7, ease: "easeOut" }}
              href="https://apps.apple.com/br/app/dots-memories/id6449039420"
              target="_blank"
              rel="noreferrer noopener"
              className="relative"
            >
              <Image
                src="/apple-store.svg"
                alt="Apple Store"
                width={240}
                height={80}
                className="object-contain object-center"
              />
            </motion.a>

            <motion.a
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.3, duration: 0.7, ease: "easeInOut" }}
              href="https://play.google.com/store/apps/details?id=social.onelife&hl=pt_BR"
              target="_blank"
              rel="noreferrer noopener"
              className="relative"
            >
              <Image
                src="/play-store.svg"
                alt="Play Store"
                width={272}
                height={80}
                className="object-contain object-center"
              />
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
