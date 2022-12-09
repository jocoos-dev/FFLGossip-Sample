import { ReactNode } from 'react';

import { Avatar, Chip, Stack, Typography } from '@mui/material';
import { MessageInfo } from '../../entities/Message';

function MessaegProvider(message: MessageInfo, username: string) {
  const { messageType } = message;

  switch (messageType) {
    case 'MESSAGE':
      return <NormalMessage message={message} />;
    case 'DM':
      return <DirectMessage message={message} username={username} />;
    default:
      return <NormalMessage message={message} />;
  }
}

interface NormalMessageProps {
  message: MessageInfo;
}

function NormalMessage({ message }: NormalMessageProps) {
  return (
    <Message message={message}>
      <Typography variant="body2" sx={{ opacity: 0.74, mr: '8px' }}>
        {message.message}
      </Typography>
    </Message>
  );
}

interface DirectMessageProps {
  message: MessageInfo;
  username: string;
}

function DirectMessage({ message, username }: DirectMessageProps) {
  return (
    <Message message={message}>
      <Stack direction="row" alignItems="center">
        <Chip
          label={`@${username}`}
          color="primary"
          sx={{ fontSize: '10px', fontWeight: 'bold', height: '15px', p: 0, mr: '4px', span: { p: '0 4px' } }}
        />
        <Typography variant="body2" sx={{ fontSize: '14px', opacity: 0.74, mr: '8px' }}>
          {message.message}
        </Typography>
      </Stack>
    </Message>
  );
}

interface MessageProps {
  children: ReactNode;
  message: MessageInfo;
}

function Message({ children, message }: MessageProps) {
  return (
    <Stack direction="row" alignItems="center" className="msg normal-message" sx={{ p: '4px 24px', height: '32px' }}>
      <Avatar
        src={message.user?.avatar || ''}
        alt={message.user?.username}
        sx={{ width: 24, height: 24, mr: '16px' }}
      />

      <Stack>
        <Stack direction="row">
          <Typography sx={{ color: 'green', fontSize: '12px', fontWeight: 'bold' }}>
            {message.user?.username}
          </Typography>
          <Typography sx={{ fontSize: '12px', fontWeight: 'bold', opacity: 0.54, ml: '4px' }}>
            {message.messageTime}
          </Typography>
        </Stack>
        {children}
      </Stack>
    </Stack>
  );
}

interface Props {
  message: MessageInfo;
  username: string;
}

export function ChatItem({ message, username }: Props) {
  return MessaegProvider(message, username);
}
