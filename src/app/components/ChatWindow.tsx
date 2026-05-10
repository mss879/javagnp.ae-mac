"use client";

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// Parse simple markdown into React elements: **bold**, line breaks
function RichText({ text }: { text: string }) {
  if (!text) return null;

  const lines = text.split('\n');

  return (
    <>
      {lines.map((line, lineIdx) => {
        const parts = line.split(/(\*\*[^*]+\*\*)/g);
        return (
          <span key={lineIdx}>
            {parts.map((part, partIdx) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return (
                  <strong key={partIdx} className="font-semibold">
                    {part.slice(2, -2)}
                  </strong>
                );
              }
              return <span key={partIdx}>{part}</span>;
            })}
            {lineIdx < lines.length - 1 && <br />}
          </span>
        );
      })}
    </>
  );
}

interface ChatWindowProps {
  chat: ReturnType<typeof import('@ai-sdk/react').useChat>;
  onClose: () => void;
}

export default function ChatWindow({ chat, onClose }: ChatWindowProps) {
  const { messages, sendMessage, status } = chat;
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isThinking = status === 'submitted';
  const isStreaming = status === 'streaming';
  const isBusy = isThinking || isStreaming;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isBusy) return;
    sendMessage({ text: input });
    setInput('');
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  const getRawText = (msg: typeof messages[number]) => {
    if (!msg.parts) return '';
    return msg.parts
      .filter((p: any) => p.type === 'text')
      .map((p: any) => p.text)
      .join('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, x: 20 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.9, x: 20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="absolute bottom-0 right-[calc(100%+16px)] w-[370px] max-w-[calc(100vw-100px)] bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden z-[10000]"
      style={{ height: "520px", maxHeight: "calc(100vh - 120px)" }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-red-800 via-red-700 to-red-800 px-5 py-4 flex items-center justify-between shadow-md relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center shrink-0 border border-white/10">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
          </div>
          <div>
            <h3 className="text-white font-bold text-sm tracking-wide">JavaGNP Assistant</h3>
            <div className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${isThinking ? 'bg-yellow-400 animate-pulse' : isStreaming ? 'bg-green-400 animate-pulse' : 'bg-green-400'}`}></span>
              <p className={`text-[10px] uppercase tracking-widest font-semibold transition-colors ${isThinking ? 'text-yellow-300' : isStreaming ? 'text-green-300' : 'text-white/60'}`}>
                {isThinking ? 'Thinking...' : isStreaming ? 'Typing...' : 'Online'}
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-white/70 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 5-7 7 7 7"/></svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gradient-to-b from-gray-50 to-white">
        {/* Welcome */}
        <div className="flex justify-start">
          <div className="bg-white border border-gray-100 shadow-sm rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%] text-[13px] text-gray-800 leading-relaxed">
            Hello! I&apos;m the <strong className="font-semibold">JavaGNP</strong> Customer Service Assistant. How can I help you today?
          </div>
        </div>

        {messages.map(m => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`rounded-2xl px-4 py-3 max-w-[85%] text-[13px] leading-[1.7] shadow-sm ${
                m.role === 'user'
                  ? 'bg-red-900 text-white rounded-tr-sm'
                  : 'bg-white border border-gray-100 text-gray-800 rounded-tl-sm'
              }`}
            >
              {getRawText(m) ? (
                <RichText text={getRawText(m)} />
              ) : (
                m.role === 'assistant' && (
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                  </span>
                )
              )}
            </div>
          </div>
        ))}

        {/* Thinking bubble */}
        {isThinking && messages.length > 0 && messages[messages.length - 1]?.role === 'user' && (
          <div className="flex justify-start">
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-gray-100 shadow-sm rounded-2xl rounded-tl-sm px-5 py-3.5 text-sm text-gray-800 flex items-center gap-2"
            >
              <span className="w-2 h-2 bg-red-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-2 h-2 bg-red-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-2 h-2 bg-red-400 rounded-full animate-bounce"></span>
            </motion.div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-gray-100 relative z-10">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-700/20 focus:border-red-700 transition-all text-gray-900 placeholder:text-gray-400"
          />
          <button
            type="submit"
            disabled={isBusy || !input.trim()}
            className="w-12 h-12 bg-gradient-to-br from-red-700 to-red-900 rounded-xl flex items-center justify-center text-white shrink-0 shadow-md transition-transform active:scale-95 disabled:opacity-40 disabled:active:scale-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="translate-x-[1px] translate-y-[-1px]"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
          </button>
        </form>
      </div>
    </motion.div>
  );
}
