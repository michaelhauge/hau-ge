import type { MetadataRoute } from "next";

const BASE_URL = "https://hau.ge";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
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
  ];
}
