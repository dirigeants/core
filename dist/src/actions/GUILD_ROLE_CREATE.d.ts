import { Action, Role } from '@klasa/core';
import type { GuildRoleCreateDispatch } from '@klasa/ws';
export default class CoreAction extends Action {
    check(): null;
    build(data: GuildRoleCreateDispatch): Role | null;
    cache(data: Role): void;
}
