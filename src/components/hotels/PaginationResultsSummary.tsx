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
    <p className="text-sm font-semibold">
      Showing {from}-{to} of{" "}
      <span className="text-salmon">{totalCount} places</span>
    </p>
  );
}
