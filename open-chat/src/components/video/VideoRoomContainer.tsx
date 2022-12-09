import { Avatar, Box, Card, Chip, Stack, Typography } from '@mui/material';
import { useAtomValue } from 'jotai';
import { participantAtom } from '../../store/atoms/chat';

export function VideoRoomContainer() {
  const participants = useAtomValue(participantAtom);

  return (
    <Stack sx={{ background: '#f0f0f0' }}>
      <img src="https://static.jocoos.com/jocoos-home/images/BackgroundTwo.png" />
      <Box p={2}>
        <Card sx={{ p: 2, display: 'flex' }}>
          <Avatar sx={{ mr: 1 }} />
          <Stack>
            <Stack direction="row">
              <Stack direction="row" alignItems="center">
                <Chip
                  label="Live"
                  sx={{
                    borderRadius: '4px',
                    backgroundColor: 'red',
                    color: 'white',
                    height: '18px',
                    p: 0,
                    mr: 1,
                  }}
                />
                <Typography variant="body2">Jocoos Live Streaming</Typography>
              </Stack>
            </Stack>
            <Stack>
              <Typography variant="body2">{`${participants.length} watching now. Started streaming 1 hours ago`}</Typography>
            </Stack>
          </Stack>
        </Card>
      </Box>
    </Stack>
  );
}
