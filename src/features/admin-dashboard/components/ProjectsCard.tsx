import { useEffect, useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
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

const COLOR_BY_LABEL: Record<string, string> = {
  Upcoming: "#16a34a",
  Ongoing: "#047857",
  Completed: "#60a5fa",
  Recent: "#9ca3af",
};

const RAD = Math.PI / 180;

const renderInsideLabel = (isMobile: boolean) => (props: any) => {
  const { cx, cy, midAngle, outerRadius, percent } = props;
  const r = outerRadius * 0.65;
  const x = cx + r * Math.cos(-midAngle * RAD);
  const y = cy + r * Math.sin(-midAngle * RAD);

  const text = `${Math.round((percent || 0) * 100)}%`;

  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      dominantBaseline="central"
      fill="#ffffff"
      fontWeight={700}
      fontSize={isMobile ? 12 : 13}
      style={{
        paintOrder: "stroke",
        stroke: "rgba(0,0,0,0.28)",
        strokeWidth: 2,
      }}
    >
      {text}
    </text>
  );
};

export default function ProjectsCard() {
  const { data } = useStatusCounts();
  const isMobile = useIsMobile();

  const cx = isMobile ? "50%" : "40%";
  const outerRadius = isMobile ? 100 : 150;
  const innerRadius = 0;

  return (
    <>
      <div className="px-6 pt-4">
        <div className="text-base md:text-lg font-semibold">Projects</div>
      </div>

      <div className="mx-auto w-full overflow-x-hidden h-[45vh] min-h-[300px] md:h-[55vh] md:min-h-[380px] md:max-w-[980px] px-4 pb-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="label"
              cx={cx}
              cy="50%"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              label={renderInsideLabel(isMobile)}
              labelLine={false}
              isAnimationActive={false}
            >
              {data.map((entry, i) => (
                <Cell
                  key={`slice-${entry.label}-${i}`}
                  fill={COLOR_BY_LABEL[entry.label] ?? "#166534"}
                />
              ))}
            </Pie>

            <Legend
              layout={isMobile ? "horizontal" : "vertical"}
              align={isMobile ? "center" : "right"}
              verticalAlign={isMobile ? "bottom" : "middle"}
              wrapperStyle={{
                fontSize: isMobile ? 11 : 12,
                paddingTop: isMobile ? 8 : 0,
              }}
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
