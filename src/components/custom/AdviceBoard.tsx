import { upperCase } from "lodash";
import { ReactNode } from "react";

type BoardProps = {
  children: ReactNode;
  title?: string;
};

const AdviceBoard = ({ children, title }: BoardProps) => {
  return (
    <div className="bg-dark-300 text-primary-700 rounded-lg p-5 flex flex-col gap-1">
      <label className={"text-xs tracking-wider text-primary-500"}>
        {upperCase(title)}
      </label>
      {children}
    </div>
  );
};

export default AdviceBoard;
