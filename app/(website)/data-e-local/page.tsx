"use client";

import Image from "next/image";
import { motion } from "motion/react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function DateAndLocationPage() {
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
    <section className="w-full px-6 mt-16 sm:px-16 lg:container lg:mx-auto">
      <div className="w-full flex flex-col mb-12">
        <div className="w-full flex items-center justify-between gap-2">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            viewport={{ once: true }}
            className="shrink-0 font-fonde text-[5vw] lg:text-[4vw]"
          >
            Local da
          </motion.span>

          <motion.span
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.3, ease: "easeInOut" }}
            className="h-px bg-primary/15"
          />

          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="shrink-0 font-fonde text-[5vw] lg:text-[4vw]"
          >
            15 de Junho de 2025
          </motion.span>
        </div>

        <div className="w-full flex items-center justify-between gap-2">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="shrink-0 font-fonde text-[5vw] lg:text-[4vw]"
          >
            Cerimonia
          </motion.span>

          <motion.span
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="h-px bg-primary/15"
          />

          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="shrink-0 font-fonde text-[5vw] lg:text-[4vw]"
          >
            5:30pm
          </motion.span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="w-full mb-24"
      >
        <Carousel>
          <CarouselContent>
            <CarouselItem className="basis-full sm:basis-1/2 lg:basis-1/3">
              <div className="w-full aspect-[3/2] relative">
                <Image
                  src="/buffet-1.png"
                  alt="Buffet"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </CarouselItem>

            <CarouselItem className="basis-full sm:basis-1/2 lg:basis-1/3">
              <div className="w-full aspect-[3/2] relative">
                <Image
                  src="/buffet-2.png"
                  alt="Buffet"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </CarouselItem>

            <CarouselItem className="basis-full sm:basis-1/2 lg:basis-1/3">
              <div className="w-full aspect-[3/2] relative">
                <Image
                  src="/buffet-3.png"
                  alt="Buffet"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </CarouselItem>

            <CarouselItem className="basis-full sm:basis-1/2 lg:basis-1/3">
              <div className="w-full aspect-[3/2] relative">
                <Image
                  src="/buffet-4.png"
                  alt="Buffet"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </CarouselItem>

            <CarouselItem className="basis-full sm:basis-1/2 lg:basis-1/3">
              <div className="w-full aspect-[3/2] relative">
                <Image
                  src="/buffet-5.png"
                  alt="Buffet"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </CarouselItem>

            <CarouselItem className="basis-full sm:basis-1/2 lg:basis-1/3">
              <div className="w-full aspect-[3/2] relative">
                <Image
                  src="/buffet-6.png"
                  alt="Buffet"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </CarouselItem>

            <CarouselItem className="basis-full sm:basis-1/2 lg:basis-1/3">
              <div className="w-full aspect-[3/2] relative">
                <Image
                  src="/buffet-7.png"
                  alt="Buffet"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </CarouselItem>
          </CarouselContent>

          <CarouselPrevious />

          <CarouselNext />
        </Carousel>
      </motion.div>

      <motion.h1
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={titleContainer}
        className="font-fonde text-5xl mb-2 sm:text-7xl lg:text-8xl"
      >
        <span className="whitespace-nowrap mr-4">
          <motion.span variants={titleItem} className="inline-block">
            B
          </motion.span>
          <motion.span variants={titleItem} className="inline-block">
            u
          </motion.span>
          <motion.span variants={titleItem} className="inline-block">
            f
          </motion.span>
          <motion.span variants={titleItem} className="inline-block">
            f
          </motion.span>
          <motion.span variants={titleItem} className="inline-block">
            e
          </motion.span>
          <motion.span variants={titleItem} className="inline-block">
            t
          </motion.span>
        </span>

        <span className="whitespace-nowrap">
          <motion.span variants={titleItem} className="inline-block">
            C
          </motion.span>
          <motion.span variants={titleItem} className="inline-block">
            e
          </motion.span>
          <motion.span variants={titleItem} className="inline-block">
            r
          </motion.span>
          <motion.span variants={titleItem} className="inline-block">
            e
          </motion.span>
          <motion.span variants={titleItem} className="inline-block">
            j
          </motion.span>
          <motion.span variants={titleItem} className="inline-block">
            e
          </motion.span>
          <motion.span variants={titleItem} className="inline-block">
            i
          </motion.span>
          <motion.span variants={titleItem} className="inline-block">
            r
          </motion.span>
          <motion.span variants={titleItem} className="inline-block">
            a
          </motion.span>
          <motion.span variants={titleItem} className="inline-block">
            s
          </motion.span>
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
        className="font-fonde uppercase text-xl mb-8 lg:text-4xl"
      >
        Estr. Acácio Antônio Batista, 4814 - Guarulhos
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="w-full aspect-[3/4] border-[1.5px] border-primary/15 mb-24 p-2 sm:aspect-[5/4] lg:aspect-video"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3662.533904763696!2d-46.39923492371695!3d-23.368895054551434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce88de6ffa56e1%3A0xe4adcb462c252ca!2sEstrada%20Acacio%20Antonio%20Batista%204814%2C%20Guarulhos%20-%20S%C3%A3o%20Paulo%2C%2C%20Brasil!5e0!3m2!1spt-BR!2sbr!4v1738337674494!5m2!1spt-BR!2sbr"
          className="w-full h-full"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </motion.div>
    </section>
  );
}
