import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, AlertCircle } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface Message {
  id: string;
  role: 'user' | 'model' | 'system';
  text: string;
  isError?: boolean;
}

const ChatWidget: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Olá! Sou seu farmacêutico virtual. Como posso ajudar você hoje com seus suplementos ou medicamentos?'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: inputValue
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const apiKey = process.env.API_KEY;
      if (!apiKey) {
        throw new Error("Chave de API não configurada.");
      }

      const ai = new GoogleGenAI({ apiKey });
      
      // Construct history for context
      // We limit context to last 10 messages to save tokens and stay focused
      const history = messages.slice(-10).map(m => 
         m.role === 'user' ? `User: ${m.text}` : `Model: ${m.text}`
      ).join('\n');
      
      const prompt = `
        System: Você é um farmacêutico experiente e amigável da CERTA Farmácia. 
        Seu objetivo é ajudar clientes com dúvidas sobre suplementos (Whey, Creatina, Vitaminas) e manipulados.
        Seja conciso, profissional, mas caloroso. Use emojis ocasionalmente.
        Nunca recomende medicamentos tarja preta ou controlados sem receita médica explícita.
        Se a pergunta for médica grave, recomende procurar um médico.
        Responda em português do Brasil.
        
        Contexto da conversa:
        ${history}

        Nova pergunta do usuário:
        ${userMessage.text}
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const text = response.text;

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: text || "Desculpe, não consegui processar sua resposta. Tente novamente."
      };

      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error("Erro no chat:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'system',
        text: "Ocorreu um erro ao conectar com o assistente inteligente. Verifique sua conexão ou tente mais tarde.",
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col h-[600px]">
        <h3 className="text-2xl font-bold text-certa-blue mb-4 flex items-center">
            <Bot className="w-6 h-6 mr-2 text-certa-orange" />
            Assistente Virtual CERTA
        </h3>
        
        <div className="flex-1 border border-gray-200 bg-gray-50 rounded-lg p-4 mb-4 overflow-y-auto space-y-4">
            {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-xl ${
                        msg.role === 'user' 
                            ? 'bg-certa-orange text-white rounded-tr-none' 
                            : msg.isError 
                                ? 'bg-red-100 text-red-700 border border-red-200'
                                : 'bg-certa-blue text-white rounded-tl-none'
                    }`}>
                        {msg.isError && <AlertCircle className="w-4 h-4 inline mr-1" />}
                        <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                    </div>
                </div>
            ))}
            {isLoading && (
                 <div className="flex justify-start">
                    <div className="bg-gray-200 text-gray-500 p-3 rounded-xl rounded-tl-none flex items-center">
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        <span className="text-xs">Digitando...</span>
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>

        <div className="flex items-center space-x-2">
            <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={!process.env.API_KEY ? "Chat indisponível (Sem API Key)" : "Digite sua dúvida..."}
                disabled={isLoading || !process.env.API_KEY}
                className="flex-1 border border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-certa-orange focus:border-transparent outline-none disabled:bg-gray-100"
            />
            <button 
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim() || !process.env.API_KEY}
                className="bg-certa-orange text-white p-3 rounded-lg hover:bg-opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </button>
        </div>
         {!process.env.API_KEY && (
             <p className="text-xs text-red-500 mt-2 text-center">
                 ⚠️ API Key não detectada. O chat funcionará apenas após a configuração.
             </p>
         )}
    </div>
  );
};

export default ChatWidget;