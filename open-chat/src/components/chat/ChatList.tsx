import { MessageInfo } from '../../entities/Message';
import { ChatItem } from './ChatItem';
import { nanoid } from 'nanoid';

interface Props {
  messages: MessageInfo[];
  username: string;
}

export function ChatList({ messages, username }: Props) {
  return (
    <>
      {messages.map((message) => (
        <ChatItem key={nanoid()} message={message} username={username} />
      ))}
    </>
  );
}
