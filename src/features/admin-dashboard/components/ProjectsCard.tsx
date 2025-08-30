import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import useStatusCounts from "../hooks/useStatusCounts";

const useIsMobile = () => {
  const [m, setM] = useState<boolean>(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 640px)").matches
      : false
  );
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 640px)");
    const onChange = (e: MediaQueryListEvent) => setM(e.matches);
    mq.addEventListener?.("change", onChange);
    mq.addListener?.(onChange);
    return () => {
      mq.removeEventListener?.("change", onChange);
      mq.removeListener?.(onChange);
    };
  }, []);
  return m;
};

export default function ProjectsCard() {
  const { data } = useStatusCounts();
  const isMobile = useIsMobile();

  return (
    <>
      <div className="px-6 pt-4">
        <div className="text-base md:text-lg font-semibold">Projects</div>
      </div>

      <div className="mx-auto w-full overflow-x-hidden h-[40vh] min-h-[220px] md:h-[50vh] md:min-h-[280px] md:max-w-[980px] px-4 pb-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            barSize={isMobile ? 30 : 50}
            barCategoryGap={isMobile ? 10 : 20}
            margin={{ top: 18, right: 8, left: 8, bottom: isMobile ? 64 : 28 }}
          >
            <XAxis
              dataKey="label"
              interval={0}
              tick={{ fontSize: isMobile ? 11 : 12 }}
              tickMargin={isMobile ? 12 : 10}
              axisLine={false}
              tickLine={false}
              angle={isMobile ? -60 : 0}
              textAnchor={isMobile ? "end" : "middle"}
              height={isMobile ? 56 : 28}
            />
            <YAxis hide domain={[0, "dataMax + 8"]} />

            <Bar dataKey="value" fill="#166534" radius={[6, 6, 0, 0]}>
              <LabelList
                dataKey="value"
                position="top"
                offset={6}
                formatter={(v: any) => `${v}%`}
                style={{ fontSize: isMobile ? 11 : 12, fontWeight: 600 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
