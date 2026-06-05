import EditableProfileField from "#/components/profile/EditableProfileField";
import EmailManagement from "#/components/profile/email-management/EmailManagement";
import { phoneSchema } from "#/lib/schemas/user";
import { getUserName } from "#/lib/utils";
import { useUser } from "@clerk/tanstack-react-start";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/profile/account/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user, isLoaded } = useUser();
  const fullUserName = getUserName(user);
  const phoneNumber = user?.unsafeMetadata.phoneNumber
    ? String(user.unsafeMetadata.phoneNumber)
    : "";

  return (
    <div>
      <h3 className="text-[32px] font-bold">Account</h3>
      <div className="box-shadow-sm mt-4 space-y-8 rounded-[16px] bg-white px-6 py-8">
        <EditableProfileField
          label="Name"
          defaultValue={fullUserName}
          isLoaded={isLoaded}
          onSave={async (value) => {
            if (!user) return;
            await user.update({
              unsafeMetadata: { ...user.unsafeMetadata, displayName: value },
            });
          }}
        />

        <EmailManagement />

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
      </div>
    </div>
  );
}
