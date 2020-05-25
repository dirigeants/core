import { Action } from '../lib/pieces/Action';
import type { GuildRoleCreateDispatch } from '@klasa/ws';
import type { Role } from '../lib/caching/structures/guilds/Role';
export default class CoreAction extends Action {
    check(): null;
    build(data: GuildRoleCreateDispatch): Role | null;
    cache(data: Role): void;
}
