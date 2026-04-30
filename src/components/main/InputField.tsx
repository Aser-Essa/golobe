import { Controller } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { cn } from "#/lib/utils";

type InputFieldProps = {
  name: string;
  control: any;
  label: string;
  placeholder: string;
  type?: string;
  className?: string;
};

export default function InputField({
  name,
  control,
  label,
  type = "text",
  placeholder,
  className,
}: InputFieldProps) {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="relative w-full">
            <FieldLabel
              htmlFor={field.name}
              className="absolute -top-2.25 left-3 w-fit! bg-white px-1 text-sm font-normal"
            >
              {label}
            </FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder={placeholder || label}
              type={type}
              className={cn(
                "h-14 w-full rounded-[4px] border-[#79747E] px-4",
                className,
              )}
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </>
  );
}
