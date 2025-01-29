import Image from "next/image";

export default function CoupleStory() {
  return (
    <section className="w-full px-6 py-12 flex flex-col gap-12 sm:px-16 lg:container lg:mx-auto lg:flex-row-reverse lg:gap-0">
      <div className="w-full relative pt-[17vw] px-2 sm:w-3/4 sm:mx-auto sm:pt-[13vw] md:w-[50%] lg:w-[40%] lg:px-0 lg:pt-[7%] xl:w-[30%] xl:pt-[6%]">
        <div className="w-full aspect-square absolute top-0 left-0 right-0">
          <Image
            src="/couple-story-label.png"
            alt="Nossa História"
            fill
            className="object-contain object-top"
          />
        </div>

        <div className="relative rounded-full overflow-hidden">
          <Image
            src="/couple-story-illustration.png"
            alt="História do casal"
            width={620}
            height={1000}
            className="object-cover object-center"
          />
        </div>
      </div>

      <div className="w-full flex flex-col gap-6 lg:mt-20 lg:w-[60%] xl:mt-32 xl:w-[70%]">
        <h1 className="font-fonde text-7xl !leading-[60px] sm:text-8xl sm:!leading-[80px] lg:max-w-lg">
          Como começou
        </h1>

        <div className="w-full h-[1.5px] bg-primary" />

        <div className="w-full flex flex-col gap-4 sm:gap-5 lg:max-w-2xl lg:pr-12">
          <p className="text-base text-secondary font-montserrat sm:text-xl">
            Nosso destino se cruzou em um dia comum, mas que se tornaria
            inesquecível. Nos conhecemos em uma entrevista de emprego, onde a
            Giselli, com seu jeito leve e brincalhão, arrancou risadas ao fazer
            piadas com o meu sobrenome. No fim da conversa, mesmo tomado pelo
            nervosismo, criei coragem e pedi o número dela (tamanha a tensão,
            até perguntei a operadora!).
          </p>

          <p className="text-base text-secondary font-montserrat sm:text-xl">
            A partir dali, nossas conversas pareciam não ter fim. Viramos
            madrugadas trocando mensagens, nos conhecendo cada vez mais, até que
            marcamos nosso primeiro encontro no Ceret. Foi lá que nossos olhares
            se encontraram de verdade, e nosso primeiro beijo selou o começo da
            nossa história.
          </p>

          <p className="text-base text-secondary font-montserrat sm:text-xl">
            Desde então, construímos momentos incríveis juntos, até o dia em
            que, sob o som das ondas, fiz o pedido mais importante da minha
            vida: pedi a Giselli em casamento. E, claro, ela disse sim.
          </p>

          <p className="text-base text-secondary font-montserrat sm:text-xl">
            Agora, estamos aqui, prontos para começar o nosso &quot;felizes para
            sempre&quot;.
          </p>
        </div>
      </div>
    </section>
  );
}
