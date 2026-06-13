"use client";

import { useState } from "react";
import type { Player } from "./types";

const QUESTION_COUNTS = [6, 10, 14] as const;

interface SetupScreenProps {
  defaultPlayers: [string, string];
  onStart: (players: [Player, Player], questionCount: number) => void;
}

export function SetupScreen({ defaultPlayers, onStart }: SetupScreenProps) {
  const [nameA, setNameA] = useState(defaultPlayers[0]);
  const [nameB, setNameB] = useState(defaultPlayers[1]);
  const [questionCount, setQuestionCount] = useState<number>(10);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const a = nameA.trim() || defaultPlayers[0];
    const b = nameB.trim() || defaultPlayers[1];
    onStart([{ name: a }, { name: b }], questionCount);
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="text-sm font-medium uppercase tracking-widest text-muted">
        Head-to-head
      </p>
      <h1 className="mt-4 text-balance">Veg Match</h1>
      <p className="mt-6 max-w-2xl text-lg text-muted">
        Two players, taking turns. Each question names a nutrient — pick the
        vegetable richest in it per 100g. Most correct picks wins. Every answer
        is checked against real USDA nutrition data.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className="text-xs font-medium uppercase tracking-widest text-muted">
            Player 1
          </span>
          <input
            type="text"
            value={nameA}
            onChange={(e) => setNameA(e.target.value)}
            maxLength={24}
            className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-lg font-medium text-foreground outline-none focus-visible:border-foreground"
            aria-label="Player 1 name"
          />
        </label>
        <label className="block">
          <span className="text-xs font-medium uppercase tracking-widest text-muted">
            Player 2
          </span>
          <input
            type="text"
            value={nameB}
            onChange={(e) => setNameB(e.target.value)}
            maxLength={24}
            className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-lg font-medium text-foreground outline-none focus-visible:border-foreground"
            aria-label="Player 2 name"
          />
        </label>
      </div>

      <fieldset className="mt-10">
        <legend className="text-xs font-medium uppercase tracking-widest text-muted">
          Questions per round
        </legend>
        <div className="mt-3 flex gap-2">
          {QUESTION_COUNTS.map((count) => {
            const isActive = count === questionCount;
            return (
              <button
                key={count}
                type="button"
                onClick={() => setQuestionCount(count)}
                aria-pressed={isActive}
                className={`rounded-lg border px-5 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted hover:border-foreground hover:text-foreground"
                }`}
              >
                {count}
              </button>
            );
          })}
        </div>
      </fieldset>

      <button
        type="submit"
        className="group mt-12 inline-flex items-center gap-2 rounded-lg bg-foreground px-6 py-3.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
      >
        Start the match
        <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
          →
        </span>
      </button>
    </form>
  );
}
