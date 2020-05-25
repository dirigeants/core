import { PresenceGameBuilder } from './PresenceGameBuilder';
import type { PresenceUpdateData } from '@klasa/ws';
import type { APIActivityData } from '@klasa/dapi-types';
export declare type PresenceStatus = PresenceUpdateData['status'];
/**
 * The presence builder.
 * @since 0.0.1
 * @see https://discord.com/developers/docs/topics/gateway#update-status-gateway-status-update-structure
 */
export declare class PresenceBuilder implements PresenceUpdateData {
    /**
     * Unix time (in milliseconds) of when the client went idle, or null if the client is not idle.
     * @since 0.0.1
     */
    since: number | null;
    /**
     * Null, or the user's new activity.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/topics/gateway#activity-object
     */
    game: APIActivityData | null;
    /**
     * The user's new status.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/topics/gateway#update-status-status-types
     */
    status: PresenceStatus;
    /**
     * Whether or not the client is afk.
     * @since 0.0.1
     */
    afk: boolean;
    constructor(data?: Partial<PresenceUpdateData>);
    /**
     * Modifies the presence and returns it.
     * @since 0.0.1
     * @param since Unix time (in milliseconds) of when the client went idle, or null if the client is not idle.
     */
    setSince(since?: Date | number | null): this;
    /**
     * Modifies the presence with raw data, and returns it.
     * @param game Null, or the user's new activity.
     * @see https://discord.com/developers/docs/topics/gateway#activity-object
     */
    setGame(game: PresenceGameBuilder | null): this;
    /**
     * Modifies the presence with a builder, and returns it.
     * @since 0.0.1
     * @param builder The builder to aid building the game.
     */
    setGame(builder: (game: APIActivityData) => PresenceGameBuilder): this;
    /**
     * Modifies the presence and returns it.
     * @since 0.0.1
     * @param status The user's new status.
     * @see https://discord.com/developers/docs/topics/gateway#update-status-status-types
     */
    setStatus(status: PresenceStatus): this;
    /**
     * Modifies the presence and returns it.
     * @since 0.0.1
     * @param afk Whether or not the client is afk.
     */
    setAfk(afk: boolean): this;
}
