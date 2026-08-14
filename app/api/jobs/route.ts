import { NextResponse } from "next/server";
import { remotiveSource } from "@/features/jobs/lib/sources/remotive";
import { arbeitnowSource } from "@/features/jobs/lib/sources/arbeitnow";
import type { Job } from "@/core/types/job";

export const revalidate = 900;

export async function GET() {
  const results = await Promise.allSettled([remotiveSource.fetchJobs(), arbeitnowSource.fetchJobs()]);

  const jobs: Job[] = results.flatMap((r) => (r.status === "fulfilled" ? r.value : []));
  jobs.sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime());

  return NextResponse.json({
    jobs,
    sources: {
      remotive: results[0]?.status === "fulfilled" ? results[0].value.length : 0,
      arbeitnow: results[1]?.status === "fulfilled" ? results[1].value.length : 0,
    },
  });
}
