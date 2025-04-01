"use client";
import { useState } from "react";

export default function useCopyToClipboard() {
  const [copied, setCopied] = useState(false);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return { copied, handleCopy };
}