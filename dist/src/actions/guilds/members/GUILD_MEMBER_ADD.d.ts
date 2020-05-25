import { Action } from '../../../lib/pieces/Action';
import type { GuildMemberAddDispatch } from '@klasa/ws';
import type { GuildMember } from '../../../lib/caching/structures/guilds/GuildMember';
export default class CoreAction extends Action {
    check(): null;
    build(data: GuildMemberAddDispatch): GuildMember | null;
    cache(data: GuildMember): void;
}
