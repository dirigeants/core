import { Action, Message } from '@klasa/core';
import type { MessageDeleteDispatch } from '@klasa/ws';
export default class CoreAction extends Action {
    check(data: MessageDeleteDispatch): Message | null;
    build(): Message | null;
    cache(data: Message): void;
}
