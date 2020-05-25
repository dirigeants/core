import { Action } from '../lib/pieces/Action';
import type { UserUpdateDispatch } from '@klasa/ws';
import type { User } from '../lib/caching/structures/User';
export default class CoreAction extends Action {
    check(data: UserUpdateDispatch): User | null;
    build(data: UserUpdateDispatch): User;
    cache(data: User): void;
}
