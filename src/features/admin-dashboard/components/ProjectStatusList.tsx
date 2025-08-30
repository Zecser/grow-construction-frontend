import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../../components/ui/card";
import ProjectStatusBar from "./ProjectStatusBar";

const statusData = [
  { label: "Alpha", percentage: 35, colorClass: "bg-green-700" },
  { label: "Beta", percentage: 45, colorClass: "bg-green-500" },
  { label: "Gamma", percentage: 55, colorClass: "bg-blue-300" },
  { label: "Delta", percentage: 65, colorClass: "bg-green-300" },
  { label: "Epsilon", percentage: 75, colorClass: "bg-gray-400" },
];

const ProjectStatusList = () => (
  <Card>
    <CardHeader >
      <CardTitle className="md:text-xl xl:text-2xl">Projects Status</CardTitle>
    </CardHeader>
    <CardContent className="space-y-2 md:space-y-4">
      {statusData.map((item) => (
        <ProjectStatusBar
          key={item.label}
          label={item.label}
          percentage={item.percentage}
          colorClass={item.colorClass}
        />
      ))}
    </CardContent>
  </Card>
);

export default ProjectStatusList;
