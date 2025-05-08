"use client";

import { useState } from "react";
import { ArrowBigUp, ArrowBigDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { useAction } from "next-safe-action/hooks";
import { addVote } from "./action";

interface VoteButtonsProps {
  initialVotes: number;
  initialVote: number | null;
  gameId: number;
}

const voteVariants = cva(
  "p-1 rounded-md hover:bg-slate-100 transition-colors cursor-pointer",
  {
    variants: {
      active: {
        upvote: "bg-slate-100 text-green-600",
        downvote: "bg-slate-100 text-red-600",
      },
    },
  },
);

const getVoteColor = (votes: number) => {
  if (votes > 0) return "text-green-600";
  if (votes < 0) return "text-red-600";
  return "text-slate-600";
};

export function VoteButtons({
  initialVotes,
  initialVote,
  gameId,
}: VoteButtonsProps) {
  const [userVote, setUserVote] = useState<number | null>(initialVote);
  const { execute, isExecuting } = useAction(addVote);

  const handleVote = async (voteType: number) => {
    setUserVote((prev) => (prev === voteType ? 0 : voteType));

    const voteValue = userVote === voteType ? 0 : voteType;

    execute({
      gameId,
      vote: voteValue,
    });
  };

  return (
    <div className="flex items-center space-x-1">
      <button
        onClick={() => handleVote(1)}
        className={voteVariants({
          active: userVote === 1 ? "upvote" : undefined,
        })}
        aria-label="Upvote"
        disabled={isExecuting}
      >
        <ArrowBigUp className="size-5" />
      </button>

      <span className={cn("font-medium text-sm", getVoteColor(initialVotes))}>
        {initialVotes}
      </span>

      <button
        onClick={() => handleVote(-1)}
        className={voteVariants({
          active: userVote === -1 ? "downvote" : undefined,
        })}
        aria-label="Downvote"
        disabled={isExecuting}
      >
        <ArrowBigDown className="size-5" />
      </button>
    </div>
  );
}
