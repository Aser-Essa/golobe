import { FilePenLine } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";

type EditableProfileFieldProps = {
  defaultValue: string;
  label: string;
  onSave: (value: string) => Promise<any>;
  type?: string;
  isLoaded: boolean;
  schema?: z.ZodString | z.ZodEmail;
};

type FormValues = { value: string };

export default function EditableProfileField({
  defaultValue,
  label,
  type = "text",
  onSave,
  isLoaded,
  schema,
}: EditableProfileFieldProps) {
  const [isEditable, setIsEditable] = useState(false);

  const formSchema = z.object({ value: schema ?? z.string() });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: { value: defaultValue },
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    reset({ value: defaultValue });
  }, [defaultValue, reset]);

  async function onSubmit(data: FormValues) {
    await onSave(data.value);
    setIsEditable(false);
  }

  return (
    <div className="flex items-center justify-between">
      <div className="space-y-2">
        <p className="text-foreground/75 text-sm">{label}</p>
        {isEditable ? (
          <div className="space-y-1">
            <Input
              {...register("value")}
              className={`rounded-sm text-base! font-semibold! ${errors.value ? "border-red-500 focus-visible:ring-red-500" : ""}`}
              type={type}
            />
            {errors.value && (
              <p className="text-xs text-red-500">{errors.value.message}</p>
            )}
          </div>
        ) : (
          <>
            {isLoaded ? (
              <p className="text-base font-semibold">{defaultValue}</p>
            ) : (
              <Skeleton className="h-6 w-32" />
            )}
          </>
        )}
      </div>

      {isEditable ? (
        <Button
          onClick={handleSubmit(onSubmit)}
          variant={"outline"}
          className="h-12 w-35 bg-white font-medium"
        >
          <FilePenLine />
          <p>Save</p>
        </Button>
      ) : (
        <Button
          onClick={() => setIsEditable(true)}
          variant={"outline"}
          className="h-12 w-35 bg-white font-medium"
        >
          <FilePenLine />
          <p>Change</p>
        </Button>
      )}
    </div>
  );
}
