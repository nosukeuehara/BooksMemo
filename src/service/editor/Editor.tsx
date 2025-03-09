"use client";

import React, { useState } from "react";
import { Button, Group, Input, Switch, Textarea } from "@mantine/core";
import styles from "./editor.module.css";
import { DatePickerInput } from "@mantine/dates";
import { BookInfo } from "@/types/types";

const Editor = ({ book }: { book: BookInfo }) => {
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [value, setValue] = useState<[Date | null, Date | null]>([
    book.borrowedDate,
    book.dueDate,
  ]);
  const [review, setReview] = useState(book.review);
  const [checked, setChecked] = useState(false);

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
            size="lg"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <Input
            variant="unstyled"
            size="md"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          <DatePickerInput
            size="md"
            variant="unstyled"
            type="range"
            locale="ja"
            valueFormat="YYYY/MM/DD"
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
            size="md"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </div>
        <Switch
          defaultChecked
          labelPosition="left"
          label={checked ? "返却済み" : "未返却"}
          size="md"
          checked={checked}
          onChange={(event) => setChecked(event.currentTarget.checked)}
        />
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

export default Editor;
