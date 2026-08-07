import {
  MessageSquare,
  Clock3,
} from "lucide-react";

import type { RecentChat } from "../types/dashboard";

interface Props {
  chats: RecentChat[];
}

const RecentChats = ({ chats }: Props) => {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 shadow-lg">

      <div className="flex items-center gap-3 border-b border-slate-800 px-5 py-4">

        <MessageSquare className="text-blue-400" />

        <h2 className="text-lg font-semibold text-white">
          Recent AI Chats
        </h2>

      </div>

      <div className="divide-y divide-slate-800">

        {chats.map((chat) => (

          <div
            key={chat.id}
            className="
            flex
            items-center
            justify-between
            px-5
            py-4
            transition-all
            duration-200
            hover:bg-slate-800
          "
          >

            <div>

              <h4 className="font-medium text-white">
                {chat.title}
              </h4>

              <p className="mt-1 text-xs text-slate-500">
                AI Conversation
              </p>

            </div>

            <div className="flex items-center gap-2 text-sm text-slate-400">

              <Clock3 size={15} />

              {chat.time}

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default RecentChats;