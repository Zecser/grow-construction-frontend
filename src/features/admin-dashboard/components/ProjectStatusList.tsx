import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../../components/ui/card";
import ProjectStatusBar from "./ProjectStatusBar";
import useOngoingProjects from "../hooks/useOngoingProjects";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LabelList,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";
import { useEffect, useState } from "react";
import { colorsHex, colorsRow } from "../constants/constants";
import { Button } from "@/components/ui/button";

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

const truncate = (s: string, max = 18) =>
  s && s.length > max ? `${s.slice(0, max - 1)}…` : s;

const MobileEndValueLabel = (props: any) => {
  const { x = 0, y = 0, width = 0, height = 0, value } = props;
  const v = Math.max(0, Math.min(100, Number(value) || 0));
  const isInside = v >= 90;
  const padInside = 4;
  const padOutside = 6;

  const tx = isInside ? x + width - padInside : x + width + padOutside;
  const ty = y + height / 2;

  return (
    <text
      x={tx}
      y={ty}
      textAnchor={isInside ? "end" : "start"}
      dominantBaseline="central"
      fill={isInside ? "#ffffff" : "#111827"}
      fontSize={11}
      fontWeight={700}
    >
      {`${v}%`}
    </text>
  );
};

const ProjectStatusList = () => {
  const { data, loading, error, refetch, ref, hasNext, seeMore } =
    useOngoingProjects();
  const isMobile = useIsMobile();

  const chartHeight = Math.max(
    260,
    (isMobile ? 36 : 42) * Math.max(1, data.length)
  );

  return (
    <Card className="rounded-2xl">
      <CardHeader className="pb-0">
        <CardTitle className="text-base md:text-lg">Projects Status</CardTitle>
      </CardHeader>

      <CardContent className="pt-4">
        {error ? (
          <div className="mb-3 rounded border border-red-300 bg-red-50 px-3 py-2 text-red-700 text-xs md:text-sm flex items-center justify-between">
            <span>{error}</span>
            <button
              onClick={refetch}
              className="px-2 py-1 rounded border border-red-400 text-red-700 hover:bg-red-100 text-xs"
            >
              Retry
            </button>
          </div>
        ) : null}

        {data?.length &&
          (isMobile ? (
            <div
              className="w-full overflow-x-hidden"
              style={{ height: chartHeight }}
            >
              <div className="w-[calc(100%+24px)] -ml-3">
                <ResponsiveContainer width="100%" height={chartHeight}>
                  <BarChart
                    layout="vertical"
                    data={data}
                    margin={{ top: 8, right: 28, left: 0, bottom: 8 }}
                    barCategoryGap={20}
                  >
                    <CartesianGrid
                      horizontal
                      vertical={false}
                      stroke="#f1f5f9"
                    />
                    <YAxis
                      type="category"
                      dataKey="label"
                      width={100}
                      tick={{ fontSize: 11 }}
                      interval={0}
                      tickLine={false}
                      tickFormatter={(v: any) => truncate(String(v), 18)}
                    />
                    <XAxis type="number" domain={[0, 100]} hide />
                    <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={16}>
                      {data.map((_, i) => (
                        <Cell key={i} fill={colorsHex[i % colorsHex.length]} />
                      ))}
                      <LabelList
                        dataKey="value"
                        content={<MobileEndValueLabel />}
                      />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          ) : (
            <div className="space-y-3 md:space-y-4">
              {data.map((item, idx) => (
                <ProjectStatusBar
                  key={`${item.label}-${idx}`}
                  label={item.label}
                  percentage={item.value}
                  colorClass={colorsRow[idx % colorsRow.length]}
                  labelClassName="w-full sm:w-[200px] md:w-[260px] lg:w-[340px]"
                  showValue
                />
              ))}
            </div>
          ))}

        {loading && (
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse h-6 bg-gray-100 rounded-md"
              />
            ))}
          </div>
        )}

        {!loading && !data.length && (
          <div className="text-sm text-gray-500 py-6 text-center">
            No ongoing projects to show.
          </div>
        )}
        <div ref={ref} />
        {!loading && hasNext && (
          <Button
            onClick={seeMore}
            className="mx-auto w-full mt-5"
            variant="outline"
          >
            See More...
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectStatusList;
