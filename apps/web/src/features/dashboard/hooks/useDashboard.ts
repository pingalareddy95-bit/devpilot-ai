import { useEffect, useState } from "react";
import dashboardService, {
  type DashboardResponse,
} from "../services/dashboard.service";

export function useDashboard() {
  const [data, setData] = useState<DashboardResponse | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const response = await dashboardService.getDashboard();

      setData(response);

      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  return {
    data,
    loading,
    error,
    refresh: loadDashboard,
  };
}