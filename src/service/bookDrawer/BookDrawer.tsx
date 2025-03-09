"use client";
import { useDisclosure } from "@mantine/hooks";
import { Drawer } from "@mantine/core";
import { ReactNode } from "react";
import { BookInfo } from "@/types/types";
import Editor from "../editor/Editor";

export function BookDrawer({
  book,
  children,
}: {
  book: BookInfo;
  children: ReactNode;
}) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        position="right"
        size="xl"
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      >
        <Editor book={book} />
      </Drawer>

      <div
        onClick={(e) => {
          e.preventDefault();
          open();
        }}
      >
        {children}
      </div>
    </>
  );
}
