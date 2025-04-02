import React from "react";
import styles from "./header.module.css";

const Header = async () => {
  return (
    <div className={`${styles.header_container}`}>
      <p>Book Memo</p>
    </div>
  );
};

export default Header;
