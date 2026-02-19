import { WordData } from "@/lib/types";
import { SITE_URL } from "@/lib/constants";

export default function JsonLd({ word }: { word: WordData }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: word.english_term,
    description: word.context_description,
    termCode: word.korean_term,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "Korean Vocabulary",
      url: `${SITE_URL}/word`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
