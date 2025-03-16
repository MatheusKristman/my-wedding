import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuProps {
  isMenuOpen: boolean;
  handleClose: () => void;
}

export function Menu({ isMenuOpen, handleClose }: MenuProps) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "w-screen h-screen bg-black/50 fixed top-0 left-0 right-0 bottom-0 hidden",
        isMenuOpen && "z-30 motion-preset-fade motion-duration-300 block",
      )}
    >
      <div
        className={cn(
          "w-full h-full min-h-full bg-accent px-6 pt-[calc(16px+40px+60px)] pb-4 absolute top-0 left-0 flex flex-col justify-between gap-16 sm:px-16 sm:h-fit sm:min-h-fit sm:w-2/3 sm:pb-14 sm:max-w-lg lg:pt-[calc(16px+40px+60px+32px)]",
        )}
      >
        <ul className="flex flex-col gap-5">
          <li className="group" onClick={handleClose}>
            <Link
              href="/"
              className="flex items-center gap-2 text-background font-montserrat uppercase text-xl"
            >
              <div
                className={cn(
                  "h-px bg-background w-0 transition-all group-hover:w-8",
                  pathname === "/" && "w-8 group-hover:w-8",
                )}
              />
              Início
            </Link>
          </li>

          <li className="group" onClick={handleClose}>
            <Link
              href="/historia-do-casal"
              className="flex items-center gap-2 text-background font-montserrat uppercase text-xl"
            >
              <div
                className={cn(
                  "h-px bg-background w-0 transition-all group-hover:w-8",
                  pathname === "/historia-do-casal" && "w-8 group-hover:w-8",
                )}
              />
              História do Casal
            </Link>
          </li>

          <li className="group" onClick={handleClose}>
            <Link
              href="/data-e-local"
              className="flex items-center gap-2 text-background font-montserrat uppercase text-xl"
            >
              <div
                className={cn(
                  "h-px bg-background w-0 transition-all group-hover:w-8",
                  pathname === "/data-e-local" && "w-8 group-hover:w-8",
                )}
              />
              Data e Local
            </Link>
          </li>

          <li className="group" onClick={handleClose}>
            <Link
              href="/lista-de-presentes"
              className="flex items-center gap-2 text-background font-montserrat uppercase text-xl"
            >
              <div
                className={cn(
                  "h-px bg-background w-0 transition-all group-hover:w-8",
                  pathname === "/lista-de-presentes" && "w-8 group-hover:w-8",
                )}
              />
              Lista de Presentes
            </Link>
          </li>
        </ul>

        <Button
          variant="outline"
          size="lg"
          className="w-full text-lg !border-input !text-background hover:bg-background/15"
          onClick={handleClose}
          asChild
        >
          <Link href="/confirmar-presenca">Confirmar Presença</Link>
        </Button>
      </div>
    </div>
  );
}
