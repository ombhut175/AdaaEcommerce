import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '../../store/features/themeSlice.js';
import { toggleChat } from '../../store/features/chatSlice.js';

const Header = styled.div`
  padding: 16px;
  background: ${({ theme }) => theme.primary};
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    opacity: 0.8;
  }
`;

const ChatHeader = () => {
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => state.theme);

  return (
    <Header>
      <Title>ADAA Assistant</Title>
      <ButtonGroup>
        <IconButton onClick={() => dispatch(toggleDarkMode())}>
          {darkMode ? '🌞' : '🌙'}
        </IconButton>
        <IconButton onClick={() => dispatch(toggleChat())}>✕</IconButton>
      </ButtonGroup>
    </Header>
  );
};

export default ChatHeader;