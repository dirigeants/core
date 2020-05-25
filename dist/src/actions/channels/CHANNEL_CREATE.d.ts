import { Action } from '../../lib/pieces/Action';
import { GuildBasedChannel } from '../../lib/util/Util';
import type { ChannelCreateDispatch } from '@klasa/ws';
import type { DMChannel } from '../../lib/caching/structures/channels/DMChannel';
export default class CoreAction extends Action {
    check(): null;
    build(data: ChannelCreateDispatch): GuildBasedChannel | DMChannel | null;
    cache(data: GuildBasedChannel | DMChannel): void;
}
