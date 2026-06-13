"use client";

import { useEffect, useState } from "react";
import type { Question, QuestionOption } from "@/lib/quiz";

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  activePlayerName: string;
  isLast: boolean;
  /** Fired once, the moment the player commits to an option. */
  onAnswer: (option: QuestionOption) => void;
  /** Fired when the player advances past the reveal. */
  onNext: () => void;
}

export function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  activePlayerName,
  isLast,
  onAnswer,
  onNext,
}: QuestionCardProps) {
  const [selected, setSelected] = useState<QuestionOption | null>(null);
  const revealed = selected !== null;

  function handleSelect(option: QuestionOption) {
    if (revealed) return;
    setSelected(option);
    onAnswer(option);
  }

  // Keyboard play: 1–4 to pick, Enter/Space to advance after the reveal.
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (!revealed) {
        const index = Number(e.key) - 1;
        if (index >= 0 && index < question.options.length) {
          e.preventDefault();
          handleSelect(question.options[index]);
        }
        return;
      }
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onNext();
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revealed, question]);

  const { nutrient } = question;

  return (
    <div>
      <div className="flex items-center justify-between text-xs font-medium uppercase tracking-widest text-muted">
        <span>
          Question {questionNumber} of {totalQuestions}
        </span>
        <span>{activePlayerName} to answer</span>
      </div>

      <h2 className="mt-4 text-balance">
        Which has the most {nutrient.label} per 100g?
      </h2>

      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {question.options.map((option, i) => {
          const isPicked = selected?.vegetable.id === option.vegetable.id;
          const showCorrect = revealed && option.isCorrect;
          const showWrong = revealed && isPicked && !option.isCorrect;

          let stateClasses =
            "border-border bg-background hover:border-foreground";
          if (showCorrect) {
            stateClasses = "border-emerald-500 bg-emerald-50 text-emerald-800";
          } else if (showWrong) {
            stateClasses = "border-rose-400 bg-rose-50 text-rose-800";
          } else if (revealed) {
            stateClasses = "border-border bg-background opacity-60";
          }

          return (
            <li key={option.vegetable.id}>
              <button
                type="button"
                onClick={() => handleSelect(option)}
                disabled={revealed}
                className={`flex w-full items-center gap-4 rounded-lg border px-4 py-4 text-left transition-colors disabled:cursor-default ${stateClasses}`}
              >
                <span
                  aria-hidden
                  className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md border border-border text-xs font-semibold text-muted"
                >
                  {i + 1}
                </span>
                <span className="text-2xl" aria-hidden>
                  {option.vegetable.emoji}
                </span>
                <span className="flex-1 font-medium">
                  {option.vegetable.name}
                </span>
                {revealed && (
                  <span className="text-sm font-medium tabular-nums">
                    {option.value}
                    {nutrient.unit}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      {revealed && (
        <div className="mt-8 rounded-lg border border-border bg-subtle p-5">
          <p className="text-sm font-medium text-foreground">
            {selected.isCorrect ? "Correct!" : "Not quite."}{" "}
            {question.options.find((o) => o.isCorrect)?.vegetable.name} wins with{" "}
            {question.options.find((o) => o.isCorrect)?.value}
            {nutrient.unit}.
          </p>
          <p className="mt-2 text-sm text-muted">{nutrient.why}</p>
          <button
            type="button"
            onClick={onNext}
            className="group mt-5 inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
            autoFocus
          >
            {isLast ? "See results" : "Next question"}
            <span
              aria-hidden
              className="transition-transform group-hover:translate-x-0.5"
            >
              →
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
