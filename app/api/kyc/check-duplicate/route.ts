// /app/api/kyc/check-duplicate/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(req: Request) {
  try {
    const { fullName, email } = await req.json();

    if (!fullName || !email) {
      return NextResponse.json({ ok: false, message: "Missing details" });
    }

    const existing = await prisma.kycApplication.findFirst({
      where: {
        fullName,
        email,
      },
    });

    if (existing) {
      return NextResponse.json({
        ok: true,
        exists: true,
        appId: existing.id,
      });
    }

    return NextResponse.json({ ok: true, exists: false });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, message: "Server error" });
  }
}
