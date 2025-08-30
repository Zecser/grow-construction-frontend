type Props = {
  label: string;
  percentage: number;
  colorClass?: string;
};

const ProjectStatusBar = ({ label, percentage, colorClass }: Props) => (
  <div className="flex flex-col md:flex-row md:items-center">
    <p className="w-[90px] text-sm">{label}</p>
    <div className="relative w-full col-span-3 bg-muted h-6 md:h-8 overflow-hidden">
      <div
        className={`h-6 md:h-8 w-full ${colorClass ?? "bg-primary"}`}
        style={{ width: `${percentage}%` }}
      />
      <span className="absolute right-2 text-xs font-medium text-white">
        {`${percentage}%`}
      </span>
      <p className="absolute left-2 text-xs text-white">{label}</p>
    </div>
  </div>
);

export default ProjectStatusBar;
