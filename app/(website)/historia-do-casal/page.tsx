"use client";

import Image from "next/image";
import { motion } from "motion/react";

export default function CoupleStory() {
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
    <section className="w-full px-6 py-12 flex flex-col gap-12 sm:px-16 lg:container lg:mx-auto lg:flex-row-reverse lg:gap-0">
      <div className="w-full relative pt-[17vw] px-2 sm:w-3/4 sm:mx-auto sm:pt-[13vw] md:w-[50%] lg:w-[40%] lg:px-0 lg:pt-[7%] xl:w-[30%] xl:pt-[6%]">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="w-full aspect-square absolute top-0 left-0 right-0"
        >
          <Image
            src="/couple-story-label.png"
            alt="Nossa História"
            fill
            className="object-contain object-top"
          />
        </motion.div>

        <div className="relative rounded-full overflow-hidden">
          <Image
            src="/couple-story-illustration.JPG"
            alt="História do casal"
            width={620}
            height={1000}
            className="object-cover object-center"
          />
        </div>
      </div>

      <div className="w-full flex flex-col gap-6 lg:mt-20 lg:w-[60%] xl:mt-32 xl:w-[70%]">
        <motion.h1
          initial="hidden"
          animate="show"
          variants={titleContainer}
          className="font-fonde text-7xl !leading-[60px] sm:text-8xl sm:!leading-[80px] lg:max-w-lg"
        >
          <span className="whitespace-nowrap">
            <motion.span variants={titleItem} className="inline-block">
              C
            </motion.span>
            <motion.span variants={titleItem} className="inline-block">
              o
            </motion.span>
            <motion.span variants={titleItem} className="inline-block">
              m
            </motion.span>
            <motion.span variants={titleItem} className="inline-block">
              o
            </motion.span>
          </span>

          <span className="whitespace-nowrap">
            <motion.span variants={titleItem} className="inline-block">
              c
            </motion.span>
            <motion.span variants={titleItem} className="inline-block">
              o
            </motion.span>
            <motion.span variants={titleItem} className="inline-block">
              m
            </motion.span>
            <motion.span variants={titleItem} className="inline-block">
              e
            </motion.span>
            <motion.span variants={titleItem} className="inline-block">
              ç
            </motion.span>
            <motion.span variants={titleItem} className="inline-block">
              o
            </motion.span>
            <motion.span variants={titleItem} className="inline-block">
              u
            </motion.span>
          </span>
        </motion.h1>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="w-full h-[1.5px] bg-primary"
        />

        <div className="w-full flex flex-col gap-4 sm:gap-5 lg:max-w-2xl lg:pr-12">
          <motion.p
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-base text-secondary font-montserrat sm:text-xl"
          >
            Nosso destino se cruzou em um dia comum, mas que se tornaria
            inesquecível. Nos conhecemos em uma entrevista de emprego, onde a
            Giselli, com seu jeito leve e brincalhão, arrancou risadas ao fazer
            piadas com o meu sobrenome. No fim da conversa, mesmo tomado pelo
            nervosismo, criei coragem e pedi o número dela (tamanha a tensão,
            até perguntei a operadora!).
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.3 }}
            className="text-base text-secondary font-montserrat sm:text-xl"
          >
            A partir dali, nossas conversas pareciam não ter fim. Viramos
            madrugadas trocando mensagens, nos conhecendo cada vez mais, até que
            marcamos nosso primeiro encontro no Ceret. Foi lá que nossos olhares
            se encontraram de verdade, e nosso primeiro beijo selou o começo da
            nossa história.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.6 }}
            className="text-base text-secondary font-montserrat sm:text-xl"
          >
            Desde então, construímos momentos incríveis juntos, até o dia em
            que, sob o som das ondas, fiz o pedido mais importante da minha
            vida: pedi a Giselli em casamento. E, claro, ela disse sim.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.9 }}
            className="text-base text-secondary font-montserrat sm:text-xl"
          >
            Agora, estamos aqui, prontos para começar o nosso &quot;felizes para
            sempre&quot;.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
