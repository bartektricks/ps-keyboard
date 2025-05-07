"use client";

import { useGetGameFilterParams } from "@/hooks/useGetGameFilterParams";
import { serializeGameFilterParams } from "@/lib/params/game-filter";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, LucideIcon } from "lucide-react";
import Link from "next/link";

type Direction = "left" | "right";

interface ChevronButtonProps {
  direction: Direction;
  currentPage: number;
  totalPages: number;
}

const chevronButtonLabel: Record<Direction, string> = {
  left: "Previous Page",
  right: "Next Page",
};

const chevronButtonIcon: Record<Direction, LucideIcon> = {
  left: ChevronLeft,
  right: ChevronRight,
};

export function ChevronButton({
  direction,
  currentPage,
  totalPages,
}: ChevronButtonProps) {
  const [params] = useGetGameFilterParams();

  const url = serializeGameFilterParams({
    ...params,
    page: currentPage + (direction === "right" ? 1 : -1),
  });

  const Icon = chevronButtonIcon[direction];

  const isDisabled =
    (direction === "left" && currentPage > 1) ||
    (direction === "right" && currentPage < totalPages);

  return (
    <Link
      href={url}
      className={`p-2 rounded-md ${isDisabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}`}
      aria-disabled={isDisabled}
      tabIndex={isDisabled ? -1 : 0}
    >
      <Icon className="size-5" />
      <span className="sr-only">{chevronButtonLabel[direction]}</span>
    </Link>
  );
}

interface PageButtonProps {
  page: number;
}

export function PageButton({ page }: PageButtonProps) {
  const [params] = useGetGameFilterParams();
  const isCurrentPage = page === params.page;

  const url = serializeGameFilterParams({
    ...params,
    page,
  });

  return (
    <Link
      href={url}
      className={cn(
        `px-3 py-2 rounded-md`,
        isCurrentPage
          ? "bg-blue-600 text-white font-medium pointer-events-none"
          : "text-slate-600 hover:bg-slate-100",
      )}
    >
      {page}
    </Link>
  );
}
