import type { ChatMessage } from "../types/assistant";

interface Props {
  messages: ChatMessage[];
  isLoading?: boolean;
}

const ChatMessageList = ({
  messages,
  isLoading = false,
}: Props) => {
  return (
    <div className="w-full">

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-5 px-6 py-6">

        {messages.map((message) => {
          const isUser = message.role === "user";

          return (
            <div
              key={message.id}
              className={`flex w-full ${
                isUser ? "justify-end" : "justify-start"
              }`}
            >

              <div
                className={`flex max-w-[85%] items-start gap-3 ${
                  isUser ? "flex-row-reverse" : "flex-row"
                }`}
              >

                {/* Avatar */}

                <div
                  className={`
                    flex
                    h-10
                    w-10
                    flex-shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    ${
                      isUser
                        ? "bg-slate-800 text-slate-300"
                        : "bg-blue-600/20 text-blue-400"
                    }
                  `}
                >
                  {isUser ? "U" : "AI"}
                </div>

                {/* Message */}

                <div
                  className={`
                    rounded-2xl
                    px-5
                    py-4
                    ${
                      isUser
                        ? "bg-blue-600 text-white"
                        : "border border-slate-800 bg-slate-900 text-slate-200"
                    }
                  `}
                >
                  <p className="whitespace-pre-wrap break-words text-sm leading-7">
                    {message.content}
                  </p>
                </div>

              </div>

            </div>
          );
        })}

        {/* Loading */}

        {isLoading && (
          <div className="flex items-start gap-3">

            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-blue-600/20 text-blue-400">
              AI
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 px-5 py-4">

              <div className="flex items-center gap-1.5">

                <span className="h-2 w-2 animate-bounce rounded-full bg-blue-400" />

                <span
                  className="h-2 w-2 animate-bounce rounded-full bg-blue-400"
                  style={{ animationDelay: "150ms" }}
                />

                <span
                  className="h-2 w-2 animate-bounce rounded-full bg-blue-400"
                  style={{ animationDelay: "300ms" }}
                />

              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
};

export default ChatMessageList;