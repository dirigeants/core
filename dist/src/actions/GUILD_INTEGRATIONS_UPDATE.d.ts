import { Action, Guild } from '@klasa/core';
import type { GuildIntegrationsUpdateDispatch } from '@klasa/ws';
export default class CoreAction extends Action {
    check(data: GuildIntegrationsUpdateDispatch): Guild | null;
    build(): null;
    cache(): void;
}
