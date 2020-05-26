import { Action, Role } from '@klasa/core';
import type { GuildRoleCreateDispatch } from '@klasa/ws';
export default class CoreAction extends Action {
    check(data: GuildRoleCreateDispatch): Role | null;
    build(data: GuildRoleCreateDispatch): Role | null;
    cache(data: Role): void;
}
