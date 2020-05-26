import { Action, Ban } from '@klasa/core';
import type { GuildBanAddDispatch } from '@klasa/ws';
export default class CoreAction extends Action {
    check(): null;
    build(data: GuildBanAddDispatch): Ban | null;
    cache(data: Ban): void;
}
