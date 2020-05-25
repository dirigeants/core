import type { DMChannel } from './channels/DMChannel';
import type { Client } from '../../client/Client';
import type { GuildTextChannel } from './channels/GuildTextChannel';
/**
 * Handles typing indication sending in text channels
 */
export declare class Typing {
    #private;
    /**
     * The client this typing manager is for.
     * @since 0.0.1
     */
    readonly client: Client;
    /**
     * The channel this typing manager is for.
     */
    readonly channel: GuildTextChannel | DMChannel;
    constructor(channel: GuildTextChannel | DMChannel);
    /**
     * Ups the internal typing counter and starts typing if not already.
     * @param count How much to increase the internal counter. (Typically leave this at the default 1)
     * @since 0.0.1
     */
    start(count?: number): void;
    /**
     * Lowers the internal typing counter and stops typing if the counter reaches 0 (or less).
     * @param count How much to decrease the internal counter. (Typically leave this at the default 1)
     * @since 0.0.1
     */
    stop(count?: number): void;
    /**
     * An alias for Typing#stop(Infinity). Forces the counter back to 0, and stops typing.
     * @since 0.0.1
     */
    forceStop(): void;
    /**
     * Internal method to start the typing interval if not already started.
     * @since 0.0.1
     */
    protected _startTyping(): void;
    /**
     * Internal method to send a typing indicator.
     * @since 0.0.1
     */
    protected _type(): Promise<void>;
    /**
     * Internal method to stop the typing interval if not already stopped.
     * @since 0.0.1
     */
    protected _stopTyping(): void;
}
