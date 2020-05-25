import { Action } from '../../../lib/pieces/Action';
import type { GuildMemberUpdateDispatch } from '@klasa/ws';
import type { GuildMember } from '../../../lib/caching/structures/guilds/GuildMember';
export default class CoreAction extends Action {
    check(data: GuildMemberUpdateDispatch): GuildMember | null;
    build(data: GuildMemberUpdateDispatch): GuildMember | null;
    cache(): void;
}
