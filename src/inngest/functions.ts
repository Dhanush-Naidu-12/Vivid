import { inngest } from "./client";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";

const google = createGoogleGenerativeAI()


export const execute = inngest.createFunction(
  { id: "execute" },
  { event: "execute/ai" },
  async ({ event, step }) => {
    const {steps} = await step.ai.wrap("gemini-generate-text", generateText,{
      system: "You are a helpful assistant",
      prompt: "What is 2+2?",
      model: google("gemini-2.5-flash")
    })
    
    return steps
  },
);