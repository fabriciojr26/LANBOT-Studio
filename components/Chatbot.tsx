
import React, { useState, useEffect, useRef } from 'react';
import { BotIcon } from './icons';

interface Message {
  id: number;
  sender: 'bot' | 'user';
  type: 'text' | 'options';
  content: string | { text: string; action: () => void }[];
}

const TypingIndicator: React.FC = () => (
  <div className="flex items-center space-x-1 p-3">
    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
  </div>
);

const Chatbot: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isVisible) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages([
          {
            id: 1,
            sender: 'bot',
            type: 'text',
            content: 'Ei 👋 Gostou da oferta?',
          },
        ]);
        setTimeout(() => {
           setMessages(prev => [...prev, {
            id: 2,
            sender: 'bot',
            type: 'text',
            content: 'Quer ativar sua TV por apenas R$10/mês agora mesmo?',
          }]);
          setTimeout(() => setShowOptions(true), 500);
        }, 1200);
      }, 2000);
    }
  }, [isVisible]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleOptionClick = (text: string) => {
    setShowOptions(false);
    const userMessage: Message = {
      id: Date.now(),
      sender: 'user',
      type: 'text',
      content: text,
    };
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const botResponse: Message = {
        id: Date.now() + 1,
        sender: 'bot',
        type: 'text',
        content:
          'Perfeito! Para finalizar seu pedido de forma segura, vou te redirecionar para um de nossos atendentes no WhatsApp. Clique no link abaixo!',
      };
      const linkResponse: Message = {
        id: Date.now() + 2,
        sender: 'bot',
        type: 'text',
        content: '<a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer" class="text-blue-400 font-bold hover:underline">Iniciar Atendimento via WhatsApp</a>'
      }
      setMessages(prev => [...prev, botResponse, linkResponse]);
    }, 2000);
  };

  return (
    <div
      className={`fixed bottom-4 right-4 w-[calc(100%-2rem)] max-w-sm transition-all duration-500 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <div className="bg-gray-900/80 backdrop-blur-md border border-gray-700 rounded-xl shadow-2xl shadow-blue-500/20 flex flex-col h-[28rem]">
        <header className="flex items-center p-4 border-b border-gray-700">
          <div className="relative">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <BotIcon />
            </div>
            <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-400 border-2 border-gray-900"></span>
          </div>
          <div className="ml-3">
            <h3 className="font-bold text-white">Assistente Virtual</h3>
            <p className="text-xs text-green-400">Online</p>
          </div>
        </header>
        
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.sender === 'bot' && (
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                   <BotIcon className="w-4 h-4" />
                </div>
              )}
              <div
                className={`max-w-[80%] p-3 rounded-xl ${
                  msg.sender === 'bot'
                    ? 'bg-gray-800 text-gray-200 rounded-bl-none'
                    : 'bg-blue-600 text-white rounded-br-none'
                }`}
              >
                {typeof msg.content === 'string' ? <div dangerouslySetInnerHTML={{ __html: msg.content }} /> : null}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex items-end gap-2 justify-start">
               <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                   <BotIcon className="w-4 h-4" />
                </div>
              <div className="bg-gray-800 rounded-xl rounded-bl-none">
                <TypingIndicator />
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {showOptions && (
          <div className="p-4 border-t border-gray-700">
            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleOptionClick('Sim, quero ativar agora!')}
                className="w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Sim, quero ativar agora!
              </button>
              <button
                onClick={() => handleOptionClick('Tenho uma dúvida.')}
                className="w-full px-4 py-2 bg-gray-700 text-gray-300 font-semibold rounded-lg hover:bg-gray-600 transition-colors"
              >
                Tenho uma dúvida
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chatbot;
