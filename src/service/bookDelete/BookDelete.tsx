"use client";
import React, { useState } from "react";
import { Button, Modal, Group, Text } from "@mantine/core";
import { actionDeleteBook } from "./actions";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface BookDeleteProps {
  bookId: string;
  title: string;
  onSuccess?: () => void;
}

const BookDelete: React.FC<BookDeleteProps> = ({
  bookId,
  title,
  onSuccess,
}) => {
  const router = useRouter();
  const [opened, setOpened] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setIsDeleting(true);
    setError("");

    try {
      const response = await actionDeleteBook(bookId);

      if (response.error) {
        setError(response.error);
        return;
      }

      setOpened(false);

      if (onSuccess) {
        onSuccess();
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("予期せぬエラーが発生しました");
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Button
        leftSection={<Trash2 size={14} color="red" />}
        color="red"
        variant="transparent"
        onClick={(e) => {
          e.stopPropagation();
          setOpened(true);
        }}
      >
        削除
      </Button>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        onClick={(e) => e.stopPropagation()}
        title="本の削除の確認"
      >
        <Text size="sm" mb="md">
          「{title}」を削除してもよろしいですか？この操作は取り消せません。
        </Text>

        {error && (
          <Text size="sm" mb="md">
            {error}
          </Text>
        )}

        <Group mt="md">
          <Button
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              setOpened(false);
            }}
          >
            キャンセル
          </Button>
          <Button
            color="red"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
            loading={isDeleting}
          >
            削除する
          </Button>
        </Group>
      </Modal>
    </>
  );
};

export default BookDelete;
