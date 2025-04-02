import React from "react";
import styles from "./header.module.css";
import { signout } from "@/app/(pages)/login/actions";
import { User } from "@supabase/supabase-js";

const Header = async ({ user }: { user: User | undefined }) => {
  return (
    <div className={`${styles.header_container}`}>
      <p>Book Memo</p>
      {user ? (
        <form>
          <button formAction={signout}>Sign out</button>
        </form>
      ) : null}
    </div>
  );
};

export default Header;
