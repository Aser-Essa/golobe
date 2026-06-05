import EditableDateOfBirth from "#/components/profile/EditableDateOfBirth";
import EditableProfileField from "#/components/profile/EditableProfileField";
import EmailManagement from "#/components/profile/email-management/EmailManagement";
import PasswordManagement from "#/components/profile/password-management/PasswordManagement";
import { Separator } from "#/components/ui/separator";
import { addressSchema, nameSchema, phoneSchema } from "#/lib/schemas/user";
import { getUserName } from "#/lib/utils";
import { useUser } from "@clerk/tanstack-react-start";
import { createFileRoute } from "@tanstack/react-router";
import { parseISO } from "date-fns";

export const Route = createFileRoute("/_main/profile/account/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user, isLoaded } = useUser();
  const fullUserName = getUserName(user);

  const phoneNumber = user?.unsafeMetadata.phoneNumber
    ? String(user.unsafeMetadata.phoneNumber)
    : "";

  const address = user?.unsafeMetadata.address
    ? String(user.unsafeMetadata.address)
    : "";

  const birthDate = user?.unsafeMetadata.birthDate
    ? parseISO(user.unsafeMetadata.birthDate as string)
    : undefined;

  return (
    <div>
      <h3 className="text-[32px] font-bold">Account</h3>
      <div className="box-shadow-sm mt-4 space-y-3 rounded-[16px] bg-white px-6 py-8">
        <EditableProfileField
          label="Name"
          defaultValue={fullUserName}
          isLoaded={isLoaded}
          schema={nameSchema}
          onSave={async (value) => {
            if (!user) return;
            await user.update({
              unsafeMetadata: { ...user.unsafeMetadata, displayName: value },
            });
          }}
        />

        <Separator className="bg-foreground/20" />

        <EmailManagement />

        <Separator className="bg-foreground/20" />

        <PasswordManagement />

        <Separator className="bg-foreground/20" />

        <EditableProfileField
          label="Phone number"
          defaultValue={phoneNumber}
          type="number"
          isLoaded={isLoaded}
          schema={phoneSchema}
          onSave={async (value) => {
            if (!user) return;
            await user.update({
              unsafeMetadata: { ...user.unsafeMetadata, phoneNumber: value },
            });
          }}
        />

        <Separator className="bg-foreground/20" />

        <EditableProfileField
          label="Address"
          defaultValue={address}
          type="text"
          isLoaded={isLoaded}
          schema={addressSchema}
          onSave={async (value) => {
            if (!user) return;
            await user.update({
              unsafeMetadata: { ...user.unsafeMetadata, address: value },
            });
          }}
        />

        <Separator className="bg-foreground/20" />

        <EditableDateOfBirth
          defaultValue={birthDate}
          isLoaded={isLoaded}
          onSave={async (value) => {
            if (!user) return;
            await user.update({
              unsafeMetadata: { ...user.unsafeMetadata, birthDate: value },
            });
          }}
        />
      </div>
    </div>
  );
}
