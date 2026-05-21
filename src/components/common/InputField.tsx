import { cn } from "#/lib/utils";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

type InputFieldProps<T extends FieldValues> = {
  name: FieldPath<T>;
  control:  Control<T>;
  label: string;
  placeholder: string;
  type?: string;
  className?: string;
  icon?: React.ReactNode;
};

export default function InputField<T extends FieldValues>({
  name,
  control,
  label,
  type = "text",
  placeholder,
  className,
  icon,
}: InputFieldProps<T>) {
  return (
     
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="relative w-full">
            <FieldLabel
              htmlFor={field.name}
              className="absolute -top-2.25 left-3 z-10 w-fit! bg-white rounded-[8px] px-1 text-sm font-normal"
            >
              {label}
            </FieldLabel>
            <div className="relative">
              {icon}
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder={placeholder || label}
                type={type}
                className={cn(
                  "h-14 w-full rounded-[4px] border-[#79747E] px-4 bg-white!",
                  className,
                )}
              />
            </div>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
     
  );
}
