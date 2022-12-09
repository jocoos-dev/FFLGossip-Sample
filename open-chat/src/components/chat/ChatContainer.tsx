import { Stack } from '@mui/material';
import { useAtomValue } from 'jotai';

import { gossipClientAtom } from '../../store';
import { contentAtom, CONTENT_TYPE, messageAtom, participantAtom } from '../../store/atoms/chat';
import { ChatForm } from './ChatForm';
import { ChatList } from './ChatList';
import { ParticipantList } from './ParticipantList';

export function ChatContainer() {
  const client = useAtomValue(gossipClientAtom);
  const messages = useAtomValue(messageAtom);

  const content = useAtomValue(contentAtom);

  return (
    <ChatForm>
      <Stack direction="column-reverse" sx={{ overflow: 'auto' }}>
        {client?.ws?.connected && <ChatList messages={messages} username={client.member.username} />}
      </Stack>
      {content === CONTENT_TYPE.PARTICIPANTS && (
        <Stack
          sx={{
            flex: 1,
            overflow: 'auto',
            position: 'absolute',
            height: '100%',
            width: '100%',
            top: 0,
            left: 0,
            background: 'white',
          }}
        >
          <ParticipantList />
        </Stack>
      )}
    </ChatForm>
  );
}
