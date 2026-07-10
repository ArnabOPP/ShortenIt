import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  errorText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, helperText, errorText, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-on-surface">
            {label}
          </label>
        )}
        <input
          id={id}
          ref={ref}
          className={cn(
            "h-11 rounded-xl border border-outline bg-surface-container-lowest px-4 text-sm text-on-surface placeholder:text-on-surface-variant/60 outline-none transition focus:border-primary focus:ring-3 focus:ring-primary/20",
            errorText && "border-error focus:border-error focus:ring-error/20",
            className
          )}
          {...props}
        />
        {errorText ? (
          <span className="text-xs text-error">{errorText}</span>
        ) : helperText ? (
          <span className="text-xs text-on-surface-variant">{helperText}</span>
        ) : null}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
