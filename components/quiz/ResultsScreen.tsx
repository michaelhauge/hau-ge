"use client";

import type { AnswerRecord, Player } from "./types";

interface ResultsScreenProps {
  players: [Player, Player];
  scores: [number, number];
  records: AnswerRecord[];
  onPlayAgain: () => void;
}

export function ResultsScreen({
  players,
  scores,
  records,
  onPlayAgain,
}: ResultsScreenProps) {
  const [scoreA, scoreB] = scores;
  const isTie = scoreA === scoreB;
  const winnerIndex = scoreA > scoreB ? 0 : 1;

  const headline = isTie
    ? "It's a tie!"
    : `${players[winnerIndex].name} wins!`;

  return (
    <div>
      <p className="text-sm font-medium uppercase tracking-widest text-muted">
        Final score
      </p>
      <h1 className="mt-4 text-balance">{headline}</h1>

      <div className="mt-8 grid grid-cols-2 gap-3">
        {players.map((player, i) => {
          const isWinner = !isTie && i === winnerIndex;
          return (
            <div
              key={i}
              className={`rounded-lg border px-5 py-5 ${
                isWinner ? "border-foreground bg-subtle" : "border-border"
              }`}
            >
              <div className="truncate text-sm font-medium text-muted">
                {player.name}
              </div>
              <div className="mt-1 text-4xl font-semibold tabular-nums text-foreground">
                {scores[i]}
              </div>
            </div>
          );
        })}
      </div>

      <h3 className="mt-12 text-lg font-semibold">Round recap</h3>
      <ol className="mt-4 divide-y divide-border border-y border-border">
        {records.map((record, i) => {
          const winner = record.question.options.find((o) => o.isCorrect);
          return (
            <li
              key={i}
              className="flex items-center gap-4 py-3 text-sm"
            >
              <span
                aria-hidden
                className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                  record.correct
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-rose-100 text-rose-700"
                }`}
              >
                {record.correct ? "✓" : "✗"}
              </span>
              <span className="flex-1 text-muted">
                <span className="font-medium text-foreground">
                  {players[record.playerIndex].name}
                </span>{" "}
                · most {record.question.nutrient.label}:{" "}
                <span className="font-medium text-foreground">
                  {winner?.vegetable.name}
                </span>
              </span>
            </li>
          );
        })}
      </ol>

      <button
        type="button"
        onClick={onPlayAgain}
        className="group mt-10 inline-flex items-center gap-2 rounded-lg bg-foreground px-6 py-3.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
      >
        Play again
        <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
          ↻
        </span>
      </button>
    </div>
  );
}
