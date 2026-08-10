import {
  ChevronDown,
  ChevronRight,
  FileCode2,
  Folder,
  FolderOpen,
} from "lucide-react";

import { useState } from "react";
import type { FileNode } from "../../types/workspace";

interface Props {
  files: FileNode[];
}

const Explorer = ({ files }: Props) => {
  return (
    <div className="flex h-full flex-col">

      <div className="flex h-11 items-center border-b border-slate-800 px-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Explorer
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-2">

        {files.map((file) => (
          <FileTreeNode key={file.id} node={file} />
        ))}

      </div>

    </div>
  );
};

interface NodeProps {
  node: FileNode;
  level?: number;
}

const FileTreeNode = ({ node, level = 0 }: NodeProps) => {
  const [open, setOpen] = useState(true);

  const isFolder = node.type === "folder";

  return (
    <div>

      <button
        onClick={() => isFolder && setOpen(!open)}
        className="flex w-full items-center gap-1 rounded-md py-1.5 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
        style={{ paddingLeft: `${level * 14 + 6}px` }}
      >

        {isFolder ? (
          open ? (
            <ChevronDown size={15} />
          ) : (
            <ChevronRight size={15} />
          )
        ) : (
          <span className="w-[15px]" />
        )}

        {isFolder ? (
          open ? (
            <FolderOpen size={16} className="text-blue-400" />
          ) : (
            <Folder size={16} className="text-blue-400" />
          )
        ) : (
          <FileCode2 size={16} className="text-slate-400" />
        )}

        <span className="truncate">
          {node.name}
        </span>

      </button>

      {isFolder && open && node.children && (
        <div>
          {node.children.map((child) => (
            <FileTreeNode
              key={child.id}
              node={child}
              level={level + 1}
            />
          ))}
        </div>
      )}

    </div>
  );
};

export default Explorer;