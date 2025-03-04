import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface CartLoadingMobileProps {
  closeCart: () => void;
}

export function CartLoadingMobile({ closeCart }: CartLoadingMobileProps) {
  return (
    <div className="w-full mt-6 mb-6 flex flex-col items-center justify-center gap-12">
      <Loader2 className="animate-spin size-12" strokeWidth={1.5} />

      <Button
        onClick={closeCart}
        size="lg"
        className="w-fit uppercase font-light text-base"
      >
        Fechar
      </Button>
    </div>
  );
}
