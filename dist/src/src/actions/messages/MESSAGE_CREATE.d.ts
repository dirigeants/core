import { Action } from '../../lib/pieces/Action';
import type { MessageCreateDispatch } from '@klasa/ws';
import type { Message } from '../../lib/caching/structures/Message';
export default class CoreAction extends Action {
    check(): null;
    build(data: MessageCreateDispatch): Message | null;
    cache(data: Message): void;
}
