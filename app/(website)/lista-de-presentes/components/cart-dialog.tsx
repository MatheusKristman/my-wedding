import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { Loader2, ShoppingCartIcon, Trash2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";

import { trpc } from "@/lib/trpc-client";
import { cn, formatPrice } from "@/lib/utils";

interface CartDialogProps {
  width: number | null;
  openCart: boolean;
  giftsSelected: string[];
  setGiftsSelected: Dispatch<SetStateAction<string[]>>;
  setOpenCart: Dispatch<SetStateAction<boolean>>;
}

export function CartDialog({ width, openCart, giftsSelected, setGiftsSelected, setOpenCart }: CartDialogProps) {
  const { data, refetch, isLoading } = trpc.giftsRouter.getCartGifts.useQuery({
    ids: giftsSelected,
  });

  const removeGift = (giftId: string) => {
    const giftsFiltered = giftsSelected.filter((id) => id !== giftId);

    setGiftsSelected(giftsFiltered);
    refetch();
  };

  const totalPrice = data?.map((gift) => gift.price).reduce((acc, curr) => acc + curr, 0);

  if (width === null) {
    return;
  }

  //TODO: adicionar form para prosseguir com a compra

  return width < 640 ? (
    <Drawer open={openCart} onOpenChange={setOpenCart}>
      <DrawerTrigger asChild>
        <Button size="lg" className="w-12 lg:w-fit relative">
          <ShoppingCartIcon />

          {data && data.length > 0 && (
            <span className="absolute size-5 flex items-center justify-center top-0.5 right-0.5 bg-background rounded-full p-1 font-montserrat text-sm text-foreground lg:hidden">
              {data.length}
            </span>
          )}

          <span className="hidden lg:block uppercase">
            {data && data.length > 0 ? (data.length === 1 ? "1 Item" : `${data.length} Items`) : "Carrinho Vazio"}
          </span>
        </Button>
      </DrawerTrigger>

      <DrawerContent className="sm:rounded-none">
        <DrawerHeader>
          <DrawerTitle className="uppercase font-light text-2xl font-montserrat">Seu carrinho</DrawerTitle>
        </DrawerHeader>

        {isLoading ? (
          <div className="w-full mt-12 mb-6 flex flex-col items-center justify-center gap-12">
            <Loader2 className="animate-spin size-12" strokeWidth={1.5} />

            <Button onClick={() => setOpenCart(false)} size="lg" className="w-fit uppercase font-light text-base">
              Fechar
            </Button>
          </div>
        ) : data && data.length > 0 ? (
          <div className="w-full p-7 flex flex-col items-center justify-center gap-12">
            <ScrollArea className="max-h-[370px] h-full w-full overflow-y-auto">
              <div className="w-full h-full flex flex-col gap-4">
                {data.map((gift) => (
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

            <div className="w-full grid grid-cols-1 gap-4">
              <Button
                onClick={() => setOpenCart(false)}
                size="lg"
                variant="outline"
                className="uppercase font-light text-base"
              >
                Adicionar mais itens
              </Button>

              <Button size="lg" className="uppercase font-light text-base">
                Continuar compra
              </Button>
            </div>
          </div>
        ) : (
          <div className="w-full mt-12 mb-6 flex flex-col items-center justify-center gap-12">
            <div>
              <span className="block w-full text-center uppercase text-xl text-primary/35">Carrinho vazio</span>
            </div>

            <Button onClick={() => setOpenCart(false)} size="lg" className="w-fit uppercase font-light text-base">
              Fechar
            </Button>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  ) : (
    <Dialog open={openCart} onOpenChange={setOpenCart}>
      <DialogTrigger asChild>
        <Button size="lg" className="w-12 lg:w-fit relative">
          <ShoppingCartIcon />

          {data && data.length > 0 && (
            <span className="absolute size-5 flex items-center justify-center top-0.5 right-0.5 bg-background rounded-full p-1 font-montserrat text-sm text-foreground lg:hidden">
              {data.length}
            </span>
          )}

          <span className="hidden lg:block uppercase">
            {data && data.length > 0 ? (data.length === 1 ? "1 Item" : `${data.length} Items`) : "Carrinho Vazio"}
          </span>
        </Button>
      </DialogTrigger>

      <DialogContent
        className={cn("sm:rounded-none !max-w-3xl", { "!max-w-xl": !data || !totalPrice || data.length === 0 })}
      >
        <DialogHeader>
          <DialogTitle className="uppercase font-light text-2xl font-montserrat">Seu carrinho</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="w-full mt-12 mb-6 flex flex-col items-center justify-center gap-12">
            <Loader2 className="animate-spin size-12" strokeWidth={1.5} />

            <Button onClick={() => setOpenCart(false)} size="lg" className="w-fit uppercase font-light text-base">
              Fechar
            </Button>
          </div>
        ) : data && totalPrice && data.length > 0 ? (
          <div className="w-full mt-12 flex items-center justify-center gap-12">
            <div className="w-1/2 h-full flex flex-col justify-between gap-12">
              <ScrollArea className="max-h-[370px] h-full w-full">
                <div className="w-full h-full flex flex-col gap-4">
                  {data.map((gift) => (
                    <div key={gift.id} className="w-full flex">
                      <div className="w-1/3 shrink-0 aspect-square relative">
                        <Image src={gift.imageUrl} alt={gift.name} fill className="object-cover object-center" />
                      </div>

                      <div className="w-full p-6 bg-secondary flex flex-col justify-between gap-6">
                        <div className="w-full flex flex-col gap-2">
                          <div className="w-full flex items-center gap-2">
                            <div className="w-8 h-px bg-background" />

                            <h4 className="text-lg font-montserrat font-normal text-background uppercase line-clamp-1">
                              {gift.name}
                            </h4>
                          </div>

                          <h2 className="text-3xl font-montserrat font-normal text-background">
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

            <div className="w-1/2 h-full flex flex-col justify-between gap-12">
              <div className="w-full flex flex-col gap-9">
                <div className="w-full flex flex-col gap-4">
                  <Input className="w-full outline-input text-base" placeholder="NOME" />

                  <Textarea
                    className="w-full outline-input resize-none !h-36 text-base"
                    placeholder="DEIXE SUA MENSAGEM PARA OS NOIVOS"
                  />
                </div>
              </div>

              <div className="w-full grid grid-rows-2 gap-4">
                <Button
                  onClick={() => setOpenCart(false)}
                  size="lg"
                  variant="outline"
                  className="uppercase font-light text-base"
                >
                  Adicionar mais itens
                </Button>

                <Button size="lg" className="uppercase font-light text-base">
                  Continuar compra
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full mt-12 flex flex-col items-center justify-center gap-12">
            <div>
              <span className="block w-full text-center uppercase text-xl text-primary/35">Carrinho vazio</span>
            </div>

            <Button onClick={() => setOpenCart(false)} size="lg" className="w-fit uppercase font-light text-base">
              Fechar
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
