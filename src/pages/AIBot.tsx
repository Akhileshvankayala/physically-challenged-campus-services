import React, { useState, useEffect, useRef } from 'react';
import { Bot, Mic, Loader, User } from 'lucide-react';
import toast from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';

interface Message {
  sender: 'user' | 'bot';
  text: string;
  image?: string;
}

export default function AIBot() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]); // State to store the chat messages
  const [loading, setLoading] = useState(false); // State to indicate loading
  const chatContainerRef = useRef<HTMLDivElement>(null); // Ref to the chat container

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      toast.error('Please enter a message');
      return;
    }

    // Add user's message to the chat and clear the input field
    setMessages((prevMessages) => [...prevMessages, { sender: 'user', text: message }]);
    setMessage('');

    setLoading(true); // Set loading to true

    try {
      const res = await fetch('http://127.0.0.1:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (res.ok) {
        const data = await res.json();
        // Add bot's response to the chat
        setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: data.response }]);
        toast.success('Response received');
      } else {
        const errorData = await res.json();
        toast.error('Failed to get response: ' + errorData.error);
      }
    } catch (error) {
      console.error('Error getting response:', error);
      toast.error('Failed to get response');
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  const handleMicClick = async () => {
    setLoading(true); // Set loading to true
    try {
      const res = await fetch('http://127.0.0.1:5000/speech', {
        method: 'POST',
      });

      if (res.ok) {
        const data = await res.json();
        // Add recognized speech and bot's response to the chat
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'user', text: data.question },
          { sender: 'bot', text: data.response },
        ]);
        toast.success('Speech recognized and response received');
      } else {
        const errorData = await res.json();
        toast.error('Failed to recognize speech: ' + errorData.error);
      }
    } catch (error) {
      console.error('Error recognizing speech:', error);
      toast.error('Failed to recognize speech');
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  useEffect(() => {
    // Scroll to the bottom of the chat container whenever messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="max-w-4xl mx-auto px-4 min-h-[calc(100vh-4rem)] flex flex-col">
      <div className="flex-1 bg-white rounded-lg shadow-md p-6 mb-8 flex flex-col">
        <div className="flex items-center justify-center mb-6">
          <Bot className="h-8 w-8 text-indigo-600 mr-2" />
          <h1 className="text-2xl font-bold text-gray-900">AI Assistant</h1>
        </div>

        <div
          className="flex-1 bg-gray-50 rounded-lg p-4 mb-4 overflow-y-auto"
          style={{ maxHeight: '400px', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          ref={chatContainerRef}
        >
          <style>
            {`
              .flex-1::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>
          {/* Chat messages */}
          {messages.map((msg, index) => (
            <div key={index} className={`mb-4 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.sender === 'bot' && (
                <div className="flex-shrink-0 mr-2">
                  <Bot className="h-8 w-8 text-indigo-600" />
                </div>
              )}
              <div
                className={`inline-block p-2 rounded-lg ${
                  msg.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-900'
                }`}
              >
                {msg.sender === 'bot' ? (
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                ) : (
                  msg.text
                )}
              </div>
              {msg.image && (
                <div className="mt-2">
                  <img src={`http://127.0.0.1:5000/${msg.image}`} alt="Captured" className="rounded-lg" />
                </div>
              )}
              {msg.sender === 'user' && (
                <div className="flex-shrink-0 ml-2">
                  <User className="h-8 w-8 text-gray-600" />
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex justify-start items-center mb-4">
              <div className="flex-shrink-0 mr-2">
                <Bot className="h-8 w-8 text-indigo-600" />
              </div>
              <div className="inline-block p-2 rounded-lg bg-gray-200 text-gray-900">
                Generating...
                <Loader className="animate-spin h-5 w-5 text-gray-500 ml-2 inline-block" />
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="relative">
          <div className="absolute bottom-3 left-3 flex space-x-2">
            <button
              type="button"
              className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Use microphone"
              onClick={handleMicClick}
            >
              <Mic className="h-5 w-5" />
            </button>
          </div>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
          />
        </form>
      </div>
    </div>
  );
}