import { Action, GuildBasedChannel, DMChannel } from '@klasa/core';
import type { ChannelCreateDispatch } from '@klasa/ws';
export default class CoreAction extends Action {
    check(): null;
    build(data: ChannelCreateDispatch): GuildBasedChannel | DMChannel | null;
    cache(data: GuildBasedChannel | DMChannel): void;
}
