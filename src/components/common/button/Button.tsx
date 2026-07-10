import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline";
};

const Button = ({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        "rounded-lg px-5 py-2 transition font-medium cursor-pointer",
        {
          "bg-violet-600 text-white hover:bg-violet-700": variant === "primary",

          "bg-gray-100 hover:bg-gray-200": variant === "secondary",

          "border border-gray-300 hover:bg-gray-100": variant === "outline",
        },
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
