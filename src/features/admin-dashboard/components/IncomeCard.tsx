import {
  CardHeader,
  CardTitle,
  CardContent,
} from "../../../components/ui/card";
import {
  ChartContainer,
  type ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
} from "../../../components/ui/chart";
import { AreaChart, Area, CartesianGrid, XAxis } from "recharts";
import { Checkbox } from "../../../components/ui/checkbox";

const incomeData = [
  { month: "M1", income: 200 },
  { month: "M2", income: 400 },
  { month: "M3", income: 300 },
  { month: "M4", income: 500 },
  { month: "M5", income: 600 },
];

const config: ChartConfig = {
  income: { label: "Income", color: "var(--primary)" },
};

const IncomeCard = () => (
  <div>
    <CardHeader className="px-[20px] pb-[10px]">
      <CardTitle>Income</CardTitle>
    </CardHeader>
    <CardContent className="items-start md:items-end px-[20px] gap-6 flex flex-col md:flex-row">
      <div className="md:text-xl lg:text-2xl font-semibold">
        <p>75%</p>
        <span className="text-red-500 flex items-center gap-1 text-[16px]">
          <Checkbox className="!checked:bg-red-500 !border-red-500 data-[state=checked]:!bg-red-500 border-2 data-[state=checked]:text-white !bg-white" />
          17.08%
        </span>
      </div>

      <ChartContainer config={config} className="w-full max-w-md">
        <AreaChart data={incomeData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" axisLine={false} tickLine={false} />
          <Area
            type="monotone"
            dataKey="income"
            stroke="var(--color-income)"
            fill="var(--color-income)"
          />
          <ChartTooltip content={<ChartTooltipContent />} />
        </AreaChart>
      </ChartContainer>
    </CardContent>
  </div>
);

export default IncomeCard;
