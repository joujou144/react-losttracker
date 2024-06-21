import { cn } from "@/lib/utils";
import { upperCase } from "lodash";
import { ReactNode } from "react";

type LabelProps = {
  label: string;
  children: ReactNode;
  className?: string;
  labelClass?: string;
};

const Label = ({ label, children, className, labelClass }: LabelProps) => {
  return (
    <div className={cn(`${className} flex flex-col gap-1`)}>
      <label
        className={cn(`${labelClass} text-xs tracking-wider text-dark-500`)}
      >
        {upperCase(label)}
      </label>
      <p className="font-medium lg:text-[15px]">{children}</p>
    </div>
  );
};

export default Label;
