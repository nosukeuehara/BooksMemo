"use client";
import { signout } from "@/app/(routes)/login/actions";
import { UserInfo } from "@/types";
import { Menu } from "@mantine/core";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export function UserMenuItems({ userInfo }: { userInfo: UserInfo }) {
  const router = useRouter();
  return (
    <>
      <Menu.Label>{userInfo.email}</Menu.Label>
      <Menu.Divider />
      <Menu.Item
        onClick={() => {
          router.push("/profile");
        }}
      >
        プロフィール
      </Menu.Item>
      <Menu.Item
        leftSection={<LogOut size={18} color="red" />}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          signout();
        }}
        color="red"
      >
        SignOut
      </Menu.Item>
    </>
  );
}
