import {
  Paperclip,
  Send,
  Sparkles,
} from "lucide-react";

import { useState } from "react";

import type {
  FormEvent,
  KeyboardEvent,
} from "react";

interface Props {
  onSend: (message: string) => void;
  disabled?: boolean;
}

const ChatInput = ({
  onSend,
  disabled = false,
}: Props) => {
  const [message, setMessage] =
    useState("");

  const submit = () => {
    const value =
      message.trim();

    if (
      !value ||
      disabled
    ) {
      return;
    }

    onSend(value);

    setMessage("");
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    submit();
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();

      submit();
    }
  };

  return (
    <div className="flex-shrink-0 border-t border-slate-800 bg-slate-950 p-4">

      <form
        onSubmit={handleSubmit}
        className="mx-auto w-full max-w-5xl"
      >

        <div
          className="
            overflow-hidden
            rounded-xl
            border
            border-slate-700
            bg-slate-900
            shadow-lg
            transition
            focus-within:border-blue-500/60
            focus-within:shadow-blue-500/5
          "
        >

          {/* ================================================== */}
          {/* TEXTAREA */}
          {/* ================================================== */}

          <textarea
            value={message}
            onChange={(event) =>
              setMessage(
                event.target.value,
              )
            }
            onKeyDown={
              handleKeyDown
            }
            disabled={disabled}
            rows={2}
            maxLength={10000}
            placeholder="Ask DevPilot AI anything..."
            className="
              block
              max-h-40
              min-h-[64px]
              w-full
              resize-none
              bg-transparent
              px-4
              pt-3
              text-sm
              leading-6
              text-white
              outline-none
              placeholder:text-slate-600
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          />

          {/* ================================================== */}
          {/* ACTION BAR */}
          {/* ================================================== */}

          <div className="flex items-center justify-between px-3 pb-3 pt-2">

            {/* LEFT ACTIONS */}

            <div className="flex items-center gap-2">

              <button
                type="button"
                disabled={disabled}
                aria-label="Attach file"
                title="File attachments will be available soon"
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-md
                  text-slate-500
                  transition
                  hover:bg-slate-800
                  hover:text-slate-300
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
              >
                <Paperclip
                  size={16}
                />
              </button>

              <span className="hidden text-[10px] text-slate-600 sm:block">
                Enter to send · Shift + Enter for new line
              </span>

            </div>

            {/* SEND */}

            <button
              type="submit"
              disabled={
                disabled ||
                message.trim()
                  .length === 0
              }
              className="
                flex
                h-9
                items-center
                gap-2
                rounded-lg
                bg-blue-600
                px-3
                text-xs
                font-medium
                text-white
                transition
                hover:bg-blue-500
                active:bg-blue-700
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
            >

              <Sparkles
                size={14}
              />

              <span>
                Ask AI
              </span>

              <Send
                size={13}
              />

            </button>

          </div>

        </div>

        {/* ================================================== */}
        {/* DISCLAIMER */}
        {/* ================================================== */}

        <p className="mt-2 text-center text-[10px] text-slate-600">
          DevPilot AI can make mistakes.
          Verify important code and
          information.
        </p>

      </form>

    </div>
  );
};

export default ChatInput;