import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { Button } from "../ui/button";

type FileUploaderProps = {
  fieldChange: (FILES: File[]) => void;
  mediaUrl: string;
};

const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState<string>(mediaUrl);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [file]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="flex flex-center flex-col bg-surface-mixed-100 rounded-lg cursor-pointer"
    >
      <input {...getInputProps()} className="cursor-pointer" />
      {fileUrl ? (
        <>
          <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
            <img src={fileUrl} alt="image" className="file_uploader-img" />
          </div>
          <p className="text-xs text-gray-50 opacity-70 text-center w-full pb-5">
            Click or drag photo to replace
          </p>
        </>
      ) : (
        <div className="file_uploader-box">
          <MdOutlineAddAPhoto size={60} fillOpacity={0.4} />
          <p className="font-normal mt-1">Drag photo here</p>
          <p className="uppercase text-gray-50 opacity-70 text-xs mt-1">
            png, jpg, jpeg
          </p>

          <Button className="shad-button-dark mt-2">Select from device</Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
