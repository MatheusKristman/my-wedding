"use client";

import Image from "next/image";
import { Gifts } from "@prisma/client";
import { useEffect, useState } from "react";
import { ShoppingCartIcon } from "lucide-react";
import { useWindowSize } from "@uidotdev/usehooks";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { trpc } from "@/lib/trpc-client";
import { formatPrice } from "@/lib/utils";

export default function GiftsListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [windowMode, setWindowMode] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [gifts, setGifts] = useState<Gifts[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [visiblePageButtons, setVisiblePageButtons] = useState(0);

  const searchParams = useSearchParams();
  const router = useRouter();
  const page = searchParams.get("page");
  const windowSize = useWindowSize();

  const { data, refetch, isLoading } = trpc.giftsRouter.getGifts.useQuery({
    page: page ? Number(page) : 1,
    items: itemsPerPage,
  });

  const halfVisible = Math.floor(visiblePageButtons / 2);

  useEffect(() => {
    if (data) {
      console.log("Dados atualizados");
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
      console.log({ windowMode });
      setItemsPerPage(3);
      setVisiblePageButtons(4);
      router.push("http://localhost:3000/lista-de-presentes?page=1");

      refetch();
    }

    if (windowMode === "Tablet") {
      console.log({ windowMode });
      setItemsPerPage(4);
      setVisiblePageButtons(6);
      router.push("http://localhost:3000/lista-de-presentes?page=1");

      refetch();
    }

    if (windowMode === "Small Screen") {
      console.log({ windowMode });
      setItemsPerPage(6);
      setVisiblePageButtons(12);
      router.push("http://localhost:3000/lista-de-presentes?page=1");

      refetch();
    }

    if (windowMode === "Large Screen") {
      console.log({ windowMode });
      setItemsPerPage(8);
      setVisiblePageButtons(12);
      router.push("http://localhost:3000/lista-de-presentes?page=1");

      refetch();
    }
  }, [windowMode, refetch]);

  useEffect(() => {
    if (page) {
      setCurrentPage(Number(page));
    }
  }, [page]);

  const getPageButtons = () => {
    const buttons: number[] = [];

    if (data) {
      let startPage = Math.max(1, currentPage - halfVisible);
      let endPage = Math.min(totalPages, currentPage + halfVisible);

      console.log({
        startPage,
        endPage,
        currentPage,
        halfVisible,
        startPageCalc: currentPage - halfVisible,
        endPageCalc: currentPage + halfVisible,
      });

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

      console.log({ buttons });
      console.log({ visiblePageButtons });

      return buttons;
    } else {
      return buttons;
    }
  };

  if (isLoading) {
    return (
      <section className="w-full">
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
    <section className="w-full">
      <div className="w-full flex items-center gap-2 mb-12">
        <div className="w-[10%] flex-1 h-px bg-primary/15 sm:w-full" />

        <h1 className="w-[80%] font-fonde text-5xl text-center sm:w-fit lg:text-7xl">Lista de Presentes</h1>

        <div className="w-[10%] flex-1 h-px bg-primary/15 sm:w-full" />
      </div>

      <div className="w-full px-6 flex items-center gap-5 mb-12 sm:px-16 sm:justify-between lg:container lg:mx-auto">
        <Button size="lg" className="w-12 lg:w-fit">
          <ShoppingCartIcon />

          <span className="hidden lg:block uppercase">Carrinho Vazio</span>
        </Button>

        <Select>
          <SelectTrigger className="w-full sm:w-48 lg:w-60">
            <SelectValue placeholder="Alterar a ordem" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="a_z">A - Z</SelectItem>
            <SelectItem value="asc">Maior preço</SelectItem>
            <SelectItem value="desc">Menor preço</SelectItem>
            <SelectItem value="favorites">Favoritos dos noivos</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full px-6 flex flex-col gap-24 sm:px-16 lg:container lg:mx-auto">
        <div className="w-full grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* Item do produto */}
          {gifts.length > 0
            ? gifts.map((gift) => (
                <div key={gift.id} className="w-full flex flex-col">
                  <div className="relative aspect-square w-full rounded-t-2xl overflow-hidden -mb-4">
                    <Image src={gift.imageUrl} alt={gift.name} fill className="object-center object-cover" />
                  </div>

                  <div className="w-full bg-secondary p-6 flex flex-col items-center gap-5 rounded-2xl z-10">
                    <div className="w-full flex flex-col items-center gap-2">
                      <div className="w-full flex items-center gap-2">
                        <div className="flex-1 h-px bg-white" />

                        <span className="font-montserrat font-light uppercase text-lg text-center text-white">
                          {gift.name}
                        </span>

                        <div className="flex-1 h-px bg-white" />
                      </div>

                      <span className="font-montserrat text-white text-3xl text-center">
                        {formatPrice(gift.price / 100)}
                      </span>
                    </div>

                    <Button size="lg" variant="light" className="w-full rounded-xl font-normal">
                      Presentear
                    </Button>
                  </div>
                </div>
              ))
            : null}
        </div>

        {data ? (
          <Pagination>
            <PaginationContent className="w-full flex justify-center">
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              {currentPage > halfVisible + 1 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              {getPageButtons().map((pageNumber) => (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    isActive={pageNumber === Number(page)}
                    href={`http://localhost:3000/lista-de-presentes?page=${pageNumber}`}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              ))}

              {currentPage < totalPages - halfVisible - 1 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        ) : null}

        {/* <div className="w-full flex items-center justify-center gap-6 mb-24">
          <Button size="lg" variant="outline" className="!h-12 w-12">
            <ChevronLeftIcon strokeWidth={1} />
          </Button>

          <div className="flex items-center gap-6">
            {data
              ? Array.from({ length: data.pages }, (_, index) => (
                  <Button key={index} size="lg" variant="outline" className="!h-12 w-12" asChild>
                    <Link href={`http://localhost:3000/lista-de-presentes?page=${index + 1}`}>{index + 1}</Link>
                  </Button>
                ))
              : null}
          </div>

          <Button size="lg" variant="outline" className="!h-12 w-12">
            <ChevronRightIcon strokeWidth={1} />
          </Button>
        </div> */}
      </div>
    </section>
  );
}
