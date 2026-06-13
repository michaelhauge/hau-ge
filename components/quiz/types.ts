import type { Question } from "@/lib/quiz";

export interface Player {
  name: string;
}

/** A completed answer, kept for the end-of-round recap. */
export interface AnswerRecord {
  question: Question;
  playerIndex: number;
  selectedVegetableId: string;
  correct: boolean;
}
