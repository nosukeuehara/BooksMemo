import React from "react";
import styles from "./bookGallery.module.css";

interface Children {
  children: React.ReactNode;
}

const BookGallery: React.FC<Children> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className={`${styles.garalley}`}>{children}</div>;
};

export default BookGallery;
