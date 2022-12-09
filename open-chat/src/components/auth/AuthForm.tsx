import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Stack, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

import { getChatToken } from '../../api/api';
import { useSetAtom } from 'jotai';
import { gossipClientAtom } from '../../store';
import fflGossip from 'ffl-gossip';
import { useCallback } from 'react';
import { MessageInfo } from '../../entities/Message';
import { messageAtom, participantAtom } from '../../store/atoms/chat';

export const authSchema = yup
  .object({
    apiKey: yup.string().required(),
    apiSecret: yup.string().required(),
    appUserId: yup.string().required(),
    channelKey: yup.string().required(),
  })
  .required();

type FormData = {
  apiKey: string;
  apiSecret: string;
  appUserId: string;
  channelKey: string;
};

export function AuthForm() {
  const setGossip = useSetAtom(gossipClientAtom);
  const setMessages = useSetAtom(messageAtom);
  const setParticipants = useSetAtom(participantAtom);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(authSchema),
    defaultValues: {
      apiKey: '',
      apiSecret: '',
      appUserId: '',
      channelKey: '',
    },
  });

  const receiveCallback = useCallback(
    (message: MessageInfo) => {
      if (message.messageType !== 'JOIN') {
        setMessages((prev: MessageInfo[]) => [message, ...prev]);
      }
    },
    [setMessages]
  );

  const onSubmit = handleSubmit(async (data: FormData) => {
    const { apiKey, apiSecret, appUserId, channelKey } = data;

    const request = {
      apiKey,
      apiSecret,
      appUserId,
    };

    try {
      const result = await getChatToken(request);

      if (result.data.chatToken) {
        const client = fflGossip({
          token: result.data.chatToken,
          member: {
            appUserId: result.data.userId,
            username: result.data.userName,
            avatar: result.data.avatarProfileUrl,
          },
          isStreamer: true,
        });

        client.connect({
          channelKey,
          receiveCallback,
          onConnect: async () => {
            const result = await client.getParticipants();

            if (result.data) {
              setParticipants(result.data);
            }
          },
        });

        setGossip(client);
      }
    } catch (e) {
      console.error(e);
    }
  });

  return (
    <Stack component="form" onSubmit={onSubmit} sx={{ maxWidth: '440px', width: '100%' }} spacing="20px">
      <Controller
        name="apiKey"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            id="apiKey"
            type="text"
            autoComplete="apiKey"
            placeholder="apiKey"
            error={Boolean(errors.apiKey?.message)}
            helperText={errors.apiKey?.message}
          />
        )}
      />

      <Controller
        name="apiSecret"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            type="apiSecret"
            placeholder="apiSecret"
            error={Boolean(errors.apiSecret?.message)}
            helperText={errors.apiSecret?.message}
            autoComplete="off"
          />
        )}
      />

      <Controller
        name="appUserId"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            id="appUserId"
            type="text"
            autoComplete="appUserId"
            placeholder="appUserId"
            error={Boolean(errors.appUserId?.message)}
            helperText={errors.appUserId?.message}
          />
        )}
      />

      <Controller
        name="channelKey"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            type="channelKey"
            placeholder="channelKey"
            error={Boolean(errors.channelKey?.message)}
            helperText={errors.channelKey?.message}
            autoComplete="off"
          />
        )}
      />

      <Stack direction="row" spacing={2} justifyContent="center">
        <Button type="button" variant="contained">
          Cancle
        </Button>
        <Button type="submit" variant="contained" disabled={isSubmitting}>
          OK
        </Button>
      </Stack>
    </Stack>
  );
}
