import { Action } from '../lib/pieces/Action';
import type { GuildIntegrationsUpdateDispatch } from '@klasa/ws';
import type { Guild } from '../lib/caching/structures/guilds/Guild';
export default class CoreAction extends Action {
    check(data: GuildIntegrationsUpdateDispatch): Guild | null;
    build(): null;
    cache(): void;
}
