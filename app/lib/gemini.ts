import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn("GEMINI_API_KEY is not set. Gemini validations will fail.");
}

export const genAI = apiKey
  ? new GoogleGenAI({ apiKey })
  : null;

export function getTextFromResult(result: any): string {
  if (!result) return "";
  // Some SDK responses may have output_text
  if (typeof result.output_text === "string" && result.output_text.trim()) {
    return result.output_text.trim();
  }
  const candidate = result.candidates?.[0];
  if (!candidate?.content?.parts) return "";
  return candidate.content.parts
    .map((p: any) => p.text || "")
    .join("")
    .trim();
}
