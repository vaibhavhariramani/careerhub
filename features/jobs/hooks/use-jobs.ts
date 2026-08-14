"use client";

import { useEffect, useState } from "react";
import type { Job } from "@/core/types/job";

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [status, setStatus] = useState<"loading" | "done" | "error">("loading");

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    fetch("/api/jobs")
      .then((res) => res.json())
      .then((data: { jobs: Job[] }) => {
        if (cancelled) return;
        setJobs(data.jobs);
        setStatus("done");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { jobs, status };
}
