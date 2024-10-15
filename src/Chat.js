import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage, receiveMessage } from './features/chatSlice';

const Chat = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      dispatch(sendMessage(input));
      setInput('');
      // Simulate receiving a message
      setTimeout(() => {
        dispatch(receiveMessage('Hello from User2!'));
      }, 1000);
    }
  };

  useEffect(() => {
    const chatWindow = document.getElementById('chat-window');
    chatWindow.scrollTop = chatWindow.scrollHeight; // Auto-scroll to bottom
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div id="chat-window" className="flex-1 overflow-y-auto p-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`mb-2 ${msg.user === 'User1' ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block rounded-lg p-2 ${msg.user === 'User1' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}>
              <p>{msg.text}</p>
              <span className="text-xs text-gray-500">{msg.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex p-4">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-lg p-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSend} className="ml-2 bg-blue-500 text-white rounded-lg px-4">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
