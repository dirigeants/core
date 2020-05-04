import { DataStore } from './base/DataStore';
import { Message } from '../structures/Message';

// TODO: Implement ChannelStore related functions
export class MessageStore extends DataStore<Message, typeof Message> {}
