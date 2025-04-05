import React from "react";
import styles from "./templateSelector.module.css";
import { BookCardTemplate } from "../bookCard/BookCard";

interface TemplateSelectorProps {
  currentTemplate: BookCardTemplate;
  onTemplateChange: (template: BookCardTemplate) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  currentTemplate,
  onTemplateChange,
}) => {
  return (
    <div className={styles.templateSelector}>
      <h3 className={styles.selectorTitle}>表示テンプレート選択：</h3>
      <div className={styles.buttons}>
        <button
          className={`${styles.templateButton} ${
            currentTemplate === "review" ? styles.active : ""
          }`}
          onClick={() => onTemplateChange("review")}
        >
          感想重視
        </button>
        <button
          className={`${styles.templateButton} ${
            currentTemplate === "dueDate" ? styles.active : ""
          }`}
          onClick={() => onTemplateChange("dueDate")}
        >
          返却日重視
        </button>
      </div>
    </div>
  );
};

export default TemplateSelector;
