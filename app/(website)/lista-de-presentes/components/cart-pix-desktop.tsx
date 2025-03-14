import { toast } from "sonner";
import { useQRCode } from "next-qrcode";
import { Copy, Loader2 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { useCopyToClipboard } from "@uidotdev/usehooks";

import { Button } from "@/components/ui/button";

import { trpc } from "@/lib/trpc-client";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/stores/use-cart-store";

interface CartPixDesktopProps {
  totalPrice: number;
  shopProductsAccessed: string[];
  handleReset: () => void;
  setShopProductsAccessed: Dispatch<SetStateAction<string[]>>;
}

export function CartPixDesktop({
  totalPrice,
  shopProductsAccessed,
  handleReset,
  setShopProductsAccessed,
}: CartPixDesktopProps) {
  const emailPix = "gih.galhardo@gmail.com";

  const { name, message, giftMethod, setMethodSelected } = useCartStore();

  const [, copyToClipboard] = useCopyToClipboard();

  const { Canvas } = useQRCode();

  const { mutate: handleGiftSubmit, isPending } = trpc.giftsRouter.handleGiftSubmit.useMutation({
    onSuccess: () => {
      toast.success("Obrigado por nos presentear!");

      handleReset();
      setShopProductsAccessed([]);
    },
    onError: (err) => {
      toast.error("Ocorreu um erro ao registrar os presentes, tente novamente mais tarde.");

      console.error(err);
    },
  });

  return (
    <div className="w-full">
      <h4 className="font-montserrat text-xl font-light text-primary/50 uppercase mb-9">
        Faça o pix na opção que achar melhor
      </h4>

      <div className="w-full flex flex-col items-center gap-5 mb-9">
        <div className="relative w-full max-w-64 aspect-square [&_canvas]:!w-full [&_canvas]:!h-full">
          <Canvas text={process.env.NEXT_PUBLIC_PIX_QR_CODE!} />
        </div>

        <div className="w-full max-w-[350px] bg-secondary h-11 px-5 relative flex items-center justify-between">
          <span className="font-montserrat text-base text-background font-light uppercase">{emailPix}</span>

          <Button onClick={() => copyToClipboard(emailPix)} variant="ghost" size="icon" className="text-background">
            <Copy />
          </Button>
        </div>
      </div>

      <div className="border-t border-primary/35 w-full pt-4 flex items-center justify-between mb-12">
        <span className="font-montserrat text-xl text-primary font-light uppercase">Total</span>

        <span className="font-montserrat text-xl text-primary font-light uppercase">
          {formatPrice(totalPrice / 100)}
        </span>
      </div>

      <div className="w-full flex items-center justify-between gap-6">
        <Button
          onClick={() => setMethodSelected("")}
          variant="outline"
          size="lg"
          className="w-full uppercase font-light text-base"
        >
          Voltar
        </Button>

        <Button
          onClick={() => handleGiftSubmit({ name, message, giftMethod, ids: shopProductsAccessed })}
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
