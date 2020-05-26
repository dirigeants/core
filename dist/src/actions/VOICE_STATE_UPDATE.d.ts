import { Action, VoiceState } from '@klasa/core';
import type { VoiceStateUpdateDispatch } from '@klasa/ws';
export default class CoreAction extends Action {
    check(data: VoiceStateUpdateDispatch): VoiceState | null;
    build(data: VoiceStateUpdateDispatch): VoiceState | null;
    cache(data: VoiceState): void;
}
