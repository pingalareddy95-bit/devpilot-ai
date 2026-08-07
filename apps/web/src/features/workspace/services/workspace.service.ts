import type { WorkspaceState } from "../types/workspace";

export const getWorkspace = async (): Promise<WorkspaceState> => {
  return {
    explorer: [
      {
        id: "1",
        name: "src",
        type: "folder",
        path: "/src",
        children: [
          {
            id: "2",
            name: "App.tsx",
            type: "file",
            path: "/src/App.tsx",
            language: "tsx",
          },
          {
            id: "3",
            name: "main.tsx",
            type: "file",
            path: "/src/main.tsx",
            language: "tsx",
          },
        ],
      },
    ],

    openTabs: [
      {
        id: "1",
        name: "App.tsx",
        path: "/src/App.tsx",
        language: "tsx",
        content: "",
        isDirty: false,
      },
    ],

    activeTab: {
      id: "1",
      name: "App.tsx",
      path: "/src/App.tsx",
      language: "tsx",
      content: "",
      isDirty: false,
    },

    chat: [],

    terminal: [],
  };
};