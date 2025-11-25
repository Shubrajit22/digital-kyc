import { NextResponse } from "next/server";
import { genAI, getBase64, cleanJSON } from "../../kyc/utils";

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const photo = form.get("photo") as File;
    const signature = form.get("signature") as File;

    if (!photo || !signature) {
      return NextResponse.json({
        ok: false,
        message: "Missing photograph or signature.",
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const photoB64 = await getBase64(photo);
    const signB64 = await getBase64(signature);

    const prompt = `
You must validate a user's KYC photograph and handwritten/digital signature.

Verify:
1. The first image is a clear human photograph (passport style).
2. The second image is a signature on plain background.
3. Both must not be blurred, distorted, cropped or low quality.

Return ONLY JSON like this:

{
  "isPhotoValid": true/false,
  "isSignatureValid": true/false,
  "reason": "string"
}
`;

    const result = await model.generateContent([
      { text: prompt },
      { inlineData: { data: photoB64, mimeType: photo.type } },
      { inlineData: { data: signB64, mimeType: signature.type } },
    ]);

    const raw = result.response.text();
    const json = JSON.parse(cleanJSON(raw));

    if (!json.isPhotoValid) {
      return NextResponse.json({
        ok: false,
        message: json.reason || "Invalid photograph.",
      });
    }

    if (!json.isSignatureValid) {
      return NextResponse.json({
        ok: false,
        message: json.reason || "Invalid signature.",
      });
    }

    return NextResponse.json({ ok: true });

  } catch (err) {
    console.error("Photo/Signature validation error:", err);
    return NextResponse.json({
      ok: false,
      message: "Server error validating photo/signature.",
    });
  }
}
