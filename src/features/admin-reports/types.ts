export interface Report {
  id: string;
  title: string;
  clientId: string;
  clientName: string;
  status: "Completed" | "Ongoing" | "On Hold" | "Not Started";
  deadline: string;
  completion: number;
  details: string;
  startDate?: string;
  location?: string;
  category?: string;
}
