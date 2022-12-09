import { ReactNode, useState } from 'react';

import { ArrowCircleLeft, ArrowCircleRight, Chat, PersonPin, SvgIconComponent } from '@mui/icons-material';
import { Button, IconButton, Stack } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { contentAtom, CONTENT_TYPE, gossipClientAtom, participantAtom } from '../../store/atoms/chat';
import { useAtom, useAtomValue } from 'jotai';

export interface ChatHeaderMenuItem {
  name: string;
  icon: SvgIconComponent;
  onClick: () => void;
}

interface Props {
  children: ReactNode;
}

export function ChatForm({ children }: Props) {
  const participants = useAtomValue(participantAtom);
  const [content, setContent] = useAtom(contentAtom);
  const client = useAtomValue(gossipClientAtom);

  const form = useForm({
    defaultValues: {
      message: '',
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = form;

  const onSubmit = handleSubmit((data, e) => {
    e?.preventDefault();

    // DM
    // ex) @ToUser Message
    if (data.message.startsWith('@')) {
      const toUsers = participants.filter((participant) => !data.message.startsWith(`${participant.username}`));

      if (toUsers.length > 0) {
        toUsers.forEach((toUser) => {
          // Remove @ToUser in text
          client?.sendDirectMessage(data.message.slice(`@${toUser.username}`.length), toUser.id);
        });
      }
      reset({ message: '' });
      return;
    }
    if (data.message) {
      client?.sendMessage(data.message);
      reset({ message: '' });
    }
  });

  return (
    <FormProvider {...form}>
      <Stack component="form" onSubmit={onSubmit} sx={{ maxWidth: '440px', width: '100%', height: 'inherit' }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ p: '5px', borderBottom: '2px solid #ddd', background: '#eee', color: '#666' }}
        >
          <Button variant="text" sx={{ p: '3px' }}>
            {content === CONTENT_TYPE.PARTICIPANTS ? 'Participants' : 'Live Chat'}
          </Button>
          <IconButton
            onClick={() => {
              setContent(content === CONTENT_TYPE.PARTICIPANTS ? CONTENT_TYPE.MESSAGES : CONTENT_TYPE.PARTICIPANTS);
            }}
          >
            {content === CONTENT_TYPE.PARTICIPANTS ? <Chat /> : <PersonPin />}
          </IconButton>
        </Stack>

        <Stack
          sx={{
            height: 'calc(100% - 110px)',
            flex: 1,
            position: 'relative',
          }}
        >
          {children}
        </Stack>

        <Stack
          direction="row"
          sx={{
            p: '10px',
            borderTop: '1px solid #fefefe',
            borderLeft: '1px solid #fefefe',
            background: '#eee',
            '*': {
              p: '10px',
              border: 'none',
              borderRadius: '3px',
              fontSize: '1em',
            },
          }}
        >
          <input
            width="100%"
            type="text"
            className="msger-input"
            placeholder="Enter your message..."
            {...register('message')}
          />
          <Button type="submit" variant="contained" sx={{ marginLeft: '10px' }} disabled={isSubmitting}>
            Send
          </Button>
        </Stack>
      </Stack>
    </FormProvider>
  );
}
