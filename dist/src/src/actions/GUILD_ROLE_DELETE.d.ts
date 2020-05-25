import { Action } from '../lib/pieces/Action';
import type { GuildRoleDeleteDispatch } from '@klasa/ws';
import type { Role } from '../lib/caching/structures/guilds/Role';
export default class CoreAction extends Action {
    check(data: GuildRoleDeleteDispatch): Role | null;
    build(): null;
    cache(data: Role): void;
}
