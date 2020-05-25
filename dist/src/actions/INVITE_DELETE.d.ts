import { Action, Invite } from '@klasa/core';
import type { InviteDeleteDispatch } from '@klasa/ws';
export default class CoreAction extends Action {
    check(): null;
    build(data: InviteDeleteDispatch): Invite | null;
    cache(data: Invite): void;
}
