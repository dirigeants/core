import { ActivityFlags, ActivityType, APIActivityData, APIActivityDataAssets, APIActivityDataEmoji, APIActivityDataParty, APIActivityDataSecrets, APIActivityDataTimestamp } from '@klasa/dapi-types';
import { ActivityResolvable } from '../../../util/bitfields/Activity';
/**
 * The presence game builder.
 * @since 0.0.1
 * @see https://discord.com/developers/docs/topics/gateway#activity-object-activity-structure
 */
export declare class PresenceGameBuilder implements APIActivityData {
    /**
     * The activity's name.
     * @since 0.0.1
     */
    name: string;
    /**
     * The activity's type.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/topics/gateway#activity-object-activity-types
     */
    type: number;
    /**
     * Stream url, is validated when type is 1.
     * @since 0.0.1
     */
    url?: string | null;
    /**
     * Unix timestamp of when the activity was added to the user's session.
     * @since 0.0.1
     */
    created_at: number;
    /**
     * Unix timestamps for start and/or end of the game.
     * @since 0.0.1
     */
    timestamps?: APIActivityDataTimestamp;
    /**
     * Application id for the game.
     * @since 0.0.1
     */
    application_id?: string;
    /**
     * What the player is currently doing.
     * @since 0.0.1
     */
    details?: string | null;
    /**
     * The user's current party status.
     * @since 0.0.1
     */
    state?: string | null;
    /**
     * The emoji used for a custom status.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/topics/gateway#activity-object-activity-emoji
     */
    emoji?: APIActivityDataEmoji | null;
    /**
     * Information for the current party of the player.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/topics/gateway#activity-object-activity-party
     */
    party?: APIActivityDataParty;
    /**
     * Images for the presence and their hover texts.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/topics/gateway#activity-object-activity-assets
     */
    assets?: APIActivityDataAssets;
    /**
     * Secrets for Rich Presence joining and spectating.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/topics/gateway#activity-object-activity-secrets
     */
    secrets?: APIActivityDataSecrets;
    /**
     * Whether or not the activity is an instanced game session.
     * @since 0.0.1
     */
    instance?: boolean;
    /**
     * Activity flags `OR`d together, describes what the payload includes.
     * @since 0.0.1
     */
    flags?: ActivityFlags;
    constructor(data?: Partial<APIActivityData>);
    /**
     * Modifies this presence game and returns it.
     * @since 0.0.1
     * @param name The activity's name.
     */
    setName(name: string): this;
    /**
     * Modifies this presence game and returns it.
     * @since 0.0.1
     * @param type The activity's type.
     * @see https://discord.com/developers/docs/topics/gateway#activity-object-activity-types
     */
    setType(type: ActivityType): this;
    /**
     * Modifies this presence game and returns it.
     * @since 0.0.1
     * @param url Stream url, is validated when type is 1.
     */
    setURL(url: string | null): this;
    /**
     * Modifies this presence game and returns it.
     * @since 0.0.1
     * @param createdAt Unix timestamp of when the activity was added to the user's session.
     */
    setCreatedAt(createdAt: number): this;
    /**
     * Modifies this presence game and returns it.
     * @since 0.0.1
     * @param timestamps Unix timestamps for start and/or end of the game.
     */
    setTimestamps(timestamps: APIActivityDataTimestamp): this;
    /**
     * Modifies this presence game and returns it.
     * @since 0.0.1
     * @param applicationID Application id for the game.
     */
    setApplicationID(applicationID: string): this;
    /**
     * Modifies this presence game and returns it.
     * @since 0.0.1
     * @param details What the player is currently doing.
     */
    setDetails(details: string | null): this;
    /**
     * Modifies this presence game and returns it.
     * @since 0.0.1
     * @param state The user's current party status.
     */
    setState(state: string | null): this;
    /**
     * Modifies this presence game and returns it.
     * @since 0.0.1
     * @param emoji The emoji used for a custom status.
     * @see https://discord.com/developers/docs/topics/gateway#activity-object-activity-emoji
     */
    setEmoji(emoji: APIActivityDataEmoji | null): this;
    /**
     * Modifies this presence game and returns it.
     * @since 0.0.1
     * @param party Information for the current party of the player.
     * @see https://discord.com/developers/docs/topics/gateway#activity-object-activity-party
     */
    setParty(party: APIActivityDataParty): this;
    /**
     * Modifies this presence game and returns it.
     * @since 0.0.1
     * @param assets Images for the presence and their hover texts.
     * @see https://discord.com/developers/docs/topics/gateway#activity-object-activity-assets
     */
    setAssets(assets: APIActivityDataAssets): this;
    /**
     * Modifies this presence game and returns it.
     * @since 0.0.1
     * @param secrets Secrets for Rich Presence joining and spectating.
     * @see https://discord.com/developers/docs/topics/gateway#activity-object-activity-secrets
     */
    setSecrets(secrets: APIActivityDataSecrets): this;
    /**
     * Modifies this presence game and returns it.
     * @since 0.0.1
     * @param instance Whether or not the activity is an instanced game session.
     */
    setInstance(instance: boolean): this;
    /**
     * Modifies this presence game and returns it.
     * @since 0.0.1
     * @param flags Activity flags, describes what the payload includes.
     */
    setFlags(flags: ActivityResolvable): this;
}
