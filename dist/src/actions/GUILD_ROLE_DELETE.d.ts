import { Action, Role } from '@klasa/core';
import type { GuildRoleDeleteDispatch } from '@klasa/ws';
export default class CoreAction extends Action {
    check(data: GuildRoleDeleteDispatch): Role | null;
    build(): null;
    cache(data: Role): void;
}
