import { Action } from '../../lib/pieces/Action';
import type { ChannelPinsUpdateDispatch } from '@klasa/ws';
export default class CoreAction extends Action {
    /**
     * Processes the event data from the websocket.
     * @since 0.0.1
     * @param data The raw data from {@link Client#ws}
     */
    run(data: ChannelPinsUpdateDispatch): void;
    check(): null;
    build(): null;
    cache(): void;
    private parseDate;
}
