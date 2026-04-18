"use client";

import { logoutAction } from "@/lib/auth";

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button
        type="submit"
        className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
      >
        로그아웃
      </button>
    </form>
  );
}
