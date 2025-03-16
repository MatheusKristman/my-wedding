"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Menu } from "./menu";

export function Header() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen((prev: boolean) => !prev);
  };

  useEffect(() => {
    if (open) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "unset";
    }
  }, [open]);

  return (
    <header className="relative w-full px-6 py-4 flex items-center justify-between gap-6 sm:px-16">
      <Button
        variant="ghost"
        className={cn(
          "font-montserrat uppercase text-base text-foreground !px-0 lg:text-xl",
          open && "z-40 !text-background",
        )}
        onClick={handleOpen}
      >
        <div className="relative flex flex-col justify-center items-center w-[35px] h-3">
          <span
            className={cn(
              "w-full h-px bg-primary top-0 absolute transition-all duration-300",
              open && "top-1/2 translate-y-1/2 -rotate-45 bg-background",
            )}
          />

          <span className={cn("hidden opacity-100", open && "opacity-0")} />

          <span
            className={cn(
              "w-full h-px bg-primary bottom-0 absolute transition-all duration-300",
              open && "static translate-y-1/2 rotate-45 bg-background",
            )}
          />
        </div>
        {open ? "Fechar" : "Menu"}
      </Button>

      <Menu isMenuOpen={open} handleClose={() => setOpen(false)} />

      <Link href="/" className="w-20 h-20 relative lg:w-28 lg:h-28">
        <Image
          src="/logo.svg"
          alt="M&G"
          fill
          className="object-contain object-center"
        />
      </Link>

      <Button
        variant="outline"
        className="hidden font-light sm:flex lg:text-xl lg:px-5 lg:py-2 lg:h-fit"
        asChild
      >
        <Link href="/confirmar-presenca">Presença</Link>
      </Button>
    </header>
  );
}
