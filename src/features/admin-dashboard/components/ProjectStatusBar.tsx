import clsx from "clsx";
import type { Props } from "../types/types";


export default function ProjectStatusBar({
  label,
  percentage,
  colorClass = "bg-green-700",
  labelClassName = "w-full sm:w-[180px] md:w-[240px] lg:w-[320px]",
  showValue = true,
}: Props) {
  const pct = Math.max(0, Math.min(100, Number(percentage) || 0));

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
      {/* label */}
      <div
        className={clsx("shrink-0 pr-1 sm:pr-2 leading-tight", labelClassName)}
      >
        <div className="text-sm md:text-base text-gray-900 break-words">
          {label}
        </div>
      </div>

      <div className="w-full min-w-0 h-6 md:h-7 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={clsx(
            "h-full rounded-full transition-[width] duration-300",
            colorClass
          )}
          style={{ width: `${pct}%` }}
          aria-label={`${label} ${pct}%`}
        >
          {showValue && (
            <div className="h-full flex items-center justify-end pr-2">
              <span className="text-[11px] md:text-xs font-semibold text-white">
                {Math.round(pct)}%
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
