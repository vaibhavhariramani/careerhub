import type { MetadataRoute } from "next";
import { siteConfig } from "@/core/config/site";

const publicRoutes = [
  { path: "", priority: 1, changeFrequency: "weekly" as const },
  { path: "/resume-scanner", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/resume-builder", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/interview-prep", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/question-bank", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/jobs", priority: 0.8, changeFrequency: "daily" as const },
  { path: "/login", priority: 0.5, changeFrequency: "monthly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return publicRoutes.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
