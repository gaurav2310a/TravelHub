'use client';

import { useState } from 'react';
import { Search, Send, Smile, Image as ImageIcon, Bot, User, Edit } from 'lucide-react';

export default function Messages() {
  const [activeChat, setActiveChat] = useState('chatbot');
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState({
    chatbot: [
      { id: 1, sender: 'bot', message: 'Hello! I\'m your TravelHub assistant. How can I help you today?', timestamp: '12:00 PM' },
      { id: 2, sender: 'user', message: 'I\'m looking for budget-friendly destinations in India', timestamp: '12:01 PM' },
      { id: 3, sender: 'bot', message: 'Great! I can suggest several budget-friendly destinations in India. Some popular options include:\n\n1. Goa - Perfect for beaches and nightlife\n2. Rajasthan - Rich in culture and heritage\n3. Kerala - Beautiful backwaters and nature\n4. Himachal Pradesh - Mountain adventures\n\nWould you like more details about any of these places?', timestamp: '12:01 PM' },
    ],
    'rahul': [
      { id: 1, sender: 'rahul', message: 'Hey! Are you joining the Delhi trip next week?', timestamp: '11:30 AM' },
      { id: 2, sender: 'user', message: 'Hi Rahul! Yes, I\'m planning to join. Can you share the itinerary?', timestamp: '11:35 AM' },
    ],
    'priya': [
      { id: 1, sender: 'priya', message: 'The Goa beaches were amazing! Thanks for the recommendations!', timestamp: 'Yesterday' },
    ],
    'zara': [
      { id: 1, sender: 'zara', message: 'Looking forward to the photography workshop!', timestamp: '2d ago' },
    ],
  });

  const contacts = [
    { id: 'chatbot', name: 'TravelBot', avatar: '🤖', status: 'online', unread: 0 },
    { id: 'rahul', name: 'Rahul Kapoor', avatar: 'https://randomuser.me/api/portraits/men/1.jpg', status: 'online', unread: 2 },
    { id: 'priya', name: 'Priya Sharma', avatar: 'https://randomuser.me/api/portraits/women/2.jpg', status: 'offline', unread: 0 },
    { id: 'zara', name: 'Zara Khan', avatar: 'https://randomuser.me/api/portraits/women/3.jpg', status: 'online', unread: 1 },
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: 'user',
      message: message.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChats(prev => ({
      ...prev,
      [activeChat]: [...prev[activeChat], newMessage]
    }));

    // If chatting with bot, generate response
    if (activeChat === 'chatbot') {
      setTimeout(() => {
        const botResponse = {
          id: Date.now() + 1,
          sender: 'bot',
          message: generateBotResponse(message),
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setChats(prev => ({
          ...prev,
          chatbot: [...prev.chatbot, botResponse]
        }));
      }, 1000);
    }

    setMessage('');
  };

  const generateBotResponse = (userMessage) => {
    const responses = {
      hello: 'Hi there! How can I assist you with your travel plans today?',
      help: 'I can help you with:\n- Finding destinations\n- Travel recommendations\n- Booking assistance\n- Local tips\n- Trip planning\n\nWhat would you like to know?',
      weather: 'I can check the weather for any destination. Which place would you like to know about?',
      destination: 'I can suggest destinations based on your preferences. What kind of trip are you looking for? (Beach, Mountains, City, etc.)',
      default: 'I understand you\'re interested in travel. Could you be more specific about what you\'d like to know?'
    };

    const message = userMessage.toLowerCase();
    if (message.includes('hello') || message.includes('hi ')) return responses.hello;
    if (message.includes('help')) return responses.help;
    if (message.includes('weather')) return responses.weather;
    if (message.includes('destination') || message.includes('place') || message.includes('where')) return responses.destination;
    return responses.default;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex h-[calc(100vh-180px)] rounded-2xl bg-white dark:bg-gray-800 shadow-xl overflow-hidden">
          {/* Contacts Sidebar */}
          <div className="w-80 border-r border-gray-200 dark:border-gray-700 flex flex-col">
            {/* Search */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search messages"
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Contacts List */}
            <div className="flex-1 overflow-y-auto">
              {contacts.map(contact => (
                <button
                  key={contact.id}
                  onClick={() => setActiveChat(contact.id)}
                  className={`w-full p-4 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                    activeChat === contact.id ? 'bg-blue-50 dark:bg-blue-900/30' : ''
                  }`}
                >
                  {contact.id === 'chatbot' ? (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl">
                      {contact.avatar}
                    </div>
                  ) : (
                    <img
                      src={contact.avatar}
                      alt={contact.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-gray-900 dark:text-white truncate">
                        {contact.name}
                      </p>
                      {contact.unread > 0 && (
                        <span className="bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                          {contact.unread}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${
                        contact.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                      }`}></span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {contact.status}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {activeChat === 'chatbot' ? (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xl">
                    🤖
                  </div>
                ) : (
                  <img
                    src={contacts.find(c => c.id === activeChat)?.avatar}
                    alt="Contact"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                )}
                <div>
                  <h2 className="font-medium text-gray-900 dark:text-white">
                    {contacts.find(c => c.id === activeChat)?.name}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {contacts.find(c => c.id === activeChat)?.status}
                  </p>
                </div>
              </div>
              <button className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <Edit className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chats[activeChat].map((chat) => (
                <div
                  key={chat.id}
                  className={`flex items-end gap-3 ${
                    chat.sender === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  {chat.sender === 'bot' ? (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white">
                      <Bot className="w-5 h-5" />
                    </div>
                  ) : chat.sender === 'user' ? (
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    </div>
                  ) : (
                    <img
                      src={contacts.find(c => c.id === chat.sender)?.avatar}
                      alt="Avatar"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  )}
                  <div
                    className={`max-w-[70%] p-4 rounded-2xl ${
                      chat.sender === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    }`}
                  >
                    <p className="whitespace-pre-line">{chat.message}</p>
                    <span className={`text-xs mt-1 block ${
                      chat.sender === 'user'
                        ? 'text-blue-100'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {chat.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  className="p-2 text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  <Smile className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  className="p-2 text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  <ImageIcon className="w-6 h-6" />
                </button>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 py-2 px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="p-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                >
                  <Send className="w-6 h-6" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}