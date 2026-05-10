import { openai } from '@ai-sdk/openai';
import { streamText, convertToModelMessages } from 'ai';
import { JAVA_GNP_KNOWLEDGE_BASE } from '@/lib/knowledgeBase';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Convert UIMessage[] (parts-based, from useChat client) to ModelMessage[] (content-based, for streamText)
  const modelMessages = await convertToModelMessages(messages);

  const result = streamText({
    model: openai('gpt-4o-mini'),
    system: JAVA_GNP_KNOWLEDGE_BASE,
    messages: modelMessages,
    temperature: 0.7,
  });

  return result.toUIMessageStreamResponse();
}
