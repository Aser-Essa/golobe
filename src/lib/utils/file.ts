export function formatFileName(file: File, prefix?: string) {
  const ext = file.name.split(".").pop()?.toLowerCase();

  // clean original name
  const baseName = file.name
    .replace(/\.[^/.]+$/, "") // remove extension
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-") // replace غير المسموح بـ -
    .replace(/-+/g, "-") // remove repeated dashes
    .replace(/^-|-$/g, ""); // trim dashes

  return `${prefix ? prefix + "-" : ""}${baseName}.${ext}`;
}
