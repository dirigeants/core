import { Action } from '../lib/pieces/Action';
import type { VoiceStateUpdateDispatch } from '@klasa/ws';
import type { VoiceState } from '../lib/caching/structures/guilds/VoiceState';
export default class CoreAction extends Action {
    check(data: VoiceStateUpdateDispatch): VoiceState | null;
    build(data: VoiceStateUpdateDispatch): VoiceState | null;
    cache(data: VoiceState): void;
}
