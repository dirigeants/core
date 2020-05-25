import { Action } from '../../lib/pieces/Action';
import type { GuildCreateDispatch } from '@klasa/ws';
import type { Guild } from '../../lib/caching/structures/guilds/Guild';
export default class CoreAction extends Action {
    check(data: GuildCreateDispatch): Guild | null;
    build(data: GuildCreateDispatch): Guild;
    cache(data: Guild): void;
}
