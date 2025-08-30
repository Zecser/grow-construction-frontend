export type StatusCountsApi = {
  upcoming?: string;
  completed?: string;
  recent?: string;
  ongoing?: string;
};

export type OngoingProjectApi = {
  id: number | string;
  title?: string | null;
  Client_name?: string | null;
  completion?: number | null;
  status_percentage?: number | null;
};

export type BarItem = {
  label: string;
  value: number;
};

export type Props = {
  label: string;
  percentage: number;
  colorClass?: string;
  labelClassName?: string;
  showValue?: boolean;
};