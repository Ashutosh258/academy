"use client"

import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill/dist/quill.bubble.css";

interface ReadTextProps {
  value: string | null;
}

const ReadText = ({ value }: ReadTextProps) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );
  const safeValue = value ?? '';
  return (
    <ReactQuill
      theme="bubble"
      value={safeValue}
      readOnly
    />
  );
};

export default ReadText;