/// <reference types="node" />
import { Piece, PieceOptions } from './base/Piece';
import type { EventEmitter } from 'events';
import type { EventStore } from './EventStore';
import type { Client } from '../client/Client';
/**
 * The common class for all events.
 */
export declare abstract class Event extends Piece {
    #private;
    /**
     * If this event should only be run once and then unloaded
     * @since 0.0.1
     */
    readonly once: boolean;
    /**
     * The emitter this event is for
     * @since 0.0.1
     */
    readonly emitter: EventEmitter;
    /**
     * The event to listen for
     * @since 0.0.1
     */
    readonly event: string;
    /**
     * @since 0.0.1
     * @param store The store this piece is for
     * @param directory The base directory to the pieces folder
     * @param file The path from the pieces folder to the piece file
     * @param options The options for this piece
     */
    constructor(store: EventStore, directory: string, file: readonly string[], options?: EventOptions);
    abstract run(...args: readonly unknown[]): unknown;
    /**
     * Disables this Event
     * @since 0.0.1
     * @chainable
     */
    disable(): this;
    /**
     * Enables this Event
     * @since 0.0.1
     * @chainable
     */
    enable(): this;
    /**
     * A wrapper for the run method, to easily disable/enable events
     * @since 0.0.1
     * @param param The event parameters emitted
     */
    private _run;
    /**
     * A wrapper for the _run method for once handling
     * @since 0.0.1
     * @param param The event parameters emitted
     */
    private _runOnce;
    /**
     * Attaches the proper listener to the emitter
     * @since 0.0.1
     */
    private _listen;
    /**
     * Removes the listener from the emitter
     * @since 0.0.1
     */
    private _unlisten;
    /**
     * Defines the JSON.stringify behavior of this event.
     */
    toJSON(): object;
}
export interface Event {
    store: EventStore;
}
/**
 * The piece options for all {@link Event} instances.
 */
export interface EventOptions extends PieceOptions {
    /**
     * Whether or not this event should only be run once and then unloaded
     */
    once?: boolean;
    /**
     * The emitter this event should be for (string indicates a client property).
     */
    emitter?: EventEmitter | keyof Client;
    /**
     * The event that should be listened to.
     */
    event?: string;
}
