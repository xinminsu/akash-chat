'use server';

import OpenAI from 'openai';

const client = new OpenAI({
    apiKey: process.env.DEEPSEEK_API_KEY,
    baseURL: "https://api.deepseek.com"
  });

export async function continueTextConversation(input: string) {
  const chatCompletion = await client.chat.completions.create({
    messages: [{ role: 'user', content: input }],
    model: 'deepseek-chat',
  });

  const result = await chatCompletion.choices[0].message.content;

  return result;
}

