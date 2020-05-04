import { DataStore } from './base/DataStore';
import { Message } from '../structures/Message';

// TODO: Implement MessageStore related functions like fetch
export class MessageStore extends DataStore<Message, typeof Message> {}
