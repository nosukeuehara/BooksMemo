"use client";
// この例は既存のNavigationコンポーネントを拡張したもので、
// 実際の実装では既存のNavigationコンポーネントを修正する必要があります

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav className="flex gap-4 py-4">
      <Link href="/" className={pathname === "/" ? "font-bold" : ""}>
        ホーム
      </Link>
      <Link
        href="/register"
        className={pathname === "/register" ? "font-bold" : ""}
      >
        本を登録
      </Link>
      <Link
        href="/profile"
        className={pathname === "/profile" ? "font-bold" : ""}
      >
        プロフィール
      </Link>
    </nav>
  );
};

export default Navigation;
