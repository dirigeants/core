import { Action } from '../../lib/pieces/Action';
import type { GuildDeleteDispatch } from '@klasa/ws';
import type { Guild } from '../../lib/caching/structures/guilds/Guild';
export default class CoreAction extends Action {
    check(data: GuildDeleteDispatch): Guild | null;
    build(): null;
    cache(data: Guild): void;
}
