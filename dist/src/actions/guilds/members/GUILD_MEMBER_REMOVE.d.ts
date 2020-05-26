import { Action, GuildMember } from '@klasa/core';
import type { GuildMemberRemoveDispatch } from '@klasa/ws';
export default class CoreAction extends Action {
    check(data: GuildMemberRemoveDispatch): GuildMember | null;
    build(): GuildMember | null;
    cache(data: GuildMember): void;
}
