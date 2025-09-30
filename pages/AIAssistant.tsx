
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { useAuth } from '../App';
import { ICONS } from '../constants';

type Message = {
    sender: 'user' | 'ai';
    text: string;
};

const AIAssistant: React.FC = () => {
    const { user } = useAuth();
    const [messages, setMessages] = useState<Message[]>([
        { sender: 'ai', text: "Hello! I'm the Securix AI Assistant. How can I help you today with blue carbon insights?" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages, isLoading]);

    const handleSendMessage = async (prompt?: string) => {
        const userMessage = prompt || input;
        if (!userMessage.trim()) return;

        setMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
        setInput('');
        setIsLoading(true);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: userMessage,
                config: {
                    systemInstruction: "You are an expert AI assistant for Securix, a platform for blue carbon MRV and credit registry. Be helpful, concise, and knowledgeable about carbon credits, mangrove restoration, climate finance, and blockchain technology. Use data from the platform where relevant.",
                }
            });
            const aiText = response.text;
            setMessages(prev => [...prev, { sender: 'ai', text: aiText }]);
        } catch (error) {
            console.error("Error calling Gemini API:", error);
            setMessages(prev => [...prev, { sender: 'ai', text: "Sorry, I encountered an error. Please try again." }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSendMessage();
    };

    const promptSuggestions = [
        "What is blue carbon?",
        "Summarize the Karimun Jawa project.",
        "How is the price of a carbon credit determined?",
        "Explain the MRV process.",
    ];

    return (
        <div className="flex flex-col h-full font-display bg-white rounded-2xl shadow-lg">
            {/* Chat Messages */}
            <div className="flex-1 p-6 overflow-y-auto">
                <div className="max-w-4xl mx-auto">
                    {/* Prompt suggestions */}
                    {messages.length <= 1 && (
                         <div className="mb-8">
                            <h2 className="text-lg font-semibold text-gray-600 mb-3 text-center">Or try one of these prompts:</h2>
                            <div className="grid grid-cols-2 gap-3">
                                {promptSuggestions.map((prompt, i) => (
                                    <button key={i} onClick={() => handleSendMessage(prompt)} className="text-left p-3 bg-gray-100 hover:bg-primary-light/20 rounded-lg text-sm text-primary-dark transition-colors">
                                        {prompt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                   
                    <div className="space-y-6">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex items-start gap-4 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                                {msg.sender === 'ai' && (
                                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shrink-0">
                                        {ICONS.assistant}
                                    </div>
                                )}
                                <div className={`max-w-lg p-4 rounded-2xl ${msg.sender === 'user' ? 'bg-primary text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none'}`}>
                                    <p className="whitespace-pre-wrap">{msg.text}</p>
                                </div>
                                {msg.sender === 'user' && user && (
                                     <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
                                )}
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shrink-0">
                                    {ICONS.assistant}
                                </div>
                                <div className="max-w-lg p-4 rounded-2xl bg-gray-100 text-gray-800 rounded-bl-none">
                                    <div className="flex items-center space-x-1">
                                        <span className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                        <span className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                        <span className="h-2 w-2 bg-primary rounded-full animate-bounce"></span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>
            </div>

            {/* Input Area */}
            <div className="p-6 border-t border-gray-200 bg-white/50 backdrop-blur-sm">
                <div className="max-w-4xl mx-auto">
                    <form onSubmit={handleFormSubmit} className="flex items-center space-x-4">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask the AI Assistant..."
                            className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="bg-primary text-white rounded-full p-3 hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-110 transition-all duration-200"
                            aria-label="Send message"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AIAssistant;
