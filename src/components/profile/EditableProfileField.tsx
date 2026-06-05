import { cn } from "#/lib/utils";
import { Check, FilePenLine, X } from "lucide-react";
import { useState } from "react";
import type { z } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import ProfileFieldSkeleton from "./ProfileFieldSkeleton";

type EditableProfileFieldProps = {
  defaultValue: string;
  label: string;
  onSave: (value: string) => Promise<any>;
  type?: string;
  isLoaded: boolean;
  schema?: z.ZodString;
};

export default function EditableProfileField({
  defaultValue,
  label,
  type = "text",
  onSave,
  isLoaded,
  schema,
}: EditableProfileFieldProps) {
  const [isEditable, setIsEditable] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  function handleEdit() {
    setValue(defaultValue);
    setError(null);
    setIsEditable(true);
  }

  function handleCancel() {
    setIsEditable(false);
    setError(null);
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;

    setValue(newValue);
    if (schema) {
      const result = schema.safeParse(newValue);
      if (!result.success) {
        setError(result.error.issues[0].message);
        return;
      } else {
        setError(null);
      }
    }
  }

  async function handleSave() {
    if (schema) {
      const result = schema.safeParse(value);
      if (!result.success) {
        setError(result.error.issues[0].message);
        return;
      }
    }

    setIsSaving(true);
    try {
      await onSave(value);
      setIsEditable(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSaving(false);
    }
  }

  if (!isLoaded) return <ProfileFieldSkeleton label={label} />;

  return (
    <div className="flex items-center justify-between">
      <div className="space-y-2">
        <p className="text-foreground/75 text-sm">{label}</p>

        {isEditable ? (
          <div className="space-y-1">
            <Input
              autoFocus
              value={value}
              onChange={onInputChange}
              type={type}
              className={`rounded-sm text-base! font-semibold! ${
                error ? "border-red-500 focus-visible:ring-red-500" : ""
              }`}
            />
            {error && <p className="text-xs text-red-500">{error}</p>}
          </div>
        ) : (
          <p
            className={cn(
              "text-base font-semibold",
              !defaultValue && "text-foreground/40 italic select-none",
            )}
          >
            {defaultValue || `No ${label} available`}
          </p>
        )}
      </div>

      {isEditable ? (
        <div className="flex gap-2">
          <Button
            type="button"
            onClick={handleCancel}
            variant="outline"
            className="h-12 w-12 bg-white"
          >
            <X />
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            variant="outline"
            className="h-12 w-35 bg-white font-medium"
          >
            <Check />
            <p>{isSaving ? "Saving..." : "Save"}</p>
          </Button>
        </div>
      ) : (
        <Button
          type="button"
          onClick={handleEdit}
          variant="outline"
          className="h-12 w-35 bg-white font-medium"
        >
          <FilePenLine />
          <p>Change</p>
        </Button>
      )}
    </div>
  );
}
