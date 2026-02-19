import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllWords, getWordBySlug, getRelatedWords } from "@/lib/data";
import { APP_STORE_URL, GOOGLE_PLAY_URL } from "@/lib/constants";
import JsonLd from "@/components/seo/JsonLd";
import FakeAudioPlayer from "@/components/conversion/FakeAudioPlayer";

// SSG: 상위 10개만 빌드 시 생성, 나머지는 ISR (요청 시 생성 후 캐싱)
export async function generateStaticParams() {
  const words = getAllWords();
  return words.slice(0, 10).map((word) => ({
    slug: word.slug,
  }));
}

// 동적 SEO 메타데이터
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const word = getWordBySlug(slug);
  if (!word) return { title: "Word Not Found" };

  const title = `How to say "${word.english_term}" in Korean? - Native Pronunciation`;
  const description = `Learn how to say "${word.english_term}" in Korean (${word.korean_term}). ${word.context_description}`;

  return {
    title,
    description,
    keywords: [
      `${word.english_term} in Korean`,
      `how to say ${word.english_term} in Korean`,
      `${word.korean_term}`,
      "Korean vocabulary",
      "learn Korean",
    ],
    openGraph: {
      title,
      description,
      type: "article",
      url: `/word/${word.slug}`,
    },
    alternates: {
      canonical: `/word/${word.slug}`,
    },
  };
}

export default async function WordPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const word = getWordBySlug(slug);
  if (!word) notFound();

  const relatedWords = getRelatedWords(word.slug, word.category);

  return (
    <>
      <JsonLd word={word} />

      <main className="pb-28">
        {/* Hero */}
        <section className="bg-gradient-to-b from-blue-50 to-white px-6 py-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Korean Dictionary
          </p>
          <h1 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            How to say &ldquo;{word.english_term}&rdquo; in Korean
          </h1>
          <div className="mt-8 inline-block rounded-2xl bg-white px-10 py-6 shadow-lg">
            <p className="text-5xl font-black text-gray-900 sm:text-6xl">
              {word.korean_term}
            </p>
            <p className="mt-2 text-sm text-gray-500">{word.romanization}</p>
          </div>

          <FakeAudioPlayer term={word.english_term} />

          <div className="mt-4">
            <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
              {word.difficulty}
            </span>
            <span className="ml-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
              {word.category}
            </span>
          </div>
        </section>

        {/* Content */}
        <section className="mx-auto max-w-2xl px-6 py-10">
          <h2 className="text-xl font-bold text-gray-900">Usage & Context</h2>
          <p className="mt-3 leading-relaxed text-gray-700">
            {word.context_description}
          </p>

          <div className="mt-8 rounded-xl border-l-4 border-blue-500 bg-blue-50 p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-blue-800">
              Example Sentence
            </h3>
            <p className="mt-3 text-xl font-medium text-gray-900">
              {word.example_sentence_korean}
            </p>
            <p className="mt-1 text-gray-500">
              {word.example_sentence_english}
            </p>
          </div>
        </section>

        {/* Related Words - Internal Linking */}
        {relatedWords.length > 0 && (
          <section className="mx-auto max-w-2xl px-6 py-10">
            <h2 className="text-xl font-bold text-gray-900">
              More {word.category} Words
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {relatedWords.map((related) => (
                <Link
                  key={related.slug}
                  href={`/word/${related.slug}`}
                  className="rounded-lg border border-gray-200 bg-white p-4 text-center transition-shadow hover:shadow-md"
                >
                  <p className="text-lg font-bold text-gray-900">
                    {related.korean_term}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    {related.english_term}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="mx-auto max-w-2xl px-6 py-10">
          <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-center text-white">
            <h2 className="text-2xl font-bold">
              Master Korean with AI-Powered Learning
            </h2>
            <p className="mt-2 opacity-90">
              Practice {word.english_term} and 10,000+ words with native
              pronunciation and AI conversation.
            </p>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full bg-white px-6 py-3 font-bold text-blue-600 transition hover:bg-gray-100"
              >
                Download Free on iOS
              </a>
              <a
                href={GOOGLE_PLAY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full border-2 border-white px-6 py-3 font-bold text-white transition hover:bg-white/10"
              >
                Get it on Android
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
