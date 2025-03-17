import Image from "next/image";
import { toast } from "sonner";
import { Gifts } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
import { Check, Loader2, MoveRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import { formatPrice } from "@/lib/utils";
import { trpc } from "@/lib/trpc-client";
import { useCartStore } from "@/stores/use-cart-store";

interface CartShopDesktop {
  gifts: Gifts[];
  shopProductsAccessed: string[];
  handleReset: () => void;
  setShopProductsAccessed: Dispatch<SetStateAction<string[]>>;
  setPixProductsAccessed: Dispatch<SetStateAction<string[]>>;
}

export function CartShopDesktop({
  gifts,
  shopProductsAccessed,
  handleReset,
  setShopProductsAccessed,
  setPixProductsAccessed,
}: CartShopDesktop) {
  const { name, message, giftMethod, setMethodSelected } = useCartStore();

  const { mutate: handleGiftSubmit, isPending } =
    trpc.giftsRouter.handleGiftSubmit.useMutation({
      onSuccess: () => {
        toast.success("Obrigado por nos presentear!");

        handleReset();
        setShopProductsAccessed([]);
        setPixProductsAccessed([]);
      },
      onError: (err) => {
        toast.error(
          "Ocorreu um erro ao registrar os presentes, tente novamente mais tarde.",
        );

        console.error(err);
      },
    });

  const handleBack = () => {
    setMethodSelected("");
  };

  const handleLinkClick = (id: string) => {
    const productArr = [...shopProductsAccessed];

    if (!productArr.includes(id)) {
      productArr.push(id);

      setShopProductsAccessed(productArr);
    }
  };

  return (
    <div className="w-full">
      <h4 className="font-montserrat text-xl font-light text-primary/50 uppercase mb-5">
        Clique na opção &quot;ir para loja&quot; para comprar o presente
      </h4>

      <ScrollArea className="max-h-[170px] h-full w-full mb-9">
        <div className="w-full h-full flex flex-col gap-4">
          {gifts.map((gift) => (
            <div key={gift.id} className="w-full flex">
              <div className="w-1/3 shrink-0 aspect-square relative">
                {shopProductsAccessed.includes(gift.id) && (
                  <div className="absolute top-2 left-2 rounded-full size-10 bg-background flex items-center justify-center z-10">
                    <Check size={30} />
                  </div>
                )}

                <Image
                  src={gift.imageUrl}
                  alt={gift.name}
                  fill
                  className="object-cover object-center"
                />
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
                  onClick={() => handleLinkClick(gift.id)}
                  variant="ghost"
                  className="w-fit h-fit p-0 flex items-center"
                  asChild
                >
                  <a
                    href={gift.link!}
                    rel="noreferrer noopener"
                    target="_blank"
                    className="font-montserrat underline text-base text-background uppercase"
                  >
                    <MoveRight className="text-background" size={16} />
                    Ir para loja
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="w-full border border-primary p-5 mb-10">
        <h5 className="font-montserrat text-xl text-primary font-light uppercase mb-2">
          Dados de envio
        </h5>

        <div className="flex flex-col gap-1">
          <span className="font-montserrat text-sm text-primary/70 uppercase">
            Rua general porfírio da paz, 1350 - ap 54c
          </span>

          <span className="font-montserrat text-sm text-primary/70 uppercase">
            Vila bancaria
          </span>

          <span className="font-montserrat text-sm text-primary/70 uppercase">
            são Paulo - sp
          </span>

          <span className="font-montserrat text-sm text-primary/70 uppercase">
            03918-000
          </span>
        </div>
      </div>

      <span className="block w-full font-montserrat text-center text-sm text-primary/50 mb-4">
        Entre em contato com um dos noivos para informar sobre a compra!
      </span>

      <div className="w-full flex items-center justify-between gap-6">
        <Button
          onClick={handleBack}
          disabled={isPending}
          size="lg"
          variant="outline"
          className="w-full uppercase font-light text-base"
        >
          Voltar
        </Button>

        <Button
          onClick={() =>
            handleGiftSubmit({
              ids: shopProductsAccessed,
              name,
              message,
              giftMethod,
            })
          }
          disabled={isPending || shopProductsAccessed.length === 0}
          size="lg"
          className="w-full uppercase font-light text-base"
        >
          Presentear
          {isPending && <Loader2 className="animate-spin size-4 mb-0.5" />}
        </Button>
      </div>
    </div>
  );
}
