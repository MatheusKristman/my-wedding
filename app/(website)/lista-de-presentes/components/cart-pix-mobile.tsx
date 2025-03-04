import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { Copy } from "lucide-react";
import { useQRCode } from "next-qrcode";

interface CartPixMobileProps {
  totalPrice: number;
}

// TODO: adicionar responsividade na altura

export function CartPixMobile({ totalPrice }: CartPixMobileProps) {
  const { Canvas } = useQRCode();

  return (
    <div className="w-full px-6 pt-5 pb-8">
      <h4 className="font-montserrat text-xl font-light text-primary/50 uppercase mb-9">
        Faça o pix na opção que achar melhor
      </h4>

      <div className="w-full flex flex-col items-center gap-5 mb-9">
        <div className="relative w-full max-w-64 aspect-square [&_canvas]:!w-full [&_canvas]:!h-full">
          <Canvas text={"https://github.com/bunlong/next-qrcode"} />
        </div>

        <div className="w-full max-w-64 bg-secondary h-11 px-5 relative flex items-center justify-between">
          <span className="font-montserrat text-xl text-background font-light uppercase">123.123.123-12</span>

          <Button variant="ghost" size="icon" className="text-background">
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

      <div className="w-full flex flex-col-reverse gap-6">
        <Button variant="outline" size="lg" className="w-full">
          Voltar
        </Button>

        <Button size="lg" className="w-full">
          Presentear
        </Button>
      </div>
    </div>
  );
}
