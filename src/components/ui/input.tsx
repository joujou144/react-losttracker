import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md px-3 py-2 text-sm text-warm-gray ring-offset-0 file:border-0 file:bg-transparent file:text-sm file:font-light placeholder:text-gray-20 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        // autoComplete="off"
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
