import React from "react";
import styles from "./header.module.css";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { signout } from "@/app/(routes)/login/actions";

const Header = async ({ user }: { user: User | null }) => {
  if (!user) return null;
  const dbUser = await prisma.user.findUnique({
    where: { email: user!.email },
  });
  return (
    <header className={styles.header_container}>
      <div className={styles.header_content}>
        <Link href="/" className={styles.logo_link}>
          <span>📚coto</span>
        </Link>

        {dbUser ? (
          <div className={styles.user_actions}>
            <span className={styles.user_email}>{dbUser.name}</span>
            <form>
              <button className={styles.signout_button} formAction={signout}>
                Sign out
              </button>
            </form>
          </div>
        ) : (
          <Link href="/login" className={styles.login_link}>
            ログイン
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
