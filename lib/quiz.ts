// Pure question-generation and scoring logic for the /quiz mini-game.
// Kept free of React so the "the correct answer is always the true maximum"
// guarantee is easy to reason about and verify.

import {
  NUTRIENTS,
  NUTRIENT_BY_KEY,
  VEGETABLES,
  type NutrientKey,
  type NutrientMeta,
  type Vegetable,
} from "./vegetables";

/** One option presented in a question. */
export interface QuestionOption {
  vegetable: Vegetable;
  /** The vegetable's value for this question's nutrient, per 100g. */
  value: number;
  /** True for the option with the highest value — the correct pick. */
  isCorrect: boolean;
}

export interface Question {
  nutrient: NutrientMeta;
  options: QuestionOption[];
}

const OPTIONS_PER_QUESTION = 4;

/** Fisher–Yates shuffle returning a new array. */
function shuffle<T>(items: readonly T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Build a single question for a given nutrient from a pool of vegetables.
 * The four options are chosen so there is an unambiguous winner: we sort the
 * pool by the nutrient, take the top vegetable as the guaranteed answer, then
 * fill the remaining slots with distractors whose values are strictly lower.
 * Returns null if a clean, tie-free question can't be formed.
 */
function buildQuestion(nutrient: NutrientMeta, pool: Vegetable[]): Question | null {
  const ranked = [...pool].sort(
    (a, b) => b.nutrients[nutrient.key] - a.nutrients[nutrient.key],
  );
  const winner = ranked[0];
  if (!winner) return null;
  const winnerValue = winner.nutrients[nutrient.key];

  // Distractors must be strictly below the winner so there's no tie at the top.
  const distractors = shuffle(
    ranked.slice(1).filter((v) => v.nutrients[nutrient.key] < winnerValue),
  ).slice(0, OPTIONS_PER_QUESTION - 1);

  if (distractors.length < OPTIONS_PER_QUESTION - 1) return null;

  const chosen = [winner, ...distractors];
  const options: QuestionOption[] = shuffle(chosen).map((vegetable) => ({
    vegetable,
    value: vegetable.nutrients[nutrient.key],
    isCorrect: vegetable.id === winner.id,
  }));

  return { nutrient, options };
}

/**
 * Generate `count` distinct quiz questions. Each pairs a randomly chosen
 * nutrient with a random sample of vegetables; nutrients are reused only once
 * the full set has been cycled through, so short rounds never repeat a topic.
 */
export function generateQuestions(count: number): Question[] {
  const questions: Question[] = [];
  let nutrientQueue: NutrientMeta[] = [];

  let attempts = 0;
  const maxAttempts = count * 20;

  while (questions.length < count && attempts < maxAttempts) {
    attempts++;
    if (nutrientQueue.length === 0) {
      nutrientQueue = shuffle(NUTRIENTS);
    }
    const nutrient = nutrientQueue.pop() as NutrientMeta;

    // Sample a generous pool, then let buildQuestion pick the cleanest four.
    const pool = shuffle(VEGETABLES).slice(0, 8);
    const question = buildQuestion(nutrient, pool);
    if (question) questions.push(question);
  }

  return questions;
}

export { NUTRIENT_BY_KEY };
export type { NutrientKey };
