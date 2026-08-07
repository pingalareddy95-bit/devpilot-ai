import { useEffect, useState } from "react";
import { getWorkspace } from "../services/workspace.service";
import type { WorkspaceState } from "../types/workspace";

export const useWorkspace = () => {
  const [data, setData] = useState<WorkspaceState>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getWorkspace().then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);

  return {
    data,
    loading,
  };
};