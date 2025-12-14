import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { addMessage, setTyping } from '../../store/features/chatSlice.js';

const SuggestionsContainer = styled.div`
  padding: 8px 16px;
  display: flex;
  gap: 8px;
  overflow-x: auto;
  border-top: 1px solid ${({ theme }) => theme.border};
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

const SuggestionButton = styled(motion.button)`
  white-space: nowrap;
  padding: 6px 12px;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.primary};
  background: transparent;
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  font-size: 0.9rem;
  
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: white;
  }
`;

const Suggestions = () => {
  const dispatch = useDispatch();
  const { suggestions } = useSelector((state) => state.chat);

  const handleSuggestionClick = (suggestion) => {
    // Add user message
    dispatch(addMessage({
      id: Date.now(),
      text: suggestion,
      isUser: true,
      timestamp: new Date().toISOString(),
    }));

    // Simulate bot typing
    dispatch(setTyping(true));
    
    // Simulate bot response
    setTimeout(() => {
      dispatch(setTyping(false));
      dispatch(addMessage({
        id: Date.now(),
        text: getBotResponse(suggestion),
        isUser: false,
        timestamp: new Date().toISOString(),
      }));
    }, 1500);
  };

  return (
    <SuggestionsContainer>
      {suggestions.map((suggestion) => (
        <SuggestionButton
          key={suggestion}
          onClick={() => handleSuggestionClick(suggestion)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {suggestion}
        </SuggestionButton>
      ))}
    </SuggestionsContainer>
  );
};

// Reuse the same bot response logic
const getBotResponse = (message) => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('track') && lowerMessage.includes('order')) {
    return "To track your order, please provide your order number and I'll help you check its status.";
  }
  
  if (lowerMessage.includes('product') || lowerMessage.includes('items')) {
    return "We have a great selection of products! Are you looking for something specific? I can help you find the perfect item.";
  }
  
  if (lowerMessage.includes('cart')) {
    return "I can help you check your cart status. Would you like to view your cart or proceed to checkout?";
  }
  
  if (lowerMessage.includes('support') || lowerMessage.includes('help')) {
    return "I'm here to help! You can also reach our support team at support@fasco.com or call us at 1-800-FASCO.";
  }
  
  return "I'm here to help! Feel free to ask about our products, shipping, returns, or anything else.";
};

export default Suggestions;