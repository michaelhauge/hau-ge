"use client";

import { useState } from "react";
import { generateQuestions, type Question, type QuestionOption } from "@/lib/quiz";
import { SetupScreen } from "./SetupScreen";
import { ScoreBoard } from "./ScoreBoard";
import { QuestionCard } from "./QuestionCard";
import { ResultsScreen } from "./ResultsScreen";
import type { AnswerRecord, Player } from "./types";

type Phase = "setup" | "playing" | "results";

const DEFAULT_PLAYERS: [string, string] = ["Michael", "Deha"];

interface GameState {
  players: [Player, Player];
  questions: Question[];
  current: number;
  scores: [number, number];
  records: AnswerRecord[];
}

export function NutritionQuiz() {
  const [phase, setPhase] = useState<Phase>("setup");
  const [game, setGame] = useState<GameState | null>(null);

  function startGame(players: [Player, Player], questionCount: number) {
    setGame({
      players,
      questions: generateQuestions(questionCount),
      current: 0,
      scores: [0, 0],
      records: [],
    });
    setPhase("playing");
  }

  function resetToSetup() {
    setGame(null);
    setPhase("setup");
  }

  // Players alternate turns; player 0 takes the even-numbered questions.
  const activeIndex = game ? game.current % 2 : 0;

  function handleAnswer(option: QuestionOption) {
    if (!game) return;
    const question = game.questions[game.current];
    setGame((prev) => {
      if (!prev) return prev;
      const scores: [number, number] = [...prev.scores];
      if (option.isCorrect) scores[activeIndex] += 1;
      const record: AnswerRecord = {
        question,
        playerIndex: activeIndex,
        selectedVegetableId: option.vegetable.id,
        correct: option.isCorrect,
      };
      return { ...prev, scores, records: [...prev.records, record] };
    });
  }

  function handleNext() {
    setGame((prev) => {
      if (!prev) return prev;
      const next = prev.current + 1;
      if (next >= prev.questions.length) {
        setPhase("results");
        return prev;
      }
      return { ...prev, current: next };
    });
  }

  if (phase === "setup" || !game) {
    return (
      <SetupScreen defaultPlayers={DEFAULT_PLAYERS} onStart={startGame} />
    );
  }

  if (phase === "results") {
    return (
      <ResultsScreen
        players={game.players}
        scores={game.scores}
        records={game.records}
        onPlayAgain={resetToSetup}
      />
    );
  }

  const question = game.questions[game.current];

  return (
    <div className="space-y-10">
      <ScoreBoard
        players={game.players}
        scores={game.scores}
        activeIndex={activeIndex}
      />
      <QuestionCard
        key={game.current}
        question={question}
        questionNumber={game.current + 1}
        totalQuestions={game.questions.length}
        activePlayerName={game.players[activeIndex].name}
        isLast={game.current === game.questions.length - 1}
        onAnswer={handleAnswer}
        onNext={handleNext}
      />
    </div>
  );
}
