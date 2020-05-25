import { Action } from '../lib/pieces/Action';
import type { WebhooksUpdateDispatch } from '@klasa/ws';
import type { TextChannel } from '../lib/caching/structures/channels/TextChannel';
import type { NewsChannel } from '../lib/caching/structures/channels/NewsChannel';
export default class CoreAction extends Action {
    check(data: WebhooksUpdateDispatch): TextChannel | NewsChannel | null;
    build(): null;
    cache(): void;
}
