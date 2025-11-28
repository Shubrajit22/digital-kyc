import { NextResponse } from "next/server";
import { genAI, getBase64, cleanJSON } from "../../kyc/utils";

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const aadhaarNumber = form.get("aadhaarNumber") as string;
    const front = form.get("aadhaarFront") as File;
    const back = form.get("aadhaarBack") as File;

    if (!aadhaarNumber || !front || !back) {
      return NextResponse.json({
        ok: false,
        message: "Missing Aadhaar data",
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const front64 = await getBase64(front);
    const back64 = await getBase64(back);

    const prompt = `
You are validating an Indian Aadhaar card using front and back images.
User-entered Aadhaar number: ${aadhaarNumber}

Extract the **name printed on the Aadhaar card**.

Return ONLY valid JSON:
{
  "isAadhaar": true/false,
  "numberMatches": true/false,
  "extractedName": "string",
  "reason": "string"
}
`;

    const result = await model.generateContent([
      { text: prompt },
      { inlineData: { data: front64, mimeType: front.type } },
      { inlineData: { data: back64, mimeType: back.type } },
    ]);

    const raw = result.response.text();
    const json = JSON.parse(cleanJSON(raw));

    // --- ORIGINAL LOGIC (unchanged) ---
    if (!json.isAadhaar) {
      return NextResponse.json({
        ok: false,
        message: json.reason || "Not a valid Aadhaar card",
        extractedName: json.extractedName || null, // NEW
      });
    }

    if (!json.numberMatches) {
      return NextResponse.json({
        ok: false,
        message: json.reason || "Aadhaar number does not match",
        extractedName: json.extractedName || null, // NEW
      });
    }

    // Success
    return NextResponse.json({
      ok: true,
      extractedName: json.extractedName || null, // NEW
    });

  } catch (err) {
    console.error("Aadhaar validation error:", err);
    return NextResponse.json({
      ok: false,
      message: "Server error validating Aadhaar",
    });
  }
}
