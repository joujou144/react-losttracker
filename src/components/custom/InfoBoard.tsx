import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import Heading from "./Heading";

type InfoBoardProps = {
  children: ReactNode;
  className?: string;
  title: string | (() => string);
};

const InfoBoard = ({ children, className, title }: InfoBoardProps) => {
  const renderTitle = typeof title === "function" ? title() : title;

  return (
    <div
      className={cn(
        `${className} bg-dark-600 text-primary-700 px-5 py-6 rounded-lg mb-6`
      )}
    >
      <Heading title={renderTitle} className="mb-4" />
      {children}
    </div>
  );
};

export default InfoBoard;
