import { useEffect, useState } from "react";
import { getWorkspace } from "../services/workspace.service";
import type { WorkspaceState } from "../types/workspace";

export const useWorkspace = () => {
  const [data, setData] = useState<WorkspaceState | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadWorkspace = async () => {
      try {
        const result = await getWorkspace();

        if (mounted) {
          setData(result);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadWorkspace();

    return () => {
      mounted = false;
    };
  }, []);

  return {
    data,
    loading,
  };
};