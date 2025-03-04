import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatPrice } from "@/lib/utils";
import { Gifts } from "@prisma/client";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

interface CartShopDesktop {
  gifts: Gifts[];
  setMethodSelected: Dispatch<SetStateAction<string>>;
}

export function CartShopDesktop({ gifts, setMethodSelected }: CartShopDesktop) {
  return (
    <div className="w-full">
      <h4 className="font-montserrat text-xl font-light text-primary/50 uppercase mb-5">
        Clique na opção &quot;ir para loja&quot; para acessar a loja
      </h4>

      <ScrollArea className="max-h-[170px] w-full overflow-y-auto mb-9">
        <div className="w-full h-full flex flex-col gap-4">
          {gifts.map((gift) => (
            <div key={gift.id} className="w-full flex">
              <div className="w-1/3 shrink-0 aspect-square relative">
                <Image src={gift.imageUrl} alt={gift.name} fill className="object-cover object-center" />
              </div>

              <div className="w-full p-6 bg-secondary flex flex-col justify-between gap-6">
                <div className="w-full flex flex-col gap-2">
                  <div className="w-full flex items-center gap-2">
                    <div className="w-8 h-px bg-background" />

                    <h4 className="text-xl font-montserrat font-normal text-background uppercase line-clamp-1">
                      {gift.name}
                    </h4>
                  </div>

                  <h2 className="text-4xl font-montserrat font-normal text-background">
                    {formatPrice(gift.price / 100)}
                  </h2>
                </div>

                <Button variant="ghost" className="w-fit h-fit p-0 flex items-center" asChild>
                  <a className="font-montserrat underline text-base text-background uppercase">
                    <MoveRight className="text-background" size={16} />
                    Ir para loja
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="w-full border border-primary p-5 mb-16">
        <h5 className="font-montserrat text-xl text-primary font-light uppercase mb-2">Dados de envio</h5>

        <div className="flex flex-col gap-1">
          <span className="font-montserrat text-sm text-primary/70 uppercase">
            Rua general porfírio da paz, 1350 - ap 54c
          </span>

          <span className="font-montserrat text-sm text-primary/70 uppercase">Vila bancaria</span>

          <span className="font-montserrat text-sm text-primary/70 uppercase">são Paulo - sp</span>

          <span className="font-montserrat text-sm text-primary/70 uppercase">03918-000</span>
        </div>
      </div>

      <div className="w-full flex items-center justify-between gap-6">
        <Button
          onClick={() => setMethodSelected("")}
          size="lg"
          variant="outline"
          className="w-full uppercase font-light text-base"
        >
          Voltar
        </Button>

        <Button size="lg" className="w-full uppercase font-light text-base">
          Continuar
        </Button>
      </div>
    </div>
  );
}
