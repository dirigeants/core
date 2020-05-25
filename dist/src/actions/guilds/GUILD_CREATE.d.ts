import { Action, Guild } from '@klasa/core';
import type { GuildCreateDispatch } from '@klasa/ws';
export default class CoreAction extends Action {
    check(): null;
    build(data: GuildCreateDispatch): Guild;
    cache(data: Guild): void;
}
