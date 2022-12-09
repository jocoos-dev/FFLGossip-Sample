import { useCallback, useEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { Box, Stack, Typography } from '@mui/material';
import { Modal } from '../components/share/modal/Modal';
import { AuthForm } from '../components/auth/AuthForm';
import { gossipClientAtom } from '../store';
import { VideoRoomContainer } from '../components/video/VideoRoomContainer';
import { ChatContainer } from '../components/chat/ChatContainer';

export function OpenChat() {
  const [open, setOpen] = useState(true);
  const client = useAtomValue(gossipClientAtom);

  const handleClose = useCallback(() => {
    if (client) {
      setOpen(false);
    }
  }, [setOpen, client]);

  useEffect(() => {
    if (client) {
      setOpen(false);
    }
  }, [setOpen, client]);

  useEffect(() => {
    return () => {
      if (client) {
        client.disconnect();
      }
    };
  }, []);

  return (
    <Stack width="100%" sx={{ maxHeight: '944px' }}>
      <Typography align="center" fontWeight="bold" variant="h2" sx={{ mb: '24px' }}>
        Live stream chat
      </Typography>
      <Typography variant="body2" sx={{ mb: '48px' }}>
        With live stream chat, create a digital venue for your audience and let fans connect and celebrate in real-time.
        Engage buyers in live commerce streams to drive more sales.
      </Typography>

      <Box sx={{ display: 'flex', borderRadius: '4px', overflow: 'hidden', maxHeight: '424px' }}>
        <VideoRoomContainer />
        <ChatContainer />
      </Box>

      <Modal open={open} handleClose={handleClose}>
        <AuthForm />
      </Modal>
    </Stack>
  );
}
