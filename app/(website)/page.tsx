import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full px-6 mt-16 flex flex-col gap-12 sm:px-16 lg:container lg:mx-auto lg:flex-row-reverse">
      <div className="w-full flex flex-col items-center gap-24 lg:items-end">
        <div className="w-full flex flex-col items-center gap-12 lg:items-end">
          <h1 className="font-fonde text-7xl text-center !leading-[80px] sm:text-8xl sm:max-w-sm sm:!leading-[110px] lg:text-right">
            Matheus & Giselli
          </h1>

          <div className="w-full flex flex-col items-center gap-4 lg:items-end">
            <p className="font-rouge-script text-3xl text-center text-secondary lg:text-right lg:max-w-sm">
              para que o povo veja e saiba, e todos vejam e saibam, que a mão do Senhor fez isso, que o Santo de Israel
              o criou.
            </p>

            <p className="font-rouge-script text-3xl text-center text-secondary">Isaías 41:20</p>
          </div>
        </div>

        <div className="w-fit flex flex-col">
          <div className="w-full flex items-center gap-2">
            <span className="font-fonde text-2xl">Domingo</span>

            <span className="w-full h-[1.5px] bg-primary/15" />
          </div>

          <span className="font-fonde text-2xl">15 de Junho de 2025</span>

          <div className="w-full flex items-center gap-2">
            <span className="font-fonde text-2xl">5:30pm</span>

            <span className="w-full h-[1.5px] bg-primary/15" />
          </div>
        </div>
      </div>

      <div className="relative w-full flex justify-center">
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
      </div>
    </div>
  );
}
