"use client";
import React, { useState } from "react";
import {
  Button,
  Group,
  Input,
  Switch,
  Textarea,
  Notification,
} from "@mantine/core";
import styles from "./editor.module.css";
import { DatePickerInput } from "@mantine/dates";
import { useRouter } from "next/navigation";
import { BookViewData } from "@/types";
import { Book } from "@prisma/client";
import { createClient } from "@/lib/supabase/client";
import { actionUpdateBookInfo } from "./actions";
import { BookCheck } from "lucide-react";

const Editor = ({ book }: { book: BookViewData }) => {
  const user = createClient();
  const router = useRouter();
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [value, setValue] = useState<[Date | null, Date | null]>([
    new Date(book.borrowedDate),
    new Date(book.dueDate),
  ]);
  const [review, setReview] = useState(book.review);
  const [checked, setChecked] = useState(book.returned);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !author || !value[0] || !value[1]) {
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
        borrowedDate: value[0] as Date,
        dueDate: value[1] as Date,
        returned: checked,
        review: review || null,
        userId: (await user.auth.getUser()).data.user!.id,
      };

      const result = await actionUpdateBookInfo(updateData);

      // オプショナルチェーニングを使用して安全にアクセス
      if (result?.error) {
        setError(result.error);
      } else {
        setSuccessMessage("更新が完了しました！");
        // 3秒後に成功メッセージを非表示にする
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
        router.refresh();
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
      {/* 通知コンテナ */}
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
        <Switch
          labelPosition="left"
          label={checked ? "返却済み" : "未返却"}
          size="md"
          checked={checked}
          onChange={(event) => setChecked(event.currentTarget.checked)}
        />
        <div>
          <Input.Wrapper label="タイトル">
            <Input
              size="lg"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Input.Wrapper>
        </div>
        <div>
          <Input.Wrapper label="著者名">
            <Input
              size="md"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </Input.Wrapper>
        </div>
        <div>
          <DatePickerInput
            label="期間"
            size="md"
            type="range"
            locale="ja"
            valueFormat="YYYY/MM/DD"
            value={value}
            onChange={setValue}
          />
        </div>
        <div>
          <Textarea
            label="感想"
            autosize
            minRows={7}
            size="md"
            value={review ? review : ""}
            onChange={(e) => setReview(e.target.value)}
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
