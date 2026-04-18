"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { signValue } from "./auth-utils";

export async function loginAction(
  _prevState: { error: string },
  formData: FormData
): Promise<{ error: string }> {
  const password = formData.get("password") as string;

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return { error: "비밀번호가 올바르지 않습니다." };
  }

  const cookieStore = await cookies();
  cookieStore.set("admin_session", signValue(password), {
    httpOnly: true,
    sameSite: "lax",
    path: "/admin",
    maxAge: 60 * 60 * 8, // 8시간
  });

  redirect("/admin");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  redirect("/admin/login");
}
