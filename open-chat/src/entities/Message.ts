import { dateFormat } from '../utils/dateUtils';

export class MessageInfo {
  channelKey?: string;

  user: MessageUser;

  messageType: string;

  messageId?: string;

  message: string;

  customType?: string;

  receiver?: string;

  toUsers: any[];

  data?: any;

  totalUserCount?: number;

  participantCount?: number;

  createdAt: number;

  messageTime: string;

  constructor(json: Message) {
    this.channelKey = json.channelKey;
    this.user = json.user;
    this.messageType = json.messageType;
    this.messageId = json.messageId;
    this.message = json.message;
    this.customType = json.customType;
    this.data = json.data;
    this.toUsers = json.toUsers;
    this.receiver = json.receiver;
    this.totalUserCount = json.totalUserCount;
    this.participantCount = json.participantCount;
    this.createdAt = json.createdAt;
    this.messageTime = dateFormat(json.createdAt, 'a h:mm');
  }
}

export type MessageType = 'JOIN';

export interface Message {
  attachments: any[];
  channelKey: string;
  createdAt: number;
  message: string;
  messageId: string;
  messageId2: number;
  messageType: MessageType;
  participantCount: number;
  toUsers: any[];
  totalUserCount: number;
  user: MessageUser;
  customType?: string;
  receiver?: string;
  data?: any;
}

export interface MessageUser {
  id: string;
  username: string;
  avatar?: string;
}

export type GetMessageOption = {
  custom_types?: string[];
  message_types?: string[];
  timestamp?: number | string;
  messageId?: number;
  prev_size?: number;
  next_size?: number;
  is_inclusive?: boolean;
};

export type MessageParamsType = { [key: string]: number | string | string[] };
