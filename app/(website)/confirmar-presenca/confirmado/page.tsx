"use client";

import Image from "next/image";
import { useQRCode } from "next-qrcode";

export default function GuestConfirmedPage() {
  const { Canvas } = useQRCode();

  return (
    <section className="w-full relative mt-16 sm:mt-24">
      <Image
        src="/floral.png"
        alt="Flores"
        width={200}
        height={500}
        className="object-contain object-center absolute -top-10 -left-10 z-10 lg:left-10"
      />

      <div className="w-full px-6 flex flex-col gap-12 z-20 relative mb-12 sm:px-16 sm:mx-auto sm:mb-24 lg:flex-row lg:max-w-[1350px] lg:justify-between">
        <div className="w-full flex flex-col gap-5 sm:mx-auto sm:w-[465px] lg:min-w-[465px]">
          <h1 className="font-fonde text-5xl leading-[60px] sm:text-7xl sm:leading-[80px]">Presença Confirmada</h1>

          <div className="w-full h-px bg-primary" />

          <div className="w-full flex flex-col gap-5">
            <h3 className="font-fonde text-3xl leading-[40px] sm:text-4xl sm:leading-[45px]">
              Muito obrigado por confirmar sua presença!
            </h3>

            <div className="w-full flex flex-col gap-4">
              <p className="font-montserrat text-xl font-light text-secondary sm:text-2xl">
                Estamos muito felizes em saber que você estará conosco nesse dia tão especial!
              </p>

              <p className="font-montserrat text-xl font-light text-secondary sm:text-2xl">
                Mal podemos esperar para celebrar juntos esse momento único.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full p-6 bg-primary flex flex-col gap-12 mx-auto max-w-[590px]">
          <div className="w-full flex flex-col gap-5">
            <h4 className="font-fonde text-3xl text-white text-center sm:text-5xl">
              Compartilhe os melhores momentos!
            </h4>

            <p className="font-montserrat text-xl text-white font-light text-center sm:text-3xl">
              Baixe o app e envie suas fotos para o álbum compartilhado do casamento!
            </p>
          </div>

          <div className="relative aspect-square w-full max-w-[330px] mx-auto [&_canvas]:!w-full [&_canvas]:!h-full">
            <Canvas text={"https://github.com/bunlong/next-qrcode"} />
          </div>

          <div className="w-full flex flex-col items-center gap-7 sm:flex-row sm:justify-around">
            {/* TODO: adicionar link do app da apple store */}
            <a
              href="https://www.apple.com/br/app-store/"
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
            </a>

            {/* TODO: adicionar link do app da play store */}
            <a
              href="https://play.google.com/store/apps/details?id=jawline.exercises.slim.face.yoga&hl=pt_BR"
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
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
