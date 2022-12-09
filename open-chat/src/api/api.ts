import axios from 'axios';

const appServer = import.meta.env.VITE_JOCOOS_SERVER as string;

interface RequestGetChatToken {
  apiKey: string;
  apiSecret: string;
  appUserId: string;
}

const getChatToken = ({ apiKey, apiSecret, appUserId }: RequestGetChatToken) => {
  return axios.post(
    `${appServer}/v2/apps/me/members/${appUserId}/chat-tokens`,
    {},
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${btoa(`${apiKey}:${apiSecret}`)}`,
      },
    }
  );
};

export { getChatToken };
