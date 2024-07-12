"use client ";

import { ourFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@/lib/uploadthing";
import Image from "next/image";

interface FileUploadPorps {
  value: string;
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
}

const FileUpload = ({ value, onChange, endpoint }: FileUploadPorps) => {
  return (
    <div className="flex flex-col gap-2">
      {value !== "" && (
        <Image
          src={value}
          alt="Preview"
          width={500}
          height={500}
          className="w-[280px] h-[200px] object-cover rounded-xl"
        />
      )}

      <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          onChange(res?.[0].url);
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
        className="w-[280px] h-[280px]"
      />
    </div>
  );
};

export default FileUpload;
