import Link from "next/link";
import { getAllWords, getAllCategories } from "@/lib/data";

export default function Home() {
  const words = getAllWords();
  const categories = getAllCategories();

  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-600 to-indigo-700 px-6 py-20 text-center text-white">
        <h1 className="text-4xl font-bold sm:text-5xl">
          How to Say Anything in Korean
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg opacity-90">
          Free dictionary with {words.length.toLocaleString()}+ Korean words,
          native pronunciation guides, and real-life example sentences.
        </p>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="text-2xl font-bold text-gray-900">
          Browse by Category
        </h2>
        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <span
              key={cat}
              className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700"
            >
              {cat}
            </span>
          ))}
        </div>
      </section>

      {/* Word Grid */}
      <section className="mx-auto max-w-5xl px-6 pb-16">
        <h2 className="text-2xl font-bold text-gray-900">
          Popular Korean Words
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {words.map((word) => (
            <Link
              key={word.slug}
              href={`/word/${word.slug}`}
              className="group rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-lg"
            >
              <p className="text-2xl font-bold text-gray-900">
                {word.korean_term}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {word.romanization}
              </p>
              <p className="mt-3 font-medium text-blue-600 group-hover:underline">
                How to say &ldquo;{word.english_term}&rdquo; →
              </p>
              <div className="mt-2 flex gap-2">
                <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                  {word.difficulty}
                </span>
                <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                  {word.category}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
