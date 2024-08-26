'use client';

import { type CoreMessage } from 'ai';
import { useState } from 'react';
// import { continueConversation } from './actions';
import { continueConversation } from '@/app/actions';
import { readStreamableValue } from 'ai/rsc';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { IconArrowUp } from '@/components/ui/icons';
export const maxDuration = 30;

export default function Chat() {
  const [messages, setMessages] = useState<CoreMessage[]>([]);
  const [input, setInput] = useState<string>('');
  return (    
    <div className="group w-full overflow-auto">
      {messages.length === 0 && (
        <div className="bg-white rounded-lg max-w-xl mx-auto p-5 mt-10 border">
          <h1 className="text-lg font-semibold mb-8">Next AI SDK Lite</h1>
          <p>A simplified AI chatbot focused on speed to learning, wins and deployment.</p>
          <p>To edit this chatbot</p>
        </div>
      )}
      
      {messages.length > 0 && (
        <div className="max-w-xl mx-auto mt-10 mb-24">
          {messages.map((message, index) => (
            <div key={index} className="whitespace-pre-wrap flex mb-5">
              <div className={`${message.role === 'user' ? 'bg-slate-200 ml-auto' : 'bg-transparent'} p-2 rounded-lg`}>
                {message.content as string}
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="fixed inset-x-0 bottom-10 w-full ">
        <div className="w-full max-w-xl mx-auto px-5 py-2 bg-white border shadow-sm rounded-lg">
          <form
            onSubmit={async e => {
              e.preventDefault();
              const newMessages: CoreMessage[] = [
                ...messages,
                { content: input, role: 'user' },
              ];
              setMessages(newMessages);
              setInput('');
              const result = await continueConversation(newMessages);
              for await (const content of readStreamableValue(result)) {
                setMessages([
                  ...newMessages,
                  {
                    role: 'assistant',
                    content: content as string, 
                  },
                ]);
              }
            }}
          >
          <div className="flex">
            <Input
              type="text"
              value={input}
              onChange={event => {
                setInput(event.target.value);
              }}
              className="w-[95%] mr-2 border-0 focus-visible:ring-0 focus:outline-none focus:ring-0 ring-0 border-transparent focus:border-transparent"
              placeholder='Ask me anything...'
            />
            <Button>
              <IconArrowUp />
            </Button>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
}