import { Action } from '../../lib/pieces/Action';
import type { MessageDeleteDispatch } from '@klasa/ws';
import type { Message } from '../../lib/caching/structures/Message';
export default class CoreAction extends Action {
    check(data: MessageDeleteDispatch): Message | null;
    build(): Message | null;
    cache(data: Message): void;
}
