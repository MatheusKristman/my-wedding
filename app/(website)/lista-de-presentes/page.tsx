import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon, ShoppingCartIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function GiftsListPage() {
  return (
    <section className="w-full">
      <div className="w-full flex items-center gap-2 mb-12">
        <div className="w-[10%] flex-1 h-px bg-primary/15 sm:w-full" />

        <h1 className="w-[80%] font-fonde text-5xl text-center uppercase sm:w-fit lg:text-7xl">Lista de presentes</h1>

        <div className="w-[10%] flex-1 h-px bg-primary/15 sm:w-full" />
      </div>

      <div className="w-full px-6 flex items-center gap-5 mb-12 sm:px-16 sm:justify-between lg:container lg:mx-auto">
        <Button size="lg" className="w-12">
          <ShoppingCartIcon />
        </Button>

        <Select>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Alterar a ordem" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="asc">Maior preço</SelectItem>
            <SelectItem value="desc">Menor preço</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full px-6 flex flex-col gap-24 sm:px-16 lg:container lg:mx-auto">
        <div className="w-full grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* Item do produto */}
          <div className="w-full flex flex-col">
            <div className="relative aspect-square w-full">
              <Image src="/buffet-1.png" alt="Produto 1" fill className="object-center object-cover" />
            </div>

            <div className="w-full bg-secondary p-6 flex flex-col items-center gap-5">
              <div className="w-full flex flex-col items-center gap-2">
                <div className="w-full flex items-center gap-2">
                  <div className="flex-1 h-px bg-white" />

                  <span className="font-montserrat uppercase text-lg text-center text-white">Maquina de lavar</span>

                  <div className="flex-1 h-px bg-white" />
                </div>

                <span className="font-montserrat text-white text-3xl text-center">R$ 3.869,00</span>
              </div>

              <Button size="lg" variant="light" className="w-full">
                Presentear
              </Button>
            </div>
          </div>
        </div>

        <div className="w-full flex items-center justify-between gap-6 mb-24">
          <Button size="lg" variant="outline" className="!h-12 w-12">
            <ChevronLeftIcon strokeWidth={1} />
          </Button>

          <div className="flex-1 flex items-center gap-6">
            <Button size="lg" variant="outline" className="!h-12 w-12">
              1
            </Button>

            <Button size="lg" variant="outline" className="!h-12 w-12">
              2
            </Button>
          </div>

          <Button size="lg" variant="outline" className="!h-12 w-12">
            <ChevronRightIcon strokeWidth={1} />
          </Button>
        </div>
      </div>
    </section>
  );
}
