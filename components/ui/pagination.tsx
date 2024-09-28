"use client";

import {
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { generatePagination } from "@/utils/root.utils";
import { usePathname, useSearchParams } from "next/navigation";
import { Button } from "./button";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams?.get("page")) || 1;

  // const currentPageSize = Number(searchParams?.get("size")) || 5;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", pageNumber.toString());

    return `${pathname}?${params.toString()}`;
  };

  // const createPageSizeURL = (size: number | string) => {
  //   const params = new URLSearchParams(searchParams);

  //   params.set("size", size.toString());

  //   return `${pathname}?${params.toString()}`;
  // };

  const allPages = generatePagination(currentPage, totalPages);

  return (
    <>
      <div className="flex justify-center items-center md:justify-between">
        <Link
          href={createPageURL(currentPage - 1)}
          className="aria-disabled:pointer-events-none hidden md:block"
          aria-label="Previous Link"
          aria-disabled={currentPage <= 1}
        >
          <Button
            variant="default"
            size="default"
            aria-label="Previous Page"
            aria-disabled={currentPage <= 1}
          >
            Prev
          </Button>
        </Link>
        <div className="inline-flex">
          <PaginationArrow
            direction="left"
            href={createPageURL(currentPage - 1)}
            isDisabled={currentPage <= 1}
          />

          <div className="flex -space-x-px">
            {allPages.map((page, index) => {
              let position: "first" | "last" | "single" | "middle" | undefined;

              if (index === 0) position = "first";
              if (index === allPages.length - 1) position = "last";
              if (allPages.length === 1) position = "single";
              if (page === "...") position = "middle";

              return (
                <PaginationNumber
                  key={`${page}-_${index}`}
                  href={createPageURL(page)}
                  page={page}
                  position={position}
                  isActive={currentPage === page}
                />
              );
            })}
          </div>

          <PaginationArrow
            direction="right"
            href={createPageURL(currentPage + 1)}
            isDisabled={currentPage >= totalPages}
          />
        </div>
        <Link
          href={createPageURL(currentPage + 1)}
          className="aria-disabled:pointer-events-none hidden md:block"
          aria-label="Next Page"
          aria-disabled={currentPage >= totalPages}
        >
          <Button
            variant="default"
            size="default"
            aria-label="Next Page"
            aria-disabled={currentPage >= totalPages}
          >
            Next
          </Button>
        </Link>
      </div>
    </>
  );
}

function PaginationNumber({
  page,
  href,
  isActive,
  position,
}: {
  page: number | string;
  href: string;
  position?: "first" | "last" | "middle" | "single";
  isActive: boolean;
}) {
  const className = clsx(
    "flex h-9 w-9 items-center justify-center text-sm border border-zinc-300 dark:border-zinc-700",
    {
      "rounded-l-lg": position === "first" || position === "single",
      "rounded-r-lg": position === "last" || position === "single",
      "z-10 bg-blue-600 dark:bg-neutral-600  text-white": isActive,
      "hover:bg-gray-100 dark:hover:bg-zinc-800":
        !isActive && position !== "middle",
      "text-gray-300": position === "middle",
    }
  );

  return isActive || position === "middle" ? (
    <div className={className}>{page}</div>
  ) : (
    <Link aria-label={page.toString()} href={href} className={className}>
      {page}
    </Link>
  );
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: "left" | "right";
  isDisabled?: boolean;
}) {
  const className = clsx(
    "flex h-9 w-9 items-center justify-center rounded-md border border-zinc-300 dark:border-zinc-700",
    {
      "pointer-events-none text-gray-300": isDisabled,
      "hover:bg-gray-100 dark:hover:bg-zinc-800": !isDisabled,
      "mr-2 md:mr-4": direction === "left",
      "ml-2 md:ml-4": direction === "right",
    }
  );

  const icon =
    direction === "left" ? (
      <ArrowLeftIcon className="w-4" />
    ) : (
      <ArrowRightIcon className="w-4" />
    );

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link aria-label={direction} className={className} href={href}>
      {icon}
    </Link>
  );
}
