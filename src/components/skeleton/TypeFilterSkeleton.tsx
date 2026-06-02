import { Fragment } from "react/jsx-runtime";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

export default function TypeFilterSeleton({
  TYPES_TABS,
}: {
  TYPES_TABS: { label: string }[];
}) {
  return (
    <div className="box-shadow-sm flex h-20 w-full items-center gap-6 rounded-[12px] bg-white px-6 py-4">
      {TYPES_TABS.map(({ label }, i) => (
        <Fragment key={`${i}-${label}`}>
          <Separator
            orientation="vertical"
            className="bg-[#D7E2EE] first:hidden"
          />
          <div className="flex h-full flex-1 flex-col justify-between space-y-2">
            {/* label is real */}
            <p className="text-base font-semibold text-black">{label}</p>

            {/* skeleton for count */}
            <div className="flex items-center gap-1">
              <Skeleton className="h-3 w-14" />
            </div>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
