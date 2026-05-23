type PaginationResultsSummaryProps = {
  totalCount: number;
  from: number;
  to: number;
};

export default function PaginationResultsSummary({
  totalCount,
  from,
  to,
}: PaginationResultsSummaryProps) {
  return (
    <p className="flex items-center gap-1 text-sm font-semibold">
      <span className="hidden md:inline">Showing</span>
      <span>
        {from}-{to} of
      </span>
      <span className="text-salmon flex items-center gap-1">
        <span>{totalCount}</span>
        <span>places</span>
      </span>
    </p>
  );
}
