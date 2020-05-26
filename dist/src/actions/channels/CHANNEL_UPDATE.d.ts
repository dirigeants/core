import { Action, Channel } from '@klasa/core';
import type { ChannelCreateDispatch } from '@klasa/ws';
export default class CoreAction extends Action {
    check(data: ChannelCreateDispatch): Channel | null;
    build(data: ChannelCreateDispatch): Channel | null;
    cache(data: Channel): void;
}
