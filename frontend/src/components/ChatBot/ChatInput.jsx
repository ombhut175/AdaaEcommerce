import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import useSound from 'use-sound';
import { addMessage, setTyping } from '../../store/features/chatSlice.js';

const InputContainer = styled.form`
  padding: 16px;
  border-top: 1px solid ${({ theme }) => theme.border};
  display: flex;
  gap: 8px;
`;

const Input = styled.input`
  flex: 1;
  padding: 8px 12px;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
`;

const SendButton = styled(motion.button)`
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  cursor: pointer;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ChatInput = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState('');
  const [playSound] = useSound('/message-sent.mp3', { volume: 0.5 });

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    dispatch(addMessage({
      id: Date.now(),
      text: input.trim(),
      isUser: true,
      timestamp: new Date().toISOString(),
    }));

    playSound();
    setInput('');

    // Simulate bot typing
    dispatch(setTyping(true));
    
    // Simulate bot response
    setTimeout(() => {
      dispatch(setTyping(false));
      dispatch(addMessage({
        id: Date.now(),
        text: getBotResponse(input.trim()),
        isUser: false,
        timestamp: new Date().toISOString(),
      }));
    }, 1500);
  }, [dispatch, input, playSound]);

  return (
    <InputContainer onSubmit={handleSubmit}>
      <Input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
      />
      <SendButton
        type="submit"
        disabled={!input.trim()}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Send
      </SendButton>
    </InputContainer>
  );
};

// Simple bot response logic
const getBotResponse = (message) => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('track') && lowerMessage.includes('order')) {
    return "To track your order, please provide your order number and I'll help you check its status.";
  }
  
  if (lowerMessage.includes('product') || lowerMessage.includes('items')) {
    return "We have a great selection of products! Are you looking for something specific? I can help you find the perfect item.";
  }
  
  if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
    return "Our prices are very competitive. Which product would you like to know the price of?";
  }
  
  if (lowerMessage.includes('shipping') || lowerMessage.includes('delivery')) {
    return "We offer free shipping on orders over $75! Standard delivery takes 3-5 business days.";
  }
  
  if (lowerMessage.includes('return') || lowerMessage.includes('refund')) {
    return "Our return policy allows returns within 30 days of purchase. Would you like more details about our return process?";
  }
  
  return "I'm here to help! Feel free to ask about our products, shipping, returns, or anything else.";
};

export default ChatInput;