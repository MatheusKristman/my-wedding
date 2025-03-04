import Image from "next/image";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Gifts } from "@prisma/client";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ShoppingBagIcon, Trash2, WalletIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface CartResumeMobileProps {
  gifts: Gifts[];
  totalPrice: number;
  removeGift: (id: string) => void;
  closeCart: () => void;
}

export function CartResumeMobile({ gifts, removeGift, closeCart, totalPrice }: CartResumeMobileProps) {
  const [giftMethod, setGiftMethod] = useState("shop");

  return (
    <div className="relative max-h-[80vh] overflow-y-auto w-full p-6 flex flex-col gap-12">
      <div className="w-full flex flex-col gap-9">
        <div className="w-full flex flex-col gap-9">
          <ScrollArea className="max-h-[370px] h-full w-full overflow-y-auto">
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

                    <Button
                      onClick={() => removeGift(gift.id)}
                      variant="ghost"
                      className="w-fit h-fit p-0 flex items-center"
                    >
                      <Trash2 className="text-destructive" size={16} />

                      <span className="text-base text-destructive uppercase">Remover</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="w-full flex flex-col gap-4">
            <div className="w-full h-px bg-primary/35" />

            <div className="w-full flex items-center justify-between gap-6">
              <span className="font-montserrat text-xl font-light uppercase">Total</span>

              <span className="font-montserrat text-xl font-light uppercase">{formatPrice(totalPrice / 100)}</span>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-8">
          <div className="w-full flex flex-col gap-4">
            <span className="font-montserrat text-base uppercase">Forma de presentear</span>

            <div className="w-full flex items-center justify-between gap-6">
              <Button
                onClick={() => setGiftMethod("shop")}
                variant={giftMethod === "shop" ? "default" : "outline"}
                size="lg"
                className="w-1/2"
              >
                <ShoppingBagIcon strokeWidth={1} size={20} />
                Na loja
              </Button>

              <Button
                onClick={() => setGiftMethod("pix")}
                variant={giftMethod === "pix" ? "default" : "outline"}
                size="lg"
                className="w-1/2"
              >
                <WalletIcon strokeWidth={1} size={20} />
                PIX
              </Button>
            </div>
          </div>

          <div className="w-full flex flex-col gap-4">
            <Input className="w-full outline-input text-base" placeholder="NOME" />

            <Textarea
              className="w-full outline-input resize-none !h-36 text-base"
              placeholder="DEIXE SUA MENSAGEM PARA OS NOIVOS"
            />
          </div>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 gap-4">
        <Button onClick={closeCart} size="lg" variant="outline" className="uppercase font-light text-base">
          Adicionar mais itens
        </Button>

        <Button size="lg" className="uppercase font-light text-base">
          Continuar
        </Button>
      </div>
    </div>
  );
}
