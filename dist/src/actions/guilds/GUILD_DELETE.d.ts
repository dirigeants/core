import { Action, Guild } from '@klasa/core';
import type { GuildDeleteDispatch } from '@klasa/ws';
export default class CoreAction extends Action {
    check(data: GuildDeleteDispatch): Guild | null;
    build(): null;
    cache(data: Guild): void;
}
