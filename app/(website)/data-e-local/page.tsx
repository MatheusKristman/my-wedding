import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// TODO: criar versão tablet e desktop
// TODO: adicionar função de mapa
// TODO: ajustar carousel para tablet e mobile

export default function DateAndLocationPage() {
  return (
    <section className="w-full px-6 mt-16">
      <div className="w-full flex flex-col mb-12">
        <div className="w-full flex items-center justify-between gap-2">
          <span className="font-fonde text-[5vw]">Local da</span>

          <span className="flex-1 h-[1.5px] bg-primary/15" />

          <span className="font-fonde text-[5vw]">15 de Junho de 2025</span>
        </div>

        <div className="w-full flex items-center justify-between gap-2">
          <span className="font-fonde text-[5vw]">Cerimonia</span>

          <span className="flex-1 h-[1.5px] bg-primary/15" />

          <span className="font-fonde text-[5vw]">5:30pm</span>
        </div>
      </div>

      <div className="w-full mb-24">
        <Carousel>
          <CarouselContent>
            <CarouselItem className="basis-full">
              <div className="w-full aspect-[3/2] relative">
                <Image
                  src="/buffet-1.png"
                  alt="Buffet"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </CarouselItem>

            <CarouselItem className="basis-full">
              <div className="w-full aspect-[3/2] relative">
                <Image
                  src="/buffet-2.png"
                  alt="Buffet"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </CarouselItem>

            <CarouselItem className="basis-full">
              <div className="w-full aspect-[3/2] relative">
                <Image
                  src="/buffet-3.png"
                  alt="Buffet"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </CarouselItem>

            <CarouselItem className="basis-full">
              <div className="w-full aspect-[3/2] relative">
                <Image
                  src="/buffet-4.png"
                  alt="Buffet"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </CarouselItem>

            <CarouselItem className="basis-full">
              <div className="w-full aspect-[3/2] relative">
                <Image
                  src="/buffet-5.png"
                  alt="Buffet"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </CarouselItem>

            <CarouselItem className="basis-full">
              <div className="w-full aspect-[3/2] relative">
                <Image
                  src="/buffet-6.png"
                  alt="Buffet"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </CarouselItem>

            <CarouselItem className="basis-full">
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
      </div>

      <h1 className="font-fonde text-5xl mb-2">Buffet Cerejeiras</h1>

      <p className="font-fonde uppercase text-xl mb-8">
        Estr. Acacio Antonio Batista, 4814 - Guarulhos
      </p>

      <div className="w-full aspect-[3/4] border-[1.5px] border-primary/15 mb-24"></div>
    </section>
  );
}
