import { MetadataRoute } from "next";
import { getAllWords } from "@/lib/data";
import { SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const words = getAllWords();

  const wordPages: MetadataRoute.Sitemap = words.map((word) => ({
    url: `${SITE_URL}/word/${word.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...wordPages,
  ];
}
