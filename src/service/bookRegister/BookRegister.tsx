"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button, Group, Input, Textarea } from "@mantine/core";
import styles from "./bookRegister.module.css";
import { DatePickerInput } from "@mantine/dates";
import { useRouter } from "next/navigation";
import { actionPostBookData } from "./actions";
import { useMediaQuery } from "@mantine/hooks";

const BookRegister = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
  const [review, setReview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const matchesMaxWidth768 = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    // Focus the input field when the component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !author) {
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
      <form className={styles.registerBookForm} onSubmit={handleSubmit}>
        <div>
          <label className={styles.label}>タイトル※</label>
          <Input
            variant="unstyled"
            size={matchesMaxWidth768 ? "md" : "lg"}
            placeholder={"タイトルを入力"}
            value={title}
            ref={inputRef}
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
            value={review}
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
        <Button
          radius="sm"
          size={matchesMaxWidth768 ? "compact-md" : "sm"}
          onClick={(e) => handleSubmit(e)}
          loading={isSubmitting}
        >
          完了
        </Button>
        <Button
          radius="sm"
          size={matchesMaxWidth768 ? "compact-md" : "sm"}
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
