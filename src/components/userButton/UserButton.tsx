"use client";
import { Avatar, Menu } from "@mantine/core";

export function UserButton({
  userName,
  children,
}: {
  userName: string | null;
  children: React.ReactNode;
}) {
  return (
    <Menu position="bottom-end" offset={5}>
      <Menu.Target>
        <Avatar name={userName ?? ""} color="initials" />
      </Menu.Target>

      <Menu.Dropdown>{children}</Menu.Dropdown>
    </Menu>
  );
}
