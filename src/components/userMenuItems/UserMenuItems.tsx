"use client";
import { signout } from "@/app/(routes)/login/actions";
import { Menu } from "@mantine/core";

export function UserMenuItems() {
  return <Menu.Item onClick={signout}>SignOut</Menu.Item>;
}
