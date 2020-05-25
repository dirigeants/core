import { Action, Message } from '@klasa/core';
import type { MessageCreateDispatch } from '@klasa/ws';
export default class CoreAction extends Action {
    check(): null;
    build(data: MessageCreateDispatch): Message | null;
    cache(data: Message): void;
}
