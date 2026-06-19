import { dateOfBirthSchema } from "#/lib/schemas/user";
import { cn } from "#/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, startOfToday } from "date-fns";
import { Check, FilePenLine, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import DateField from "../common/DateField";
import { Button } from "../ui/button";
import ProfileFieldSkeleton from "./ProfileFieldSkeleton";

type EditableDateOfBirthProps = {
  defaultValue: Date | undefined;
  onSave: (value: string) => Promise<void>;
  isLoaded: boolean;
};

export default function EditableDateOfBirth({
  defaultValue,
  onSave,
  isLoaded,
}: EditableDateOfBirthProps) {
  const [isEditable, setIsEditable] = useState(false);

  const { handleSubmit, control, watch, setValue } = useForm({
    resolver: zodResolver(dateOfBirthSchema),
    defaultValues: {
      birthDate: defaultValue || new Date(1990, 0, 1),
    },
  });

  const birthDate = watch("birthDate");

  const isToday = startOfToday();

  async function onSubmit(data: { birthDate: Date }) {
    const result = format(data.birthDate, "yyyy-MM-dd");
    await onSave(result);
    setIsEditable(false);
  }

  function onError(error: any) {
    console.error(error);
    toast.error(error.birthDate.message);
  }

  function handleCancel() {
    setIsEditable(false);
    setValue("birthDate", defaultValue || new Date());
  }

  useEffect(() => {
    if (isLoaded) {
      setValue("birthDate", defaultValue || new Date());
    }
  }, [isLoaded, defaultValue]);

  if (!isLoaded) return <ProfileFieldSkeleton label="Date of birth" />;

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <div className="space-y-4">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div className="space-y-3">
            <p className="text-foreground/75 text-sm">Date of birth</p>
            {isEditable ? (
              <DateField
                control={control}
                name="birthDate"
                label=""
                date={birthDate}
                captionLayout={"dropdown"}
                disabledDays={(date) =>
                  date >= isToday || date < new Date(1900, 0, 1)
                }
                className="w-full! sm:w-[212px]!"
              />
            ) : (
              <p
                className={cn(
                  "text-base font-semibold",
                  !defaultValue && "text-foreground/40 italic select-none",
                )}
              >
                {defaultValue
                  ? format(defaultValue, "dd-MM-yyyy")
                  : `No Date of birth available`}
              </p>
            )}
          </div>

          {isEditable ? (
            <div className="flex gap-2">
              <Button
                type="button"
                onClick={handleCancel}
                variant="outline"
                className="h-12 flex-1 bg-white sm:w-12"
              >
                <X />
              </Button>
              <Button
                type="submit"
                variant="outline"
                className="h-12 flex-1 bg-white font-medium sm:w-35"
              >
                <Check />
                <p>Save</p>
              </Button>
            </div>
          ) : (
            <Button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setIsEditable(true);
              }}
              variant={"outline"}
              className="h-12 bg-white font-medium sm:w-35"
            >
              <FilePenLine />
              <p>Change</p>
            </Button>
          )}
        </div>
      </div>
    </form>
  );
}
