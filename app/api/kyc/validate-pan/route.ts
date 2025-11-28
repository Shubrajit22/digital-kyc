import { NextResponse } from "next/server";
import { genAI, getBase64, cleanJSON } from "../../kyc/utils";

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const panFile = form.get("panFile") as File;
    const panNumber = form.get("panNumber") as string;
    const fullName = form.get("fullName") as string;

    if (!panFile)
      return NextResponse.json({ ok: false, message: "Missing PAN card file." });

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const base64 = await getBase64(panFile);

    const prompt = `
You must verify an Indian PAN card image.
User PAN: ${panNumber}
User Name: ${fullName}

Extract the **exact name written on the PAN card**.

Return ONLY JSON:
{
  "isPan": true/false,
  "matches": true/false,
  "extractedName": "string",
  "reason": "string"
}
`;

    const result = await model.generateContent([
      { text: prompt },
      { inlineData: { data: base64, mimeType: panFile.type } },
    ]);

    const raw = result.response.text();
    const json = JSON.parse(cleanJSON(raw));

    // --- ORIGINAL LOGIC (unchanged) ---
    if (!json.isPan)
      return NextResponse.json({
        ok: false,
        message: "Not a PAN card",
        reason: json.reason,
      });

    if (!json.matches)
      return NextResponse.json({
        ok: false,
        message: "PAN does not match",
        reason: json.reason,
        extractedName: json.extractedName || null, // NEW
      });

    // Successful validation
    return NextResponse.json({
      ok: true,
      extractedName: json.extractedName || null, // NEW
    });

  } catch (err) {
    console.error("PAN validation error:", err);
    return NextResponse.json({
      ok: false,
      message: "Server error validating PAN",
    });
  }
}
