import { Action, TextChannel, NewsChannel } from '@klasa/core';
import type { WebhooksUpdateDispatch } from '@klasa/ws';
export default class CoreAction extends Action {
    check(data: WebhooksUpdateDispatch): TextChannel | NewsChannel | null;
    build(): null;
    cache(): void;
}
