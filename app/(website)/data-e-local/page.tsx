import Image from "next/image";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

// TODO: criar versão tablet e desktop
// TODO: adicionar função de mapa
// TODO: ajustar carousel para tablet e mobile

export default function DateAndLocationPage() {
  return (
    <section className="w-full px-6 mt-16 sm:px-16 lg:container lg:mx-auto">
      <div className="w-full flex flex-col mb-12">
        <div className="w-full flex items-center justify-between gap-2">
          <span className="font-fonde text-[5vw] lg:text-[4vw]">Local da</span>

          <span className="flex-1 h-px bg-primary/15" />

          <span className="font-fonde text-[5vw] lg:text-[4vw]">15 de Junho de 2025</span>
        </div>

        <div className="w-full flex items-center justify-between gap-2">
          <span className="font-fonde text-[5vw] lg:text-[4vw]">Cerimonia</span>

          <span className="flex-1 h-px bg-primary/15" />

          <span className="font-fonde text-[5vw] lg:text-[4vw]">5:30pm</span>
        </div>
      </div>

      <div className="w-full mb-24">
        <Carousel>
          <CarouselContent>
            <CarouselItem className="basis-full sm:basis-1/2 lg:basis-1/3">
              <div className="w-full aspect-[3/2] relative">
                <Image src="/buffet-1.png" alt="Buffet" fill className="object-cover object-center" />
              </div>
            </CarouselItem>

            <CarouselItem className="basis-full sm:basis-1/2 lg:basis-1/3">
              <div className="w-full aspect-[3/2] relative">
                <Image src="/buffet-2.png" alt="Buffet" fill className="object-cover object-center" />
              </div>
            </CarouselItem>

            <CarouselItem className="basis-full sm:basis-1/2 lg:basis-1/3">
              <div className="w-full aspect-[3/2] relative">
                <Image src="/buffet-3.png" alt="Buffet" fill className="object-cover object-center" />
              </div>
            </CarouselItem>

            <CarouselItem className="basis-full sm:basis-1/2 lg:basis-1/3">
              <div className="w-full aspect-[3/2] relative">
                <Image src="/buffet-4.png" alt="Buffet" fill className="object-cover object-center" />
              </div>
            </CarouselItem>

            <CarouselItem className="basis-full sm:basis-1/2 lg:basis-1/3">
              <div className="w-full aspect-[3/2] relative">
                <Image src="/buffet-5.png" alt="Buffet" fill className="object-cover object-center" />
              </div>
            </CarouselItem>

            <CarouselItem className="basis-full sm:basis-1/2 lg:basis-1/3">
              <div className="w-full aspect-[3/2] relative">
                <Image src="/buffet-6.png" alt="Buffet" fill className="object-cover object-center" />
              </div>
            </CarouselItem>

            <CarouselItem className="basis-full sm:basis-1/2 lg:basis-1/3">
              <div className="w-full aspect-[3/2] relative">
                <Image src="/buffet-7.png" alt="Buffet" fill className="object-cover object-center" />
              </div>
            </CarouselItem>
          </CarouselContent>

          <CarouselPrevious />

          <CarouselNext />
        </Carousel>
      </div>

      <h1 className="font-fonde text-5xl mb-2 sm:text-7xl lg:text-8xl">Buffet Cerejeiras</h1>

      <p className="font-fonde uppercase text-xl mb-8 lg:text-4xl">Estr. Acácio Antônio Batista, 4814 - Guarulhos</p>

      <div className="w-full aspect-[3/4] border-[1.5px] border-primary/15 mb-24 p-2 sm:aspect-[5/4] lg:aspect-video">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3662.533904763696!2d-46.39923492371695!3d-23.368895054551434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce88de6ffa56e1%3A0xe4adcb462c252ca!2sEstrada%20Acacio%20Antonio%20Batista%204814%2C%20Guarulhos%20-%20S%C3%A3o%20Paulo%2C%2C%20Brasil!5e0!3m2!1spt-BR!2sbr!4v1738337674494!5m2!1spt-BR!2sbr"
          className="w-full h-full"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
}
