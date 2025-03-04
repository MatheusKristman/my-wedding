import { Button } from "@/components/ui/button";

interface CartNoItemDesktopProps {
  closeCart: () => void;
}

export function CartNoItemDesktop({ closeCart }: CartNoItemDesktopProps) {
  return (
    <div className="w-full mt-6 flex flex-col items-center justify-center gap-12">
      <div>
        <span className="block w-full text-center uppercase text-xl text-primary/35">
          Carrinho vazio
        </span>
      </div>

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
