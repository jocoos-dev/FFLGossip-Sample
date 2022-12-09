import { Telegram } from '@mui/icons-material';
import { Avatar, Stack, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { MessageUser } from '../../entities/Message';
import { MoreMenu } from '../share/button/MoreButton';

interface Props {
  participant: MessageUser;
}

export function ParticipantItem({ participant }: Props) {
  const { setValue } = useFormContext();

  const menuItems = [
    {
      name: 'DM',
      icon: Telegram,
      onClick: () => {
        setValue('message', `@${participant.username} `);
      },
    },
  ];

  return (
    <Stack
      key={participant.id}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      className="msg normal-message"
      sx={{ p: '4px 24px' }}
    >
      <Stack direction="row" alignItems="center">
        <Avatar
          src={participant.username || 'No Name'}
          alt={participant.username || 'No Name'}
          sx={{ width: 24, height: 24, mr: '16px' }}
        />
        <Typography variant="body1" sx={{ fontSize: '14px', fontWeight: 'bold' }}>
          {participant.username}
        </Typography>
      </Stack>

      <MoreMenu items={menuItems} />
    </Stack>
  );
}
