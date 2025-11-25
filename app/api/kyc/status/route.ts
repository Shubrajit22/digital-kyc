import { NextResponse } from "next/server";
import {prisma} from "@/app/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const appId = searchParams.get("appId");

    if (!appId)
      return NextResponse.json({ ok: false, reason: "missing-appId" });

    const app = await prisma.kycApplication.findUnique({
      where: { id: appId },
    });

    if (!app)
      return NextResponse.json({ ok: false, reason: "not-found" });

    return NextResponse.json({
      ok: true,
      status: app.status,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, reason: "server-error" });
  }
}
