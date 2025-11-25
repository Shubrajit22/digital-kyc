import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const fullName = form.get("fullName") as string;
    const email = form.get("email") as string;
    const phone = form.get("phone") as string;
    const panNumber = form.get("panNumber") as string;
    const aadhaarNumber = form.get("aadhaarNumber") as string;

    const panFile = form.get("panFile") as File;
    const aadhaarFront = form.get("aadhaarFront") as File;
    const aadhaarBack = form.get("aadhaarBack") as File;
    const photo = form.get("photo") as File;
    const signature = form.get("signature") as File;

    const to64 = async (f: File) =>
      Buffer.from(await f.arrayBuffer()).toString("base64");

    const saved = await prisma.kycApplication.create({
      data: {
        fullName,
        email,
        phone,
        pan: panNumber,
        aadhaar: aadhaarNumber,
        status: "PENDING",
        documentFiles: JSON.stringify({
          panFile: await to64(panFile),
          aadhaarFront: await to64(aadhaarFront),
          aadhaarBack: await to64(aadhaarBack),
          photo: await to64(photo),
          signature: await to64(signature),
        }),
      },
    });

    return NextResponse.json({ ok: true, appId: saved.id });

  } catch (err) {
    console.error("Submit error:", err);
    return NextResponse.json({ ok: false, message: "Submit failed" });
  }
}
