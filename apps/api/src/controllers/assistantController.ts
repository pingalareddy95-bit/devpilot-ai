import type { Request, Response } from "express";

import { generateAssistantResponse } from "../services/assistantService.js";
import type { AssistantMessage } from "../types/assistant.js";

export const chat = async (req: Request, res: Response) => {
  try {
    const { message, conversation = [] } = req.body;

    if (typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        error: "Message is required.",
      });
    }

    if (!Array.isArray(conversation)) {
      return res.status(400).json({
        error: "Conversation must be an array.",
      });
    }

    const validConversation: AssistantMessage[] = conversation.filter(
      (item): item is AssistantMessage =>
        item &&
        (item.role === "user" || item.role === "assistant") &&
        typeof item.content === "string",
    );

    const response = await generateAssistantResponse(
      message.trim(),
      validConversation,
    );

    return res.status(200).json(response);
  } catch (error) {
    console.error("Assistant API error:", error);

    return res.status(500).json({
      error: "Unable to generate AI response.",
    });
  }
};
