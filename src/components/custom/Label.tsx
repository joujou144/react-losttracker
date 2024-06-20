import { upperCase } from "lodash";
import { ReactNode } from "react";

type LabelProps = {
  label: string;
  children: ReactNode;
};

const Label = ({ label, children }: LabelProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="lg:text-[15px] tracking-wider">
        {upperCase(label)}
      </label>
      <p className="font-medium lg:text-[15px]">{children}</p>
    </div>
  );
};

export default Label;
