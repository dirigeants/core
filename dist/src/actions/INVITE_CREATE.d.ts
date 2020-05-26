import { Action, Invite } from '@klasa/core';
import type { InviteCreateDispatch } from '@klasa/ws';
export default class CoreAction extends Action {
    check(): null;
    build(data: InviteCreateDispatch): Invite;
    cache(data: Invite): void;
}
