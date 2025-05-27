"use client";
import { BookViewData } from "@/types";
import styles from "./bookCard.module.css";
import { Calendar, Check, Edit, Ellipsis, User } from "lucide-react";
import Link from "next/link";
import { Button, Card, Grid, Group, Menu, Text } from "@mantine/core";
import BookDelete from "@/service/bookDelete/BookDelete";
import { useRouter } from "next/navigation";

export const BookCard = (props: { book: BookViewData }) => {
  const router = useRouter();
  return (
    <Card
      className={styles.bookCard}
      p={"1rem"}
      h={230}
      radius={"xs"}
      shadow={"sm"}
    >
      <Link
        href={`/books/${props.book.id}`}
        aria-labelledby={`title-${props.book.id}`}
        role="article"
      >
        <div className={`${styles.menu_ellipsis}`}>
          <Menu
            trigger="click-hover"
            openDelay={100}
            closeDelay={400}
            zIndex={0}
            position="bottom-end"
          >
            <Menu.Target>
              <Ellipsis size={20} onClick={(e) => e.preventDefault()} />
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item component="div">
                <Button
                  variant="transparent"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    router.push(`books/${props.book.id}/edit`);
                  }}
                  leftSection={<Edit size={14} />}
                >
                  編集する
                </Button>
              </Menu.Item>
              <Menu.Item component="div">
                <BookDelete bookId={props.book.id} title={props.book.title} />
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
        {/* ヘッダー情報 */}
        <Text c={"dark"} fw={"bolder"} size={"xl"} mb={"sm"}>
          {props.book.title}
        </Text>
        <Grid mb={"lg"}>
          <Grid.Col span={12} py={0}>
            <Group gap={5}>
              <User size={18} color={"var(--mantine-color-dark-text)"} />
              <Text c={"dark"} size={"md"}>
                {props.book.author}
              </Text>
            </Group>
          </Grid.Col>
          <Grid.Col span={12} py={0}>
            <Group
              gap={5}
              style={!props.book.dueDate ? { display: "none" } : {}}
            >
              <Calendar size={18} color={"var(--mantine-color-dark-text)"} />
              <Group gap={"8"}>
                <Text c={"dark"} size={"md"}>
                  {new Date(props.book.dueDate).toLocaleDateString("ja-JP")}
                </Text>
                <Group align="center" gap={0}>
                  {props.book.returned && (
                    <>
                      <Text size="sm" c="#82c91e">
                        返却済み
                      </Text>
                      <Check size={15} color="#82c91e" />
                    </>
                  )}
                </Group>
              </Group>
            </Group>
          </Grid.Col>
        </Grid>
        {/* ブック感想 */}
        <Text c={"dark"} size={"md"} lineClamp={5} lh={1.3}>
          {props.book.review}
        </Text>
      </Link>
    </Card>
  );
};
