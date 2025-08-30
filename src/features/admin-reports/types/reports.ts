export type UiStatus = "Ongoing" | "Completed" | "Upcoming";
export type StatusFilter = "All Status" | UiStatus;

export interface Report {
  id: string;
  title: string;
  clientId: string;
  clientName: string;
  status: "Completed" | "Ongoing" | "Upcoming";
  deadline: string;
  completion: number;
  details: string;
  startDate?: string;
  location?: string;
  category?: string;
  budget?: string | null;
}

export type ReportControlsProps = {
  search: string;
  onSearchChange: (v: string) => void;

  statusFilter: string;
  onStatusChange: (
    v: "All Status" | "Ongoing" | "Completed" | "Upcoming"
  ) => void;

  onAddProject: () => void;
  className?: string;
};

export interface ReportStatsProps {
  loading: boolean;
  totalProjects: number;
  completedProjects: number;
  ongoingProjects: number;
  avgCompletion: number;
  onFilterByStat?: (
    key: "total" | "completed" | "ongoing" | "upcoming"
  ) => void;
  error?: string | null;
  onRetry?: () => void;
}

export interface ReportCardProps {
  report: any;
  statusColor: (status: string) => string;
  onEdit: (report: any) => void;
  onDelete: (report: any) => void;
}

export type ProjectsListApi = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    id: number | string;
    Client_name: string | null;
    Client_id: string | null;
    title: string | null;
    description: string | null;
    location: string | null;
    status: string | null;
    status_percentage?: number | null;
    budget?: string | null;
    start_date?: string | null;
    deadline?: string | null;
    end_date?: string | null;
    completion?: number | null;
    details?: string | null;
  }>;
};

export type ReportsStatsApi = {
  total_projects: number;
  completed_projects: number;
  ongoing_projects: number;
  upcoming_projects?: number;
  average_completion: number;
};

export type DeleteReportModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
  reportTitle: string;
  loading: boolean;
};

export const normalizeStatusUI = (s?: string | null): UiStatus => {
  const x = (s || "").toLowerCase();
  if (x === "completed") return "Completed";
  if (x === "upcoming") return "Upcoming";
  return "Ongoing";
};

export const toApiStatus = (ui: StatusFilter): string | undefined => {
  if (ui === "Completed") return "completed";
  if (ui === "Ongoing") return "ongoing";
  if (ui === "Upcoming") return "upcoming";
  return undefined;
};
