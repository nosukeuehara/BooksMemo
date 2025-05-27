"use client";
import { signout } from "@/app/(routes)/login/actions";
import { UserInfo } from "@/types";
import { Menu } from "@mantine/core";
import { LogOut, UserRoundPen } from "lucide-react";
import { useRouter } from "next/navigation";

export function UserMenuItems({ userInfo }: { userInfo: UserInfo }) {
  const router = useRouter();
  return (
    <>
      <Menu.Label>{userInfo.email}</Menu.Label>
      <Menu.Divider />
      <Menu.Item
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          router.push("/profile");
        }}
        leftSection={<UserRoundPen size={14} color="#2e2e2e" />}
        c={"#2e2e2e"}
      >
        プロフィール
      </Menu.Item>
      <Menu.Item
        leftSection={<LogOut size={18} color="#fa5252" />}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          signout();
        }}
        c={"#fa5252"}
      >
        SignOut
      </Menu.Item>
    </>
  );
}
