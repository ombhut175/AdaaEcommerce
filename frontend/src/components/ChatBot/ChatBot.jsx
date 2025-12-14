import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { toggleChat } from '../../store/features/chatSlice.js';
import { lightTheme, darkTheme } from './theme.js';
import ChatHeader from './ChatHeader.jsx';
import ChatMessages from './ChatMessages.jsx';
import ChatInput from './ChatInput.jsx';
import Suggestions from './Suggestions.jsx';

const ChatContainer = styled(motion.div)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 350px;
  max-height: 600px;
  background: ${({ theme }) => theme.surface};
  border-radius: 12px;
  box-shadow: 0 4px 20px ${({ theme }) => theme.shadow};
  display: flex;
  flex-direction: column;
  z-index: 1000;
  overflow: hidden;
`;

const ChatBot = () => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.chat);
  const { darkMode } = useSelector((state) => state.theme);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        dispatch(toggleChat());
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, dispatch]);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <AnimatePresence>
        {isOpen && (
          <ChatContainer
            ref={containerRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <ChatHeader />
            <ChatMessages />
            <Suggestions />
            <ChatInput />
          </ChatContainer>
        )}
      </AnimatePresence>
    </ThemeProvider>
  );
};

export default ChatBot;