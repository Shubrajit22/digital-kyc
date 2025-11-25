import sharp from "sharp";

export async function checkImageQuality(
  buffer: Buffer
): Promise<{ ok: boolean; reason?: string }> {
  try {
    const meta = await sharp(buffer).metadata();

    if (!meta.width || !meta.height) {
      return { ok: false, reason: "Unable to read image metadata." };
    }

    if (meta.width < 400 || meta.height < 400) {
      return {
        ok: false,
        reason: "Image resolution is too low (minimum 400x400).",
      };
    }

    if (meta.format !== "jpeg" && meta.format !== "png") {
      return {
        ok: false,
        reason: "Image must be JPEG or PNG.",
      };
    }

    return { ok: true };
  } catch {
    return { ok: false, reason: "Invalid or corrupted image file." };
  }
}
