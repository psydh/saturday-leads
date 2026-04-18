import crypto from "crypto";

export function signValue(value: string): string {
  return crypto
    .createHmac("sha256", process.env.ADMIN_SECRET!)
    .update(value)
    .digest("hex");
}

export function verifyAdminCookie(cookieValue: string | undefined): boolean {
  if (!cookieValue || !process.env.ADMIN_PASSWORD || !process.env.ADMIN_SECRET) {
    return false;
  }
  const expected = signValue(process.env.ADMIN_PASSWORD);
  try {
    return crypto.timingSafeEqual(
      Buffer.from(cookieValue),
      Buffer.from(expected)
    );
  } catch {
    return false;
  }
}
