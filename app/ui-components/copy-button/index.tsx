import React, { useState } from "react";
import styles from "./styles.module.scss";
import { CopyIcon } from "../icons/copy-icon";

type CopyButtonProps = {
  textToCopy: string;
};

const CopyButton: React.FC<CopyButtonProps> = ({ textToCopy }) => {
  const [, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <button onClick={handleCopy} className={styles.copyButton}>
      {textToCopy.slice(0, 6) + '...' + textToCopy.slice(-6)}

      <CopyIcon />
    </button>
  );
};

export { CopyButton };