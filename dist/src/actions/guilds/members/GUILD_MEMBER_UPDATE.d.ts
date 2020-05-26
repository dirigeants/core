import { Action, GuildMember } from '@klasa/core';
import type { GuildMemberUpdateDispatch } from '@klasa/ws';
export default class CoreAction extends Action {
    check(data: GuildMemberUpdateDispatch): GuildMember | null;
    build(data: GuildMemberUpdateDispatch): GuildMember | null;
    cache(): void;
}
