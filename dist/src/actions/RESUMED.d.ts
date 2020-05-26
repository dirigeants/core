import { Action } from '@klasa/core';
import type { ResumedDispatch } from '@klasa/ws';
export default class CoreAction extends Action {
    /**
     * Processes the event data from the websocket.
     * @since 0.0.1
     * @param data The raw data from {@link Client#ws}
     */
    run(data: ResumedDispatch): void;
    check(): null;
    build(): null;
    cache(): void;
}
