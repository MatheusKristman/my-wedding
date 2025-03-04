import { ShoppingCartIcon } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

import { Button } from "@/components/ui/button";
import { CartPixMobile } from "./cart-pix-mobile";
import { CartPixDesktop } from "./cart-pix-desktop";
import { CartShopMobile } from "./cart-shop-mobile";
import { CartShopDesktop } from "./cart-shop-desktop";
import { CartResumeMobile } from "./cart-resume-mobile";
import { CartNoItemMobile } from "./cart-no-item-mobile";
import { CartLoadingMobile } from "./cart-loading-mobile";
import { CartResumeDesktop } from "./cart-resume-desktop";
import { CartNoItemDesktop } from "./cart-no-item-desktop";
import { CartLoadingDesktop } from "./cart-loading-desktop";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";

import { trpc } from "@/lib/trpc-client";
import { cn } from "@/lib/utils";

interface CartDialogProps {
  width: number | null;
  openCart: boolean;
  giftsSelected: string[];
  setGiftsSelected: Dispatch<SetStateAction<string[]>>;
  setOpenCart: Dispatch<SetStateAction<boolean>>;
}

export function CartDialog({ width, openCart, giftsSelected, setGiftsSelected, setOpenCart }: CartDialogProps) {
  const [methodSelected, setMethodSelected] = useState("");

  const { data, refetch, isLoading } = trpc.giftsRouter.getCartGifts.useQuery({
    ids: giftsSelected,
  });

  const totalPrice = data?.map((gift) => gift.price).reduce((acc, curr) => acc + curr, 0);

  const removeGift = (giftId: string) => {
    const giftsFiltered = giftsSelected.filter((id) => id !== giftId);

    setGiftsSelected(giftsFiltered);
    refetch();
  };

  if (width === null) {
    return;
  }

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
        <DrawerHeader className="px-6 pt-6 pb-0">
          <DrawerTitle className="uppercase font-light text-2xl text-left font-montserrat">Seu carrinho</DrawerTitle>
        </DrawerHeader>

        {isLoading ? (
          <CartLoadingMobile closeCart={() => setOpenCart(false)} />
        ) : data && totalPrice && data.length > 0 ? (
          <>
            {methodSelected === "pix" ? (
              <CartPixMobile totalPrice={totalPrice} />
            ) : methodSelected === "shop" ? (
              <CartShopMobile gifts={data} />
            ) : (
              <CartResumeMobile
                gifts={data}
                removeGift={removeGift}
                closeCart={() => setOpenCart(false)}
                totalPrice={totalPrice}
              />
            )}
          </>
        ) : (
          <CartNoItemMobile closeCart={() => setOpenCart(false)} />
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
        className={cn("sm:rounded-none !max-w-3xl", {
          "!max-w-xl": !data || data.length === 0 || methodSelected === "pix" || methodSelected === "shop",
        })}
      >
        <DialogHeader>
          <DialogTitle className="uppercase font-light text-2xl font-montserrat">Seu carrinho</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <CartLoadingDesktop closeCart={() => setOpenCart(false)} />
        ) : data && totalPrice && data.length > 0 ? (
          <>
            {methodSelected === "pix" ? (
              <CartPixDesktop totalPrice={totalPrice} setMethodSelected={setMethodSelected} />
            ) : methodSelected === "shop" ? (
              <CartShopDesktop gifts={data} setMethodSelected={setMethodSelected} />
            ) : (
              <CartResumeDesktop
                gifts={data}
                totalPrice={totalPrice}
                removeGift={removeGift}
                closeCart={() => setOpenCart(false)}
                setMethodSelected={setMethodSelected}
              />
            )}
          </>
        ) : (
          <CartNoItemDesktop closeCart={() => setOpenCart(false)} />
        )}
      </DialogContent>
    </Dialog>
  );
}
