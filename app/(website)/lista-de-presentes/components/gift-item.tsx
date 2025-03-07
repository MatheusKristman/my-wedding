import Image from "next/image";
import { Dispatch, memo, SetStateAction } from "react";

import { Button } from "@/components/ui/button";

import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/stores/use-cart-store";

interface GiftItemProps {
  id: string;
  imageUrl: string;
  name: string;
  price: number;
  giftsSelected: string[];
  setGiftsSelected: Dispatch<SetStateAction<string[]>>;
}

export const GiftItem = memo(function GiftItem({
  id,
  imageUrl,
  name,
  price,
  giftsSelected,
  setGiftsSelected,
}: GiftItemProps) {
  const { setOpenCart } = useCartStore();

  const addGifts = (giftId: string) => {
    const gifts = [...giftsSelected];

    if (!gifts.includes(giftId)) {
      gifts.push(giftId);
    }

    setGiftsSelected(gifts);
    setOpenCart(true);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="relative aspect-[9/11] w-full rounded-t-2xl overflow-hidden -mb-4">
        <Image src={imageUrl} alt={name} fill className="object-center object-cover" />
      </div>

      <div className="w-full flex-1 bg-secondary p-6 flex flex-col items-center justify-between gap-5 rounded-2xl z-10">
        <span className="w-full h-full flex items-center justify-center font-montserrat font-light uppercase text-lg text-center text-white">
          {name}
        </span>

        <div className="w-full flex flex-col items-center gap-5">
          <div className="w-full flex items-center gap-2">
            <div className="flex-1 h-px bg-white" />

            <span className="font-montserrat text-white text-3xl text-center">{formatPrice(price / 100)}</span>

            <div className="flex-1 h-px bg-white" />
          </div>

          <Button onClick={() => addGifts(id)} size="lg" variant="light" className="w-full rounded-xl font-normal">
            Presentear
          </Button>
        </div>
      </div>
    </div>
  );
});
