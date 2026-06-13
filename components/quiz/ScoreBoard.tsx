import type { Player } from "./types";

interface ScoreBoardProps {
  players: [Player, Player];
  scores: [number, number];
  /** Index of the player whose turn it is, or null when the round is over. */
  activeIndex: number | null;
}

export function ScoreBoard({ players, scores, activeIndex }: ScoreBoardProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {players.map((player, i) => {
        const isActive = i === activeIndex;
        return (
          <div
            key={i}
            className={`rounded-lg border px-4 py-3 transition-colors ${
              isActive
                ? "border-foreground bg-subtle"
                : "border-border bg-background"
            }`}
          >
            <div className="flex items-baseline justify-between gap-2">
              <span className="truncate text-sm font-medium text-foreground">
                {player.name}
              </span>
              <span className="text-2xl font-semibold tabular-nums text-foreground">
                {scores[i]}
              </span>
            </div>
            <span
              className={`text-xs font-medium uppercase tracking-widest ${
                isActive ? "text-foreground" : "text-muted"
              }`}
            >
              {isActive ? "Your turn" : " "}
            </span>
          </div>
        );
      })}
    </div>
  );
}
