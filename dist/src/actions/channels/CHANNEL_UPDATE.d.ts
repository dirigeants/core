import { Action } from '../../lib/pieces/Action';
import { Channel } from '../../lib/caching/structures/channels/Channel';
import type { ChannelCreateDispatch } from '@klasa/ws';
export default class CoreAction extends Action {
    check(data: ChannelCreateDispatch): Channel | null;
    build(data: ChannelCreateDispatch): Channel | null;
    cache(data: Channel): void;
}
