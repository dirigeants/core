import { Action } from '../../../lib/pieces/Action';
import type { GuildMemberRemoveDispatch } from '@klasa/ws';
import type { GuildMember } from '../../../lib/caching/structures/guilds/GuildMember';
export default class CoreAction extends Action {
    check(data: GuildMemberRemoveDispatch): GuildMember | null;
    build(): GuildMember | null;
    cache(data: GuildMember): void;
}
