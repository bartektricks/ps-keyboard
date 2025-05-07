"use client";

import { cva } from "class-variance-authority";
import { Button } from "@/components/ui/button";
import { gameFilterParams } from "@/lib/params/game-filter";
import { useQueryStates, type inferParserType } from "nuqs";

const filterVariants = cva(
  "px-4 py-2 rounded-md text-sm font-medium transition-colors",
  {
    variants: {
      active: {
        false: "bg-slate-100 text-slate-700 hover:bg-slate-200",
        true: "bg-blue-600 hover:bg-blue-700 text-white",
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);

export function FilterButton({
  children,
  filter,
}: React.PropsWithChildren<{
  filter: inferParserType<typeof gameFilterParams.filter>;
}>) {
  const [params, setParams] = useQueryStates(gameFilterParams);

  return (
    <Button
      onClick={() => {
        setParams({ filter });
      }}
      className={filterVariants({
        active: params.filter === filter,
      })}
    >
      {children}
    </Button>
  );
}
