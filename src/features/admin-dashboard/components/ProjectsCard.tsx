import {
  CardHeader,
  CardTitle,
  CardContent,
} from "../../../components/ui/card";
import { ChartContainer, type ChartConfig } from "../../../components/ui/chart";
import { Bar, BarChart, CartesianGrid, Cell, LabelList, XAxis } from "recharts";
import { Checkbox } from "../../../components/ui/checkbox";

const projectsData = [
  { label: "Q1", value: 35 },
  { label: "Q2", value: 45 },
  { label: "Q3", value: 65 },
  { label: "Q4", value: 75 },
  { label: "Q5", value: 95 },
];

const config: ChartConfig = {
  value: { label: "Projects", color: "var(--primary)" },
};

const ProjectsCard = () => (
  <div>
    <CardHeader className="px-[20px] pb-[10px]">
      <CardTitle className="md:text-xl xl:text-2xl">
        Projects
      </CardTitle>
    </CardHeader>
    <CardContent className="items-start md:items-end px-[20px] md:px-[40px] gap-6 flex flex-col md:flex-row">
      <div className="md:text-xl lg:text-2xl font-semibold">
        <p>75%</p>
        <span className="text-red-500 flex items-center gap-1 text-[16px]">
          <Checkbox className="!checked:bg-red-500 !border-red-500 data-[state=checked]:!bg-red-500 border-2 data-[state=checked]:text-white !bg-white" />
          17.08%
        </span>
      </div>
      <ChartContainer config={config} className="w-full max-w-lg mx-auto">
        <BarChart data={projectsData} width={600} height={300}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="label" axisLine={false} tickLine={false} />
          <Bar dataKey="value" radius={4}>
            {projectsData.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill="var(--primary)" />
            ))}
            <LabelList
              dataKey="value"
              position="insideTop"
              formatter={(value: any) => `${value}%`}
              fill="#fff"
              fontSize={12}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </CardContent>
  </div>
);

export default ProjectsCard;
