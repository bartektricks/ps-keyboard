"use client";

import { useState } from "react";
import { ArrowBigUp, ArrowBigDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

interface VoteButtonsProps {
  initialVotes: number;
  gameId: number;
}

type Vote = "up" | "down";

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

export function VoteButtons({ initialVotes, gameId }: VoteButtonsProps) {
  const [votes, setVotes] = useState(initialVotes);
  const [userVote, setUserVote] = useState<Vote | null>(null);

  const handleVote = (voteType: Vote) => {
    let newVotes = votes;

    // If user is clicking the same button they already clicked, remove their vote
    if (userVote === voteType) {
      newVotes = voteType === "up" ? votes - 1 : votes + 1;
      setUserVote(null);
    }
    // If user is changing their vote from down to up
    else if (userVote === "down" && voteType === "up") {
      newVotes = votes + 2; // Remove downvote and add upvote
      setUserVote("up");
    }
    // If user is changing their vote from up to down
    else if (userVote === "up" && voteType === "down") {
      newVotes = votes - 2; // Remove upvote and add downvote
      setUserVote("down");
    }
    // If user hasn't voted yet
    else {
      newVotes = voteType === "up" ? votes + 1 : votes - 1;
      setUserVote(voteType);
    }

    setVotes(newVotes);
    console.log(gameId);
  };

  return (
    <div className="flex items-center space-x-1">
      <button
        onClick={() => handleVote("up")}
        className={voteVariants({
          active: userVote === "up" ? "upvote" : undefined,
        })}
        aria-label="Upvote"
      >
        <ArrowBigUp className="size-5" />
      </button>

      <span className={cn("font-medium text-sm", getVoteColor(votes))}>
        {votes}
      </span>

      <button
        onClick={() => handleVote("down")}
        className={voteVariants({
          active: userVote === "down" ? "downvote" : undefined,
        })}
        aria-label="Downvote"
      >
        <ArrowBigDown className="size-5" />
      </button>
    </div>
  );
}
