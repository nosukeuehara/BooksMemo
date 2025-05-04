"use client";

import React, { useState } from "react";
import { Button, Group, Input, Text, Alert } from "@mantine/core";
import { useRouter } from "next/navigation";
import { actionUpdateProfileData } from "./actions";

interface ProfileProps {
  profile: {
    email: string;
    name: string;
    exists: boolean;
  };
}

const ProfileEditor = ({ profile }: ProfileProps) => {
  const router = useRouter();
  const [name, setName] = useState(profile.name);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("名前を入力してください");
      return;
    }

    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      formData.append("name", name);
      const response = await actionUpdateProfileData(formData);

      if (response.error) {
        throw new Error(response.error || "プロフィールの更新に失敗しました");
      }

      setSuccess("プロフィールを保存しました");

      // プロフィールが新規作成の場合、ホームページへリダイレクト
      if (!profile.exists) {
        setTimeout(() => {
          router.push("/");
          router.refresh();
        }, 1500);
      } else {
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
    <div>
      {error && (
        <Alert color="red" mb={16}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert color="green" mb={16}>
          {success}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Text fw={500} mb={8}>
            メールアドレス
          </Text>
          <Input
            size="md"
            value={profile.email}
            disabled
            style={{ opacity: 0.7 }}
          />
          <Text size="xs" c="dimmed" mt={4}>
            メールアドレスは変更できません
          </Text>
        </div>

        <div className="mb-6">
          <Input.Wrapper
            label="名前"
            required
            description="あなたの名前を入力してください"
          >
            <Input
              size="md"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="名前を入力"
            />
          </Input.Wrapper>
        </div>

        <Group justify="center" mt="md">
          <Button type="submit" onClick={handleSubmit} loading={isSubmitting}>
            保存
          </Button>
          <Button variant="light" color="gray" onClick={() => router.push("/")}>
            キャンセル
          </Button>
        </Group>
      </form>
    </div>
  );
};

export default ProfileEditor;
