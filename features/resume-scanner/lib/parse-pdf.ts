"use client";

export async function parsePdf(file: File): Promise<string> {
  const pdfjsLib = await import("pdfjs-dist");
  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url,
  ).toString();

  const buffer = await file.arrayBuffer();
  const doc = await pdfjsLib.getDocument({ data: buffer }).promise;

  const pageTexts: string[] = [];
  for (let pageNum = 1; pageNum <= doc.numPages; pageNum++) {
    const page = await doc.getPage(pageNum);
    const content = await page.getTextContent();

    // pdfjs's `hasEOL` flag is set by its own layout heuristics and isn't reliable across
    // every PDF generator — some resume templates never trip it, which collapses whole
    // pages (headings included) into one giant line and breaks heading detection downstream
    // in findSections(). Grouping text runs by y-coordinate (like `pdftotext -layout`) is the
    // robust approach: it reconstructs visual lines directly from glyph position, regardless
    // of how the source PDF chose to chunk its text-showing operators.
    const runs: { str: string; x: number; y: number }[] = [];
    for (const item of content.items) {
      if (!("str" in item) || !item.str.trim()) continue;
      runs.push({ str: item.str, x: item.transform[4], y: item.transform[5] });
    }

    const Y_TOLERANCE = 2;
    const lines: { str: string; x: number; y: number }[][] = [];
    for (const run of runs) {
      const line = lines.find((l) => Math.abs(l[0]!.y - run.y) <= Y_TOLERANCE);
      if (line) line.push(run);
      else lines.push([run]);
    }

    lines.sort((a, b) => b[0]!.y - a[0]!.y);
    const text = lines
      .map((line) =>
        line
          .sort((a, b) => a.x - b.x)
          .map((run) => run.str)
          .join(" "),
      )
      .join("\n");

    pageTexts.push(text);
  }

  return pageTexts.join("\n\n");
}
