// src/service/bookRegister/BookRegister.tsx
"use client";

import React, { useState } from "react";
import { Button, Group, Input, Textarea } from "@mantine/core";
import styles from "./bookRegister.module.css";
import { DatePickerInput } from "@mantine/dates";
import { useRouter } from "next/navigation";
import { actionPostBookData } from "./actions";

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
      // Create a new FormData object
      const formData = new FormData();
      formData.append("title", title);
      formData.append("author", author);
      formData.append("borrowedDate", value[0]?.toISOString() || "");
      formData.append("dueDate", value[1]?.toISOString() || "");
      formData.append("review", review);

      // Use the server action instead of fetch
      const response = await actionPostBookData(formData);

      if (response.error) {
        throw new Error(response.error || "本の登録に失敗しました");
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <Input
            variant="unstyled"
            size="lg"
            placeholder={author}
            value={author}
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
            value={review}
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
