import type { Metadata } from "next";
import { NutritionQuiz } from "@/components/quiz/NutritionQuiz";

export const metadata: Metadata = {
  title: "Veg Match",
  description:
    "A head-to-head quiz on the nutritional benefits of vegetables. Pick the vegetable richest in each nutrient — checked against USDA data.",
};

export default function QuizPage() {
  return (
    <section>
      <div className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
        <NutritionQuiz />
      </div>
    </section>
  );
}
