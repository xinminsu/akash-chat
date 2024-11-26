'use server';

import OpenAI from 'openai';

const client = new OpenAI({
    apiKey: process.env.AKASH_API_KEY,
    baseURL: "https://chatapi.akash.network/api/v1"
  });

export async function continueTextConversation(input: string) {
  const chatCompletion = await client.chat.completions.create({
    messages: [{ role: 'user', content: input }],
    model: 'Meta-Llama-3-1-8B-Instruct-FP8',
  });

  const result = await chatCompletion.choices[0].message.content;

  return result;
}

