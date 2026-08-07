import {
  stats,
  quickActions,
  recentChats,
  recentProjects,
  dailyTip,
} from "../data/dashboardData";

export interface DashboardResponse {
  stats: typeof stats;
  quickActions: typeof quickActions;
  recentChats: typeof recentChats;
  recentProjects: typeof recentProjects;
  dailyTip: string;
}

class DashboardService {
  async getDashboard(): Promise<DashboardResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          stats,
          quickActions,
          recentChats,
          recentProjects,
          dailyTip,
        });
      }, 500);
    });
  }
}

export default new DashboardService();