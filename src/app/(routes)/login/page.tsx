"use client";
import Link from "next/link";
import { login, oauthLogin, resetPassword } from "./actions";
import styles from "./page.module.css";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Input } from "@mantine/core";
import { LockKeyhole, Mail } from "lucide-react";

export default function LoginPage() {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <div className={styles.pageContainer}>
      <form className={styles.formContainer}>
        <h1 className={styles.title}>ログイン</h1>

        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>
            メールアドレス
          </label>
          <div className={styles.inputWrapper}>
            <span className={styles.inputIcon}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </span>
            <Input
              leftSection={<Mail size="25px" />}
              id="email"
              name="email"
              type="email"
              required
              className={styles.input}
              placeholder="your-email@example.com"
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>
            パスワード
          </label>
          <div className={styles.inputWrapper}>
            <span className={styles.inputIcon}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </span>
            <Input
              leftSection={<LockKeyhole size={25} />}
              id="password"
              name="password"
              type="password"
              required
              className={styles.input}
              placeholder="••••••••"
            />
          </div>
        </div>

        <Modal opened={opened} onClose={close} withCloseButton={false} centered>
          <p className={styles.modalTitle}>
            パスワードリセット用のリンクを送信します。
          </p>
          <form className={styles.resetForm}>
            <div className={styles.inputWrapper}>
              <label htmlFor="email" className={styles.label}>
                メールアドレス
              </label>
              <Input
                leftSection={<Mail size="25px" />}
                id="email"
                name="email"
                type="email"
                required
                placeholder="your-email@example.com"
              />
            </div>
            <button className={styles.resetButton} formAction={resetPassword}>
              リンクを送信
            </button>
          </form>
        </Modal>

        <Button
          className={styles.forgotPassword}
          variant="transparent"
          p={0}
          onClick={open}
        >
          パスワードをお忘れですか？
        </Button>

        <div className={styles.buttonGroup}>
          <button formAction={login} className={styles.primaryButton}>
            <span className={styles.buttonIcon}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </span>
            ログイン
          </button>

          <Link href="./createAccount" className={styles.secondaryButton}>
            新規登録
          </Link>
        </div>
      </form>
      <div className={styles.divider}>
        <span className={styles.dividerText}>または</span>
      </div>
      <form className={styles.oauthContainer}>
        <button formAction={oauthLogin} className={styles.googleButton}>
          Googleでログイン
        </button>
      </form>
    </div>
  );
}
