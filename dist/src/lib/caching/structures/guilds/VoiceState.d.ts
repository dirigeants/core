import { Structure } from '../base/Structure';
import type { APIVoiceStatePartial } from '@klasa/dapi-types';
import type { Client } from '../../../client/Client';
import type { Guild } from './Guild';
/**
 * @see https://discord.com/developers/docs/resources/voice#voice-state-object
 */
export declare class VoiceState extends Structure {
    /**
     * The user id this voice state is for.
     * @since 0.0.1
     */
    readonly id: string;
    /**
     * The channel id this user is connected to.
     * @since 0.0.1
     */
    channelID: string | null;
    /**
     * The voice state's session id.
     * @since 0.0.1
     */
    sessionID: string;
    /**
     * Whether or not this user is deafened by the server.
     * @since 0.0.1
     */
    deaf: boolean;
    /**
     * Whether or not this user is muted by the server.
     * @since 0.0.1
     */
    mute: boolean;
    /**
     * Whether or not this user is locally deafened.
     * @since 0.0.1
     */
    selfDeaf: boolean;
    /**
     * Whether or not this user is locally muted.
     * @since 0.0.1
     */
    selfMute: boolean;
    /**
     * Whether or not this user is streaming using "Go Live".
     * @since 0.0.1
     */
    selfStream: boolean | null;
    /**
     * Whether or not this user is muted by the current user.
     * @since 0.0.1
     */
    suppress: boolean;
    readonly guild: Guild;
    constructor(client: Client, data: APIVoiceStatePartial, guild: Guild);
    protected _patch(data: APIVoiceStatePartial): this;
}
