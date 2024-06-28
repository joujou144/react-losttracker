import { ReactNode } from "react";
import { Link as ReactLink } from "react-router-dom";

type Props = {
  to: string;
  className?: string;
  children: ReactNode;
};

const Link = ({ to, children, className }: Props) => {
  return (
    <ReactLink
      to={to}
      className={`inline-flex items-center gap-0.5 hover:text-primary-100 transition-colors ${className}`}
    >
      {children}
    </ReactLink>
  );
};

export default Link;
