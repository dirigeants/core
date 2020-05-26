import { Action, User } from '@klasa/core';
import type { UserUpdateDispatch } from '@klasa/ws';
export default class CoreAction extends Action {
    check(data: UserUpdateDispatch): User | null;
    build(data: UserUpdateDispatch): User;
    cache(data: User): void;
}
