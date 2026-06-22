
export default function DashedBorder() {
  return (
   
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="1"
          y="1"
          width="calc(100% - 2px)"
          height="calc(100% - 2px)"
          rx="14"
          fill="none"
          stroke="#8DD3BB"
          strokeWidth="2"
          strokeDasharray="8 8"
          strokeLinecap="round"
        />
      </svg>
  )
}
