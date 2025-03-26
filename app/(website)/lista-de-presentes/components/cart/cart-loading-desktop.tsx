import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

interface CartLoadingDesktopProps {
  closeCart: () => void;
}

export function CartLoadingDesktop({ closeCart }: CartLoadingDesktopProps) {
  return (
    <div className="w-full my-6 flex flex-col items-center justify-center gap-12">
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
