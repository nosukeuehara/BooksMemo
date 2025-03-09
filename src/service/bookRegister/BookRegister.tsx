"use client";

import React, { useState } from "react";
import { Button, Group, Input, Textarea } from "@mantine/core";
import styles from "./bookRegister.module.css";
import { DatePickerInput } from "@mantine/dates";

const BookRegister = () => {
  const [title, setTitle] = useState("タイトルを入力");
  const [author, setAuthor] = useState("著者を入力");
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
  const [review, setReview] = useState("感想を入力してみよう");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(title, author, value, review);
  };

  return (
    <div>
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
        <Button radius="xl" onClick={(e) => handleSubmit(e)}>
          完了
        </Button>
        <Button
          radius="xl"
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

export default BookRegister;
