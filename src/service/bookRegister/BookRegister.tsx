// src/service/bookRegister/BookRegister.tsx
"use client";

import React, { useState } from "react";
import { Button, Group, Input, Textarea } from "@mantine/core";
import styles from "./bookRegister.module.css";
import { DatePickerInput } from "@mantine/dates";
import { useRouter } from "next/navigation";

const BookRegister = () => {
  const router = useRouter();
  const [title, setTitle] = useState("タイトルを入力");
  const [author, setAuthor] = useState("著者を入力");
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
  const [review, setReview] = useState("感想を入力してみよう");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !author || !value[0] || !value[1]) {
      setError("すべての必須フィールドを入力してください");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          author,
          borrowedDate: value[0],
          dueDate: value[1],
          review,
          userId: 616, // TODO:認証情報からID取得するようにする
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "本の登録に失敗しました");
      }

      router.push("/");
      router.refresh();
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
    <div>
      {error && <div className={styles.error}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <Input
            variant="unstyled"
            size="xl"
            placeholder={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <Input
            variant="unstyled"
            size="lg"
            placeholder={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          <DatePickerInput
            size="lg"
            variant="unstyled"
            type="range"
            locale="ja"
            valueFormat="YYYY/MM/DD"
            placeholder="貸出日と返却日を選択してください"
            value={value}
            onChange={setValue}
          />
        </div>
        <div>
          <Textarea
            autosize
            minRows={7}
            variant="unstyled"
            classNames={{
              input: styles.reviewArea__padding,
            }}
            size="lg"
            placeholder={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </div>
      </form>
      <Group justify="center">
        <Button
          radius="xl"
          onClick={(e) => handleSubmit(e)}
          loading={isSubmitting}
        >
          完了
        </Button>
        <Button
          radius="xl"
          variant="light"
          color="gray"
          onClick={() => router.push("/")}
        >
          キャンセル
        </Button>
      </Group>
    </div>
  );
};

export default BookRegister;
