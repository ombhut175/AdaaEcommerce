import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const MessageGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: ${({ $isUser }) => ($isUser ? 'flex-end' : 'flex-start')};
`;

const Message = styled(motion.div)`
  max-width: 80%;
  padding: 8px 12px;
  border-radius: 12px;
  background: ${({ $isUser, theme }) =>
    $isUser ? theme.primary : theme.surface};
  color: ${({ $isUser, theme }) =>
    $isUser ? 'white' : theme.text};
  box-shadow: 0 2px 4px ${({ theme }) => theme.shadow};
`;

const Timestamp = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
`;

const TypingIndicator = styled(motion.div)`
  display: flex;
  gap: 4px;
  padding: 8px 12px;
  background: ${({ theme }) => theme.surface};
  border-radius: 12px;
  width: fit-content;
`;

const Dot = styled(motion.span)`
  width: 6px;
  height: 6px;
  background: ${({ theme }) => theme.primary};
  border-radius: 50%;
`;

const ChatMessages = () => {
  const { messages, isTyping } = useSelector((state) => state.chat);
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <MessagesContainer ref={containerRef}>
      {messages.map((message) => (
        <MessageGroup key={message.id} $isUser={message.isUser}>
          <Message
            $isUser={message.isUser}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {message.text}
          </Message>
          <Timestamp>
            {format(new Date(message.timestamp), 'HH:mm')}
          </Timestamp>
        </MessageGroup>
      ))}
      {isTyping && (
        <TypingIndicator
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Dot animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6 }} />
          <Dot animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
          <Dot animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} />
        </TypingIndicator>
      )}
    </MessagesContainer>
  );
};

export default ChatMessages;