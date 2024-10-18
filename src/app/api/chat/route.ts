import { createOllama } from "ollama-ai-provider";

import { streamText } from "ai";

const ollama = createOllama();

export async function POST(req: Request) {
  const { messages, modelId } = await req.json();
  console.log(modelId);

  const result = await streamText({
    system: 'You are a writing assistant, you are strict and rigorous. you want to help with fiction writing. your name is Alice.',
    model: ollama(modelId),
    messages,
  });

  return result.toDataStreamResponse();
}
