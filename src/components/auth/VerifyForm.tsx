import { Button } from "#/components/ui/button";
import { Field, FieldError, FieldLabel } from "#/components/ui/field";
import { Input } from "#/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";

type Props = {
  handleVerify: (data: { code: string }) => Promise<void>;
  sendEmailCode: () => void;
  fetchStatus: "idle" | "fetching";
};

export default function VerifyForm({
  handleVerify,
  sendEmailCode,
  fetchStatus,
}: Props) {
  const { handleSubmit, register, formState } = useForm({
    resolver: zodResolver(
      z.object({ code: z.string().min(1, "Code is required") }),
    ),
    defaultValues: {
      code: "",
    },
  });

  return (
    <div>
      <Button
        variant={"link"}
        className="mb-4 flex items-center gap-1 px-0 text-sm text-black"
      >
        <ChevronLeft className="size-5" />
        <p className="text-sm font-medium">Back to Home</p>
      </Button>
      <div className="mb-12 space-y-4">
        <h3 className="text-[32px] leading-none font-bold">Verify code</h3>
        <p className="text-sm text-[#546869]">
          An authentication code has been sent to your email.
        </p>
      </div>
      <form className="" onSubmit={handleSubmit(handleVerify)}>
        <Field data-invalid={formState.errors.code} className="relative w-full">
          <FieldLabel className="absolute -top-2.25 left-3 w-fit! bg-white px-1 text-sm font-normal">
            Enter Code
          </FieldLabel>

          <Input
            {...register("code")}
            type="text"
            placeholder="Enter verification code"
            className="h-14 w-full rounded-[4px] border-[#79747E] px-4 text-lg tracking-widest"
          />

          {formState.errors.code && (
            <FieldError errors={[formState.errors.code]} />
          )}
        </Field>

        <div className="mt-4 flex items-center gap-1 text-center text-sm">
          <p className="font-medium">Didn’t receive a code?</p>
          <button
            type="button"
            onClick={sendEmailCode}
            className="text-salmon font-semibold hover:underline"
          >
            Resend
          </button>
        </div>

        <Button
          type="submit"
          className="mt-8 h-12 w-full"
          disabled={fetchStatus === "fetching"}
        >
          {fetchStatus === "fetching" ? (
            <p className="flex items-center gap-2">
              Verifying...
              <Loader2 className="size-4 animate-spin" />
            </p>
          ) : (
            "Verify account"
          )}
        </Button>
      </form>
    </div>
  );
}
