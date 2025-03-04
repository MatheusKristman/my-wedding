import { Button } from "@/components/ui/button";

interface CartNoItemMobileProps {
  closeCart: () => void;
}

export function CartNoItemMobile({ closeCart }: CartNoItemMobileProps) {
  return (
    <div className="w-full mt-12 mb-6 flex flex-col items-center justify-center gap-12">
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
