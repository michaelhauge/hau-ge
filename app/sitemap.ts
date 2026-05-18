import type { MetadataRoute } from "next";
import { getAllWriting } from "@/lib/writing";

const BASE_URL = "https://hau.ge";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const base: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/work/sap`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/writing`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
  const writing: MetadataRoute.Sitemap = getAllWriting().map((post) => ({
    url: `${BASE_URL}/writing/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "yearly",
    priority: 0.6,
  }));
  return [...base, ...writing];
}
