import type { InputHTMLAttributes } from "react";
import clsx from "clsx";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = ({ className, ...props }: InputProps) => {
  return (
    <input
      className={clsx(
        "w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-violet-600",
        className,
      )}
      {...props}
    />
  );
};

export default Input;
