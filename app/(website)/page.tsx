"use client";

import Image from "next/image";
import { motion } from "motion/react";

export default function Home() {
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
    <main className="w-full px-6 mt-16 flex flex-col gap-12 sm:px-16 lg:container lg:mx-auto lg:flex-row-reverse">
      <div className="w-full flex flex-col items-center gap-24 lg:items-end">
        <div className="w-full flex flex-col items-center gap-12 lg:items-end">
          <motion.h1
            variants={titleContainer}
            initial="hidden"
            animate="show"
            className="font-fonde text-7xl text-center !leading-[80px] sm:text-8xl sm:max-w-sm sm:!leading-[110px] lg:text-right"
          >
            <span className="whitespace-nowrap">
              <motion.span variants={titleItem} className="inline-block">
                M
              </motion.span>
              <motion.span variants={titleItem} className="inline-block">
                a
              </motion.span>
              <motion.span variants={titleItem} className="inline-block">
                t
              </motion.span>
              <motion.span variants={titleItem} className="inline-block">
                h
              </motion.span>
              <motion.span variants={titleItem} className="inline-block">
                e
              </motion.span>
              <motion.span variants={titleItem} className="inline-block">
                u
              </motion.span>
              <motion.span variants={titleItem} className="inline-block">
                s
              </motion.span>
            </span>

            <motion.span variants={titleItem} className="inline-block mx-4">
              &
            </motion.span>

            <span className="whitespace-nowrap">
              <motion.span variants={titleItem} className="inline-block">
                G
              </motion.span>
              <motion.span variants={titleItem} className="inline-block">
                i
              </motion.span>
              <motion.span variants={titleItem} className="inline-block">
                s
              </motion.span>
              <motion.span variants={titleItem} className="inline-block">
                e
              </motion.span>
              <motion.span variants={titleItem} className="inline-block">
                l
              </motion.span>
              <motion.span variants={titleItem} className="inline-block">
                l
              </motion.span>
              <motion.span variants={titleItem} className="inline-block">
                i
              </motion.span>
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: "easeInOut" }}
            className="w-full flex flex-col items-center gap-4 lg:items-end"
          >
            <p className="font-rouge-script text-3xl text-center text-secondary lg:text-right lg:max-w-sm">
              Uma vez que já não são dois, as um só, que ninguém separe o que
              Deus uniu.
            </p>

            <p className="font-rouge-script text-3xl text-center text-secondary">
              Mateus 19:6
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4, ease: "easeInOut" }}
          className="w-fit flex flex-col"
        >
          <div className="w-full flex items-center gap-2">
            <span className="font-fonde text-2xl lg:text-3xl">Domingo</span>

            <motion.span
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 1.6, ease: "easeInOut" }}
              className="w-full h-[1.5px] bg-primary/15"
            />
          </div>

          <span className="font-fonde text-2xl lg:text-3xl">
            15 de Junho de 2025
          </span>

          <div className="w-full flex items-center gap-2">
            <span className="font-fonde text-2xl lg:text-3xl">5:30pm</span>

            <motion.span
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 1.6, ease: "easeInOut" }}
              className="w-full h-[1.5px] bg-primary/15"
            />
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, ease: "easeInOut" }}
        className="relative w-full flex justify-center"
      >
        <Image
          src="/home-mobile-illustration.png"
          alt="Matheus & Giselli"
          width={390}
          height={630}
          className="object-contain object-bottom sm:hidden"
        />

        <Image
          src="/home-illustration.png"
          alt="Matheus & Giselli"
          width={1050}
          height={1000}
          className="object-contain object-bottom hidden sm:block"
        />
      </motion.div>
    </main>
  );
}
