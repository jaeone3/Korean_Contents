import wordsJson from "@/data/words.json";
import { WordData } from "./types";

const words: WordData[] = wordsJson;

export function getAllWords(): WordData[] {
  return words;
}

export function getWordBySlug(slug: string): WordData | undefined {
  return words.find((w) => w.slug === slug);
}

export function getRelatedWords(
  currentSlug: string,
  category: string,
  limit = 6
): WordData[] {
  return words
    .filter((w) => w.slug !== currentSlug && w.category === category)
    .slice(0, limit);
}

export function getAllCategories(): string[] {
  return [...new Set(words.map((w) => w.category))];
}
