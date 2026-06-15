export default function PreviewAvatar({ userAvatar }: { userAvatar: string }) {
  return (
    <div className="hidden space-y-4 md:block">
      <div>
        <h4 className="text-sm font-medium">Size Preview</h4>
        <p className="text-muted-foreground text-sm">
          Your avatar will be displayed in different sizes throughout the
          application.
        </p>
      </div>
      <div className="flex items-end gap-4">
        <div className="size-22 overflow-hidden rounded-full">
          <img src={userAvatar} className="h-full w-full object-cover" />
        </div>

        <div className="size-15 overflow-hidden rounded-full">
          <img src={userAvatar} className="h-full w-full object-cover" />
        </div>

        <div className="size-10 overflow-hidden rounded-full">
          <img src={userAvatar} className="h-full w-full object-cover" />
        </div>

        <div className="size-8 overflow-hidden rounded-full">
          <img src={userAvatar} className="h-full w-full object-cover" />
        </div>
      </div>
    </div>
  );
}
