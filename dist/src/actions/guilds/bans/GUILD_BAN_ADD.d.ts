import { Action } from '../../../lib/pieces/Action';
import type { GuildBanAddDispatch } from '@klasa/ws';
import type { Ban } from '../../../lib/caching/structures/guilds/Ban';
export default class CoreAction extends Action {
    check(): null;
    build(data: GuildBanAddDispatch): Ban | null;
    cache(data: Ban): void;
}
