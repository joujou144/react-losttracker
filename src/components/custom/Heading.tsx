import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type HeadingProps = {
  title: string;
  className?: string;
  children?: ReactNode;
};

const Heading = ({ children, title, className }: HeadingProps) => {
  return (
    <div
      className={cn("flex justify-start items-center gap-2 w-full", className)}
    >
      {children}
      <h2 className="h2-bold text-left w-full">{title}</h2>
    </div>
  );
};

export default Heading;
