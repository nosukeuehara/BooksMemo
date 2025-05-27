"use client";
import React, { useState } from "react";
import {
  Button,
  Group,
  Input,
  Textarea,
  Text,
  Checkbox,
  Notification,
} from "@mantine/core";
import styles from "./editor.module.css";
import { DatePickerInput } from "@mantine/dates";
import { useRouter } from "next/navigation";
import { BookViewData } from "@/types";
import { Book } from "@prisma/client";
import { _createBrowserClient } from "@/lib/supabase/client";
import { actionUpdateBookInfo } from "./actions";
import { BookCheck } from "lucide-react";
import { useMediaQuery } from "@mantine/hooks";

const Editor = ({ book }: { book: BookViewData }) => {
  const user = _createBrowserClient();
  const router = useRouter();
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [value, setValue] = useState<[Date | null, Date | null]>([
    book.borrowedDate ? new Date(book.borrowedDate) : null,
    book.dueDate ? new Date(book.dueDate) : null,
  ]);
  const [review, setReview] = useState(book.review);
  const [checked, setChecked] = useState(book.returned);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const matchesMaxWidth768 = useMediaQuery("(max-width: 768px)");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !author) {
      setError("すべての必須フィールドを入力してください");
      return;
    }

    setIsSubmitting(true);
    setError("");
    setSuccessMessage("");

    try {
      // 入力された値を使用して更新データを作成
      const updateData: Book = {
        id: book.id,
        title,
        author,
        borrowedDate: value[0] ? value[0] : null,
        dueDate: value[1] ? value[1] : null,
        returned: checked,
        review: review || null,
        userId: (await user.auth.getUser()).data.user!.id,
      };

      const result = await actionUpdateBookInfo(updateData);

      if (result?.error) {
        setError(result.error);
      } else {
        setSuccessMessage("更新が完了しました！");
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
        router.push(`/books/${book.id}`);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("予期せぬエラーが発生しました");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.reviewArea}>
      <div className={styles.notificationContainer}>
        {error && (
          <Notification
            className={styles.notification}
            color="red"
            title="エラー"
            onClose={() => setError("")}
          >
            {error}
          </Notification>
        )}

        {successMessage && (
          <Notification
            className={styles.notification}
            color="green"
            title="成功"
            icon={<BookCheck />}
            onClose={() => setSuccessMessage("")}
          >
            {successMessage}
          </Notification>
        )}
      </div>

      <form onSubmit={handleSubmit} className={`${styles.editorForm}`}>
        <div>
          <label className={styles.label}>タイトル※</label>
          <Input
            variant="unstyled"
            size="lg"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            styles={{
              input: {
                fontSize: "1rem",
                color: "#2e2e2e",
                height: "1rem",
              },
            }}
          />
        </div>
        <div>
          <label className={styles.label}>著者※</label>
          <Input
            variant="unstyled"
            size={matchesMaxWidth768 ? "md" : "lg"}
            placeholder={"著者を入力"}
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            styles={{
              input: {
                fontSize: "1rem",
                color: "#2e2e2e",
              },
            }}
          />
        </div>
        <div>
          <label className={styles.label}>貸出日と返却日</label>
          <DatePickerInput
            clearable
            dropdownType="modal"
            size={matchesMaxWidth768 ? "sm" : "lg"}
            variant="unstyled"
            type="range"
            locale="ja"
            valueFormat="YYYY/MM/DD"
            placeholder={"YYYY/MM/DD ~ YYYY/MM/DD"}
            value={value}
            onChange={setValue}
            styles={{
              input: {
                fontSize: "1rem",
                padding: "0rem",
                color: "#2e2e2e",
              },
            }}
          />
        </div>
        <Group gap={"xs"} display={"flex"} align={"center"}>
          <Text c={"#666"} fw={"bold"}>
            {/* {checked ? "返却済み" : "未返却"} */}
            返却済み
          </Text>
          <Checkbox
            labelPosition="left"
            size="sm"
            radius={0}
            checked={checked}
            onChange={(event) => setChecked(event.currentTarget.checked)}
          ></Checkbox>
        </Group>
        <div>
          <label className={styles.label}>感想</label>
          <Textarea
            autosize
            minRows={7}
            variant="unstyled"
            classNames={{
              input: styles.reviewArea__padding,
            }}
            size={matchesMaxWidth768 ? "md" : "lg"}
            placeholder={"感想を入力してみよう"}
            value={review ? review : ""}
            onChange={(e) => setReview(e.target.value)}
            styles={{
              input: {
                fontSize: "1rem",
                color: "#2e2e2e",
              },
            }}
          />
        </div>
      </form>
      <Group justify="center">
        <Button onClick={(e) => handleSubmit(e)} loading={isSubmitting}>
          完了
        </Button>
        <Button
          variant="light"
          color="gray"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          キャンセル
        </Button>
      </Group>
    </div>
  );
};

export default Editor;
