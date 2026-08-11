import type { Request, Response } from "express";

import { generateAssistantResponse } from "../services/assistantService.js";

export const chat = async (
  req: Request,
  res: Response,
) => {
  try {
    const { message } = req.body;

    if (
      typeof message !== "string" ||
      !message.trim()
    ) {
      return res.status(400).json({
        error: "Message is required.",
      });
    }

    const response =
      await generateAssistantResponse(
        message.trim(),
      );

    return res.status(200).json(response);
  } catch (error) {
    console.error(
      "Assistant API error:",
      error,
    );

    return res.status(500).json({
      error: "Unable to generate AI response.",
    });
  }
};