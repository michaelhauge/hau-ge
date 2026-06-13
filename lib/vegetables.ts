// Curated vegetable nutrition dataset for the /quiz mini-game.
//
// All values are per 100g of the *raw* vegetable, sourced from the USDA
// FoodData Central database (fdc.nal.usda.gov). Values are rounded to the
// precision USDA reports. They power "which vegetable has the most X?"
// questions, so the correct answer is always computed from this data rather
// than hand-keyed — keeping the dataset honest keeps the quiz honest.

export type NutrientKey =
  | "vitaminC"
  | "vitaminA"
  | "vitaminK"
  | "folate"
  | "iron"
  | "calcium"
  | "potassium"
  | "magnesium"
  | "fiber"
  | "protein";

export interface Vegetable {
  id: string;
  name: string;
  emoji: string;
  /** kcal per 100g, raw. */
  calories: number;
  /** Per-100g nutrient values, raw. Units defined in NUTRIENTS below. */
  nutrients: Record<NutrientKey, number>;
}

export interface NutrientMeta {
  key: NutrientKey;
  /** Short label, e.g. "Vitamin C". */
  label: string;
  /** Unit suffix, e.g. "mg". */
  unit: string;
  /** One sentence on why this nutrient matters, shown on the answer reveal. */
  why: string;
}

export const NUTRIENTS: NutrientMeta[] = [
  {
    key: "vitaminC",
    label: "Vitamin C",
    unit: "mg",
    why: "Powers the immune system and helps the body build collagen for skin, blood vessels, and wound healing.",
  },
  {
    key: "vitaminA",
    label: "Vitamin A",
    unit: "µg",
    why: "Critical for vision, immune defence, and healthy skin — measured here as retinol activity equivalents.",
  },
  {
    key: "vitaminK",
    label: "Vitamin K",
    unit: "µg",
    why: "Essential for blood clotting and for binding calcium into bones.",
  },
  {
    key: "folate",
    label: "Folate",
    unit: "µg",
    why: "A B-vitamin needed to make DNA and new cells — especially important during pregnancy.",
  },
  {
    key: "iron",
    label: "Iron",
    unit: "mg",
    why: "Carries oxygen around the body in red blood cells; a shortfall leaves you tired and pale.",
  },
  {
    key: "calcium",
    label: "Calcium",
    unit: "mg",
    why: "Builds and maintains strong bones and teeth, and helps muscles and nerves fire.",
  },
  {
    key: "potassium",
    label: "Potassium",
    unit: "mg",
    why: "Balances fluids and helps keep blood pressure in check, offsetting sodium.",
  },
  {
    key: "magnesium",
    label: "Magnesium",
    unit: "mg",
    why: "A cofactor in 300+ enzyme reactions, from energy production to muscle and nerve function.",
  },
  {
    key: "fiber",
    label: "Fibre",
    unit: "g",
    why: "Feeds gut bacteria, keeps digestion regular, and helps you feel full for longer.",
  },
  {
    key: "protein",
    label: "Protein",
    unit: "g",
    why: "Provides the amino acids your body uses to build and repair muscle and tissue.",
  },
];

export const NUTRIENT_BY_KEY: Record<NutrientKey, NutrientMeta> = NUTRIENTS.reduce(
  (acc, n) => {
    acc[n.key] = n;
    return acc;
  },
  {} as Record<NutrientKey, NutrientMeta>,
);

export const VEGETABLES: Vegetable[] = [
  { id: "spinach", name: "Spinach", emoji: "🥬", calories: 23, nutrients: { vitaminC: 28, vitaminA: 469, vitaminK: 483, folate: 194, iron: 2.7, calcium: 99, potassium: 558, magnesium: 79, fiber: 2.2, protein: 2.9 } },
  { id: "broccoli", name: "Broccoli", emoji: "🥦", calories: 34, nutrients: { vitaminC: 89, vitaminA: 31, vitaminK: 102, folate: 63, iron: 0.73, calcium: 47, potassium: 316, magnesium: 21, fiber: 2.6, protein: 2.8 } },
  { id: "kale", name: "Kale", emoji: "🥬", calories: 49, nutrients: { vitaminC: 120, vitaminA: 500, vitaminK: 705, folate: 141, iron: 1.5, calcium: 150, potassium: 491, magnesium: 47, fiber: 3.6, protein: 4.3 } },
  { id: "carrot", name: "Carrot", emoji: "🥕", calories: 41, nutrients: { vitaminC: 5.9, vitaminA: 835, vitaminK: 13.2, folate: 19, iron: 0.3, calcium: 33, potassium: 320, magnesium: 12, fiber: 2.8, protein: 0.9 } },
  { id: "red-pepper", name: "Red bell pepper", emoji: "🫑", calories: 31, nutrients: { vitaminC: 128, vitaminA: 157, vitaminK: 4.9, folate: 46, iron: 0.43, calcium: 7, potassium: 211, magnesium: 12, fiber: 2.1, protein: 1 } },
  { id: "tomato", name: "Tomato", emoji: "🍅", calories: 18, nutrients: { vitaminC: 13.7, vitaminA: 42, vitaminK: 7.9, folate: 15, iron: 0.27, calcium: 10, potassium: 237, magnesium: 11, fiber: 1.2, protein: 0.9 } },
  { id: "sweet-potato", name: "Sweet potato", emoji: "🍠", calories: 86, nutrients: { vitaminC: 2.4, vitaminA: 709, vitaminK: 1.8, folate: 11, iron: 0.61, calcium: 30, potassium: 337, magnesium: 25, fiber: 3, protein: 1.6 } },
  { id: "potato", name: "Potato", emoji: "🥔", calories: 77, nutrients: { vitaminC: 19.7, vitaminA: 0, vitaminK: 2, folate: 15, iron: 0.81, calcium: 12, potassium: 425, magnesium: 23, fiber: 2.2, protein: 2 } },
  { id: "cauliflower", name: "Cauliflower", emoji: "🥦", calories: 25, nutrients: { vitaminC: 48, vitaminA: 0, vitaminK: 15.5, folate: 57, iron: 0.44, calcium: 22, potassium: 299, magnesium: 15, fiber: 2, protein: 1.9 } },
  { id: "brussels-sprouts", name: "Brussels sprouts", emoji: "🥬", calories: 43, nutrients: { vitaminC: 85, vitaminA: 38, vitaminK: 177, folate: 61, iron: 1.4, calcium: 42, potassium: 389, magnesium: 23, fiber: 3.8, protein: 3.4 } },
  { id: "cabbage", name: "Cabbage", emoji: "🥬", calories: 25, nutrients: { vitaminC: 36.6, vitaminA: 5, vitaminK: 76, folate: 43, iron: 0.47, calcium: 40, potassium: 170, magnesium: 12, fiber: 2.5, protein: 1.3 } },
  { id: "green-peas", name: "Green peas", emoji: "🫛", calories: 81, nutrients: { vitaminC: 40, vitaminA: 38, vitaminK: 24.8, folate: 65, iron: 1.5, calcium: 25, potassium: 244, magnesium: 33, fiber: 5.7, protein: 5.4 } },
  { id: "asparagus", name: "Asparagus", emoji: "🌱", calories: 20, nutrients: { vitaminC: 5.6, vitaminA: 38, vitaminK: 41.6, folate: 52, iron: 2.1, calcium: 24, potassium: 202, magnesium: 14, fiber: 2.1, protein: 2.2 } },
  { id: "beetroot", name: "Beetroot", emoji: "🫜", calories: 43, nutrients: { vitaminC: 4.9, vitaminA: 2, vitaminK: 0.2, folate: 109, iron: 0.8, calcium: 16, potassium: 325, magnesium: 23, fiber: 2.8, protein: 1.6 } },
  { id: "garlic", name: "Garlic", emoji: "🧄", calories: 149, nutrients: { vitaminC: 31, vitaminA: 0, vitaminK: 1.7, folate: 3, iron: 1.7, calcium: 181, potassium: 401, magnesium: 25, fiber: 2.1, protein: 6.4 } },
  { id: "onion", name: "Onion", emoji: "🧅", calories: 40, nutrients: { vitaminC: 7.4, vitaminA: 0, vitaminK: 0.4, folate: 19, iron: 0.21, calcium: 23, potassium: 146, magnesium: 10, fiber: 1.7, protein: 1.1 } },
  { id: "cucumber", name: "Cucumber", emoji: "🥒", calories: 15, nutrients: { vitaminC: 2.8, vitaminA: 5, vitaminK: 16.4, folate: 7, iron: 0.28, calcium: 16, potassium: 147, magnesium: 13, fiber: 0.5, protein: 0.7 } },
  { id: "zucchini", name: "Zucchini", emoji: "🥒", calories: 17, nutrients: { vitaminC: 17.9, vitaminA: 10, vitaminK: 4.3, folate: 24, iron: 0.37, calcium: 16, potassium: 261, magnesium: 18, fiber: 1, protein: 1.2 } },
  { id: "eggplant", name: "Eggplant", emoji: "🍆", calories: 25, nutrients: { vitaminC: 2.2, vitaminA: 1, vitaminK: 3.5, folate: 22, iron: 0.23, calcium: 9, potassium: 229, magnesium: 14, fiber: 3, protein: 1 } },
  { id: "sweet-corn", name: "Sweet corn", emoji: "🌽", calories: 86, nutrients: { vitaminC: 6.8, vitaminA: 9, vitaminK: 0.3, folate: 42, iron: 0.52, calcium: 2, potassium: 270, magnesium: 37, fiber: 2, protein: 3.2 } },
  { id: "swiss-chard", name: "Swiss chard", emoji: "🥬", calories: 19, nutrients: { vitaminC: 30, vitaminA: 306, vitaminK: 830, folate: 14, iron: 1.8, calcium: 51, potassium: 379, magnesium: 81, fiber: 1.6, protein: 1.8 } },
  { id: "pumpkin", name: "Pumpkin", emoji: "🎃", calories: 26, nutrients: { vitaminC: 9, vitaminA: 426, vitaminK: 1.1, folate: 16, iron: 0.8, calcium: 21, potassium: 340, magnesium: 12, fiber: 0.5, protein: 1 } },
  { id: "green-beans", name: "Green beans", emoji: "🫛", calories: 31, nutrients: { vitaminC: 12.2, vitaminA: 35, vitaminK: 43, folate: 33, iron: 1, calcium: 37, potassium: 211, magnesium: 25, fiber: 2.7, protein: 1.8 } },
  { id: "romaine", name: "Romaine lettuce", emoji: "🥬", calories: 17, nutrients: { vitaminC: 4, vitaminA: 436, vitaminK: 102, folate: 136, iron: 0.97, calcium: 33, potassium: 247, magnesium: 14, fiber: 2.1, protein: 1.2 } },
  { id: "arugula", name: "Arugula", emoji: "🌿", calories: 25, nutrients: { vitaminC: 15, vitaminA: 119, vitaminK: 109, folate: 97, iron: 1.46, calcium: 160, potassium: 369, magnesium: 47, fiber: 1.6, protein: 2.6 } },
  { id: "parsley", name: "Parsley", emoji: "🌿", calories: 36, nutrients: { vitaminC: 133, vitaminA: 421, vitaminK: 1640, folate: 152, iron: 6.2, calcium: 138, potassium: 554, magnesium: 50, fiber: 3.3, protein: 3 } },
];
