import { Action } from '../lib/pieces/Action';
import type { InviteDeleteDispatch } from '@klasa/ws';
import type { Invite } from '../lib/caching/structures/Invite';
export default class CoreAction extends Action {
    check(): null;
    build(data: InviteDeleteDispatch): Invite | null;
    cache(data: Invite): void;
}
