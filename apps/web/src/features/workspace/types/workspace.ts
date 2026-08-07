export interface FileNode {
  id: string;
  name: string;
  type: "file" | "folder";
  language?: string;
  path: string;
  children?: FileNode[];
}

export interface EditorTab {
  id: string;
  name: string;
  path: string;
  language: string;
  content: string;
  isDirty: boolean;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface TerminalLine {
  id: string;
  type: "command" | "output" | "error";
  value: string;
}

export interface WorkspaceState {
  explorer: FileNode[];
  openTabs: EditorTab[];
  activeTab?: EditorTab;
  chat: ChatMessage[];
  terminal: TerminalLine[];
}