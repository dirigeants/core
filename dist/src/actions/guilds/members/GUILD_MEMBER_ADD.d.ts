import { Action, GuildMember } from '@klasa/core';
import type { GuildMemberAddDispatch } from '@klasa/ws';
export default class CoreAction extends Action {
    check(): null;
    build(data: GuildMemberAddDispatch): GuildMember | null;
    cache(data: GuildMember): void;
}
