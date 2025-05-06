import { login, oauthLogin, signup } from "./actions";
import styles from "./page.module.css";

export default async function LoginPage() {
  return (
    <div className={styles.pageContainer}>
      <form className={styles.formContainer}>
        <h1 className={styles.title}>アカウントにログイン</h1>

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
            <input
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
            <input
              id="password"
              name="password"
              type="password"
              required
              className={styles.input}
              placeholder="••••••••"
            />
          </div>
        </div>

        <div className={styles.optionsRow}>
          <a href="#" className={styles.forgotPassword}>
            パスワードをお忘れですか？
          </a>
        </div>

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

          <button formAction={signup} className={styles.secondaryButton}>
            新規登録
          </button>
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
