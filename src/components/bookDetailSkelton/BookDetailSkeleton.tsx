import { Skeleton } from "@mantine/core";
import styles from "./styles.module.css";

export default function BookDetailSkeleton() {
  return (
    <div className={styles.skeletonContainer}>
      <div className={styles.skeletonHeader}>
        <Skeleton height={32} width="70%" radius="md" mb={12} />
        <Skeleton height={20} width="40%" radius="md" />
      </div>
      <div className={styles.skeletonDetails}>
        <Skeleton height={18} width="100%" radius="md" mb={12} />
        <Skeleton height={18} width="100%" radius="md" mb={12} />
        <Skeleton height={18} width="100%" radius="md" mb={12} />
      </div>
      <div className={styles.skeletonReview}>
        <Skeleton height={24} width="30%" radius="md" mb={16} />
        <Skeleton height={16} width="100%" radius="md" mb={10} />
        <Skeleton height={16} width="100%" radius="md" mb={10} />
      </div>
    </div>
  );
}
