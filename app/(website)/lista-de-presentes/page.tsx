"use client";

import { useQueryState } from "nuqs";
import { Gifts } from "@prisma/client";
import { Suspense, useEffect, useState } from "react";
import { useWindowSize, useSessionStorage } from "@uidotdev/usehooks";

import { GiftItem } from "./components/gift-item";
import { Skeleton } from "@/components/ui/skeleton";
import { CartDialog } from "./components/cart-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { cn } from "@/lib/utils";
import { trpc } from "@/lib/trpc-client";
import { useCartStore } from "@/stores/use-cart-store";

function GiftsList() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [windowMode, setWindowMode] = useState<string>("");
  const [itemsPerPage, setItemsPerPage] = useState<number>(8);
  const [gifts, setGifts] = useState<Gifts[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [visiblePageButtons, setVisiblePageButtons] = useState<number>(0);

  const { openCart } = useCartStore();

  const [page, setPage] = useQueryState("page");
  const [filter, setFilter] = useQueryState("filter", { defaultValue: "a_z" });

  const [giftsSelected, setGiftsSelected] = useSessionStorage<string[]>("gifts", []);

  const windowSize = useWindowSize();

  const { data, refetch, isLoading } = trpc.giftsRouter.getGifts.useQuery({
    page: page ? Number(page) : 1,
    items: itemsPerPage,
    filter: filter ?? "a_z",
  });

  const halfVisible = Math.floor(visiblePageButtons / 2);

  useEffect(() => {
    if (data) {
      setGifts(data.gifts);
      setTotalPages(data.pages);
    }
  }, [data]);

  useEffect(() => {
    if (windowSize.width) {
      if (windowSize.width < 640) {
        if (windowMode !== "Mobile") {
          setWindowMode("Mobile");
        } else {
          return;
        }
      } else if (windowSize.width < 1024) {
        if (windowMode !== "Tablet") {
          setWindowMode("Tablet");
        } else {
          return;
        }
      } else if (windowSize.width < 1280) {
        if (windowMode !== "Small Screen") {
          setWindowMode("Small Screen");
        } else {
          return;
        }
      } else {
        if (windowMode !== "Large Screen") {
          setWindowMode("Large Screen");
        } else {
          return;
        }
      }
    }
  }, [windowSize]);

  useEffect(() => {
    if (windowMode === "Mobile") {
      setItemsPerPage(3);
      setVisiblePageButtons(4);
      setPage("1");

      refetch();
    }

    if (windowMode === "Tablet") {
      setItemsPerPage(4);
      setVisiblePageButtons(6);
      setPage("1");

      refetch();
    }

    if (windowMode === "Small Screen") {
      setItemsPerPage(6);
      setVisiblePageButtons(12);
      setPage("1");

      refetch();
    }

    if (windowMode === "Large Screen") {
      setItemsPerPage(8);
      setVisiblePageButtons(12);
      setPage("1");

      refetch();
    }
  }, [windowMode, refetch]);

  useEffect(() => {
    if (page) {
      setCurrentPage(Number(page));
    }
  }, [page]);

  const handleGiftsRefetch = () => {
    refetch();
  };

  const handlePreviousButton = () => {
    if (currentPage !== 1) {
      return `${window.origin}/lista-de-presentes?page=${currentPage - 1}&filter=${filter}`;
    } else {
      return `${window.origin}/lista-de-presentes?page=${currentPage}&filter=${filter}`;
    }
  };

  const handleNextButton = () => {
    if (currentPage !== totalPages) {
      return `${window.origin}/lista-de-presentes?page=${currentPage + 1}&filter=${filter}`;
    } else {
      return `${window.origin}/lista-de-presentes?page=${currentPage}&filter=${filter}`;
    }
  };

  const getPageButtons = () => {
    const buttons: number[] = [];

    if (data) {
      let startPage = Math.max(1, currentPage - halfVisible);
      let endPage = Math.min(totalPages, currentPage + halfVisible);

      if (endPage - startPage + 1 < visiblePageButtons) {
        if (startPage === 1) {
          endPage = Math.min(totalPages, startPage + visiblePageButtons - 1);
        } else if (endPage === totalPages) {
          startPage = Math.max(1, endPage - visiblePageButtons + 1);
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        buttons.push(i);
      }

      return buttons;
    } else {
      return buttons;
    }
  };

  if (isLoading) {
    return (
      <section className="w-full mb-24">
        <div className="w-full flex items-center gap-2 mb-12">
          <div className="w-[10%] flex-1 h-px bg-primary/15 sm:w-full" />

          <h1 className="w-[80%] font-fonde text-5xl text-center sm:w-fit lg:text-7xl">Lista de Presentes</h1>

          <div className="w-[10%] flex-1 h-px bg-primary/15 sm:w-full" />
        </div>

        <div className="w-full px-6 flex items-center gap-5 mb-12 sm:px-16 sm:justify-between lg:container lg:mx-auto">
          <Skeleton className="w-12 h-12 lg:w-[200px] rounded-none" />

          <Skeleton className="h-12 w-full sm:w-48 lg:w-60 rounded-none" />
        </div>

        <div className="w-full px-6 flex flex-col gap-24 sm:px-16 lg:container lg:mx-auto">
          <div className="w-full grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <Skeleton className="w-full h-[370px] rounded-2xl" />
            <Skeleton className="w-full h-[370px] rounded-2xl" />
            <Skeleton className="w-full h-[370px] rounded-2xl" />
            <Skeleton className="w-full h-[370px] rounded-2xl" />
          </div>

          <div className="w-full flex items-center justify-between gap-6 mb-24">
            <Skeleton className="h-12 w-12 rounded-none" />

            <div className="flex-1 flex items-center gap-6">
              <Skeleton className="h-12 w-12 rounded-none" />

              <Skeleton className="h-12 w-12 rounded-none" />

              <Skeleton className="h-12 w-12 rounded-none" />
            </div>

            <Skeleton className="h-12 w-12 rounded-none" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full mb-24">
      <div className="w-full flex items-center gap-2 mb-12">
        <div className="w-[10%] flex-1 h-px bg-primary/15 sm:w-full" />

        <h1 className="w-[80%] font-fonde text-5xl text-center sm:w-fit lg:text-7xl">Lista de Presentes</h1>

        <div className="w-[10%] flex-1 h-px bg-primary/15 sm:w-full" />
      </div>

      <div className="w-full px-6 flex items-center gap-5 mb-12 sm:px-16 sm:justify-between lg:container lg:mx-auto">
        <CartDialog
          width={windowSize.width}
          openCart={openCart}
          giftsSelected={giftsSelected}
          setGiftsSelected={setGiftsSelected}
          handleGiftsRefetch={handleGiftsRefetch}
        />

        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-full sm:w-48 lg:w-60">
            <SelectValue placeholder="Alterar a ordem" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="a_z">A - Z</SelectItem>
            <SelectItem value="desc_price">Maior preço</SelectItem>
            <SelectItem value="asc_price">Menor preço</SelectItem>
            <SelectItem value="favorites">Favoritos dos noivos</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full px-6 flex flex-col gap-24 sm:px-16 lg:container lg:mx-auto">
        <div className="w-full grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* Item do produto */}
          {gifts.length > 0
            ? gifts.map((gift) => (
                <GiftItem
                  key={gift.id}
                  id={gift.id}
                  imageUrl={gift.imageUrl}
                  name={gift.name}
                  price={gift.price}
                  giftsSelected={giftsSelected}
                  setGiftsSelected={setGiftsSelected}
                />
              ))
            : null}
        </div>

        {data ? (
          <Pagination>
            <PaginationContent className="w-full flex justify-center">
              <PaginationItem>
                <PaginationPrevious
                  href={handlePreviousButton()}
                  className={cn({
                    "opacity-50 pointer-events-none cursor-not-allowed": currentPage === 1,
                  })}
                />
              </PaginationItem>

              {getPageButtons().map((pageNumber) => (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    isActive={pageNumber === Number(page)}
                    href={`${window.origin}/lista-de-presentes?page=${pageNumber}&filter=${filter}`}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href={handleNextButton()}
                  className={cn({
                    "opacity-50 pointer-events-none cursor-not-allowed": currentPage === totalPages,
                  })}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        ) : null}
      </div>
    </section>
  );
}

export default function GiftsListPage() {
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <Suspense>
      <GiftsList />
    </Suspense>
  );
}
