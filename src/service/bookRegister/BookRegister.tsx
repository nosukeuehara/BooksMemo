"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button, Group, Input, Textarea } from "@mantine/core";
import styles from "./bookRegister.module.css";
import { DatePickerInput } from "@mantine/dates";
import { useRouter } from "next/navigation";
import { actionPostBookData } from "./actions";

const BookRegister = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
  const [review, setReview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus the input field when the component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

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

      router.push("/books");
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
            size="lg"
            placeholder={"タイトルを入力"}
            value={title}
            ref={inputRef}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <Input
            variant="unstyled"
            size="lg"
            placeholder={"著者を入力"}
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          <DatePickerInput
            dropdownType="modal"
            size="lg"
            variant="unstyled"
            type="range"
            locale="ja"
            valueFormat="YYYY/MM/DD"
            placeholder={"貸出日と返却日を選択してください"}
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
            placeholder={"感想を入力してみよう"}
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
          onClick={() => {
            if (window.confirm("キャンセルして書籍一覧に戻りますか？")) {
              router.push("/books");
            }
          }}
        >
          キャンセル
        </Button>
      </Group>
    </div>
  );
};

export default BookRegister;
