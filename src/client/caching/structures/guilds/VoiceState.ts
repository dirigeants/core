import { Structure } from '../base/Structure';

import type { APIVoiceStatePartial } from '@klasa/dapi-types';
import type { Client } from '../../../Client';

/**
 * @see https://discord.com/developers/docs/resources/voice#voice-state-object
 */
export class VoiceState extends Structure {

	/**
	 * The user id this voice state is for.
	 * @since 0.0.1
	 */
	public readonly id: string;

	/**
	 * The channel id this user is connected to.
	 * @since 0.0.1
	 */
	public channelID!: string | null;

	/**
	 * The voice state's session id.
	 * @since 0.0.1
	 */
	public sessionID!: string;

	/**
	 * Whether or not this user is deafened by the server.
	 * @since 0.0.1
	 */
	public deaf!: boolean;

	/**
	 * Whether or not this user is muted by the server.
	 * @since 0.0.1
	 */
	public mute!: boolean;

	/**
	 * Whether or not this user is locally deafened.
	 * @since 0.0.1
	 */
	public selfDeaf!: boolean;

	/**
	 * Whether or not this user is locally muted.
	 * @since 0.0.1
	 */
	public selfMute!: boolean;

	/**
	 * Whether or not this user is streaming using "Go Live".
	 * @since 0.0.1
	 */
	public selfStream!: boolean | null;

	/**
	 * Whether or not this user is muted by the current user.
	 * @since 0.0.1
	 */
	public suppress!: boolean;

	public constructor(client: Client, data: APIVoiceStatePartial) {
		super(client);
		this.id = data.user_id;
		this._patch(data);
	}

	protected _patch(data: APIVoiceStatePartial): this {
		this.channelID = data.channel_id;
		this.sessionID = data.session_id;
		this.deaf = data.deaf;
		this.mute = data.mute;
		this.selfDeaf = data.self_deaf;
		this.selfMute = data.self_mute;
		this.selfStream = data.self_stream ?? null;
		this.suppress = data.suppress;
		return this;
	}

}
