import { parsePdf } from "./parse-pdf";
import { parseDocx } from "./parse-docx";
import { parseTxt } from "./parse-txt";

export class UnsupportedFileError extends Error {}

export async function parseResumeFile(file: File): Promise<string> {
  const name = file.name.toLowerCase();

  if (name.endsWith(".pdf") || file.type === "application/pdf") {
    return parsePdf(file);
  }
  if (name.endsWith(".docx")) {
    return parseDocx(file);
  }
  if (name.endsWith(".txt") || file.type === "text/plain") {
    return parseTxt(file);
  }

  throw new UnsupportedFileError(
    "Unsupported file type. Please upload a PDF, DOCX, or TXT resume.",
  );
}
