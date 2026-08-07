import type {
  DashboardStat,
  QuickAction,
  RecentChat,
  RecentProject,
} from "../types/dashboard";

export const stats: DashboardStat[] = [
  {
    title: "AI Chats",
    value: 24,
    icon: "MessageSquare",
    color: "blue",
  },
  {
    title: "Projects",
    value: 8,
    icon: "Folder",
    color: "green",
  },
  {
    title: "APIs Built",
    value: 12,
    icon: "Globe",
    color: "purple",
  },
  {
    title: "Hours Saved",
    value: 46,
    icon: "Clock",
    color: "orange",
  },
];

export const quickActions: QuickAction[] = [
  {
    id: 1,
    title: "AI Chat",
    description: "Ask DevPilot AI anything",
    icon: "Bot",
  },
  {
    id: 2,
    title: "Explain Code",
    description: "Understand existing code",
    icon: "Code",
  },
  {
    id: 3,
    title: "Generate API",
    description: "Create REST APIs",
    icon: "Globe",
  },
  {
    id: 4,
    title: "Debug Error",
    description: "Analyze stack traces",
    icon: "Bug",
  },
  {
    id: 5,
    title: "SQL Builder",
    description: "Generate SQL queries",
    icon: "Database",
  },
  {
    id: 6,
    title: "Resume Review",
    description: "Improve your resume",
    icon: "FileText",
  },
];

export const recentChats: RecentChat[] = [
  {
    id: 1,
    title: "Explain React Hooks",
    time: "10 mins ago",
  },
  {
    id: 2,
    title: "Fix Express Middleware",
    time: "1 hour ago",
  },
  {
    id: 3,
    title: "JWT Authentication",
    time: "Yesterday",
  },
];

export const recentProjects: RecentProject[] = [
  {
    id: 1,
    name: "DevPilot AI",
    language: "React",
    status: "Running",
    updated: "2 mins ago",
  },
  {
    id: 2,
    name: "Portfolio Website",
    language: "Next.js",
    status: "Completed",
    updated: "Yesterday",
  },
  {
    id: 3,
    name: "CRM System",
    language: "Node.js",
    status: "Running",
    updated: "1 hour ago",
  },
  {
    id: 4,
    name: "Weather API",
    language: "Express",
    status: "Stopped",
    updated: "3 days ago",
  },
];

export const dailyTip =
  "Use React.memo only for components that re-render frequently with the same props.";