"use client";
import { useState } from "react";
import { signup } from "./actions";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    try {
      await signup(formData);
      setUserEmail(formData.get("email") as string);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>新規ユーザー登録</h1>
          <form className={styles.form} action={handleSubmit}>
            <div className={styles.field}>
              <label htmlFor="email" className={styles.label}>
                メールアドレス
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className={styles.input}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="password" className={styles.label}>
                パスワード
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className={styles.input}
              />
            </div>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? "登録中..." : "登録"}
            </button>
          </form>
        </div>
      </div>

      {/* 成功モーダル */}
      {showSuccessModal && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <div className={styles.successIcon}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="12" fill="#10b981" />
                  <path
                    d="m9 12 2 2 4-4"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <h2 className={styles.modalTitle}>メールを送信しました！</h2>

              <p className={styles.modalText}>
                <strong>{userEmail}</strong> 宛てに確認メールを送信しました。
              </p>

              <div className={styles.infoBox}>
                <div className={styles.infoIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                      stroke="#3b82f6"
                      strokeWidth="2"
                    />
                    <polyline
                      points="22,6 12,13 2,6"
                      stroke="#3b82f6"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className={styles.infoTitle}>次のステップ</h3>
                  <p className={styles.infoText}>
                    メールに記載されているリンクをクリックして、アカウントの確認を完了してください。
                    その後、ログイン画面からサービスをご利用いただけます。
                  </p>
                </div>
              </div>

              <button
                className={styles.modalButton}
                onClick={() => {
                  setShowSuccessModal(false);
                  router.push("/login");
                }}
              >
                閉じる
              </button>

              <p className={styles.footnote}>
                メールが届かない場合は、迷惑メールフォルダもご確認ください。
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
