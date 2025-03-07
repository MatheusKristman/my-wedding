import { create } from "zustand";

interface CartState {
  openCart: boolean;
  name: string;
  message: string;
  giftMethod: string;
  methodSelected: string;
  setOpenCart: (open: boolean) => void;
  setName: (name: string) => void;
  setMessage: (message: string) => void;
  setGiftMethod: (giftMethod: string) => void;
  setMethodSelected: (method: string) => void;
  resetCartStore: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  openCart: false,
  name: "",
  message: "",
  giftMethod: "shop",
  methodSelected: "",
  setOpenCart: (open) => set({ openCart: open }),
  setName: (name) => set({ name }),
  setMessage: (message) => set({ message }),
  setGiftMethod: (giftMethod) => set({ giftMethod }),
  setMethodSelected: (method) => set({ methodSelected: method }),
  resetCartStore: () =>
    set({
      name: "",
      message: "",
      giftMethod: "shop",
      methodSelected: "",
      openCart: false,
    }),
}));
