import { FflGossip } from 'ffl-gossip/dist/gossip/gossip';
import { atom } from 'jotai';
import { MessageInfo, MessageUser } from '../../entities/Message';

export const gossipClientAtom = atom<FflGossip | null>(null);

export const participantAtom = atom<MessageUser[]>([]);

export const messageAtom = atom<MessageInfo[]>([]);

export const CONTENT_TYPE = {
  MESSAGES: 0,
  PARTICIPANTS: 1,
};

export const contentAtom = atom<number>(CONTENT_TYPE.MESSAGES);
