export interface DashboardStat {
  title: string
  value: number | string
  icon: string
  color: string
}

export interface QuickAction {
  id: number
  title: string
  description: string
  icon: string
}

export interface RecentChat {
  id: number
  title: string
  time: string
}

export interface RecentProject {
  id: number;
  name: string;
  language: string;
  status: "Running" | "Completed" | "Stopped";
  updated: string;
}