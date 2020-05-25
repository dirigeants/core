import { Action } from '../lib/pieces/Action';
import type { InviteCreateDispatch } from '@klasa/ws';
import type { Invite } from '../lib/caching/structures/Invite';
export default class CoreAction extends Action {
    check(): null;
    build(data: InviteCreateDispatch): Invite;
    cache(data: Invite): void;
}
