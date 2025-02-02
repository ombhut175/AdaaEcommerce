import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { toggleChat } from '../../store/features/chatSlice.js';

const ToggleButton = styled(motion.button)`
  position: fixed;
  bottom: 30px;
  right: 100px;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 10px ${({ theme }) => theme.shadow};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  z-index: 999;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const ChatToggle = () => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.chat);

  if (isOpen) return null;

  return (
    <ToggleButton
      onClick={() => dispatch(toggleChat())}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      💬
    </ToggleButton>
  );
};

export default ChatToggle;