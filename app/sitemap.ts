import type { MetadataRoute } from "next";
import { brand } from "@/lib/brand";
import { docs } from "@/lib/docs";

const appPaths = ["shield", "transfer", "unshield", "activity", "settings"];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: brand.url, changeFrequency: "weekly", priority: 1 },
    { url: `${brand.url}/docs`, changeFrequency: "weekly", priority: 0.8 },
    ...docs.map((doc) => ({
      url: `${brand.url}/docs/${doc.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    { url: `${brand.url}/app`, changeFrequency: "monthly", priority: 0.4 },
    ...appPaths.map((path) => ({
      url: `${brand.url}/app/${path}`,
      changeFrequency: "monthly" as const,
      priority: 0.3,
    })),
  ];
}
