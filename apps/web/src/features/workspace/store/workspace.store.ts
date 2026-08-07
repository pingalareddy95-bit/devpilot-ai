import { create } from "zustand";
import type {
  FileNode,
  EditorTab,
  ChatMessage,
  TerminalLine,
} from "../types/workspace";

interface WorkspaceStore {
  explorer: FileNode[];
  tabs: EditorTab[];
  activeTab?: EditorTab;
  chat: ChatMessage[];
  terminal: TerminalLine[];

  setExplorer: (files: FileNode[]) => void;
  setTabs: (tabs: EditorTab[]) => void;
  setActiveTab: (tab: EditorTab) => void;
  addMessage: (message: ChatMessage) => void;
  addTerminalLine: (line: TerminalLine) => void;
}

export const useWorkspaceStore = create<WorkspaceStore>((set) => ({
  explorer: [],
  tabs: [],
  activeTab: undefined,
  chat: [],
  terminal: [],

  setExplorer: (files) =>
    set({
      explorer: files,
    }),

  setTabs: (tabs) =>
    set({
      tabs,
    }),

  setActiveTab: (tab) =>
    set({
      activeTab: tab,
    }),

  addMessage: (message) =>
    set((state) => ({
      chat: [...state.chat, message],
    })),

  addTerminalLine: (line) =>
    set((state) => ({
      terminal: [...state.terminal, line],
    })),
}));