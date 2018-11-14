/**
 * Snowflakes
 */
export type snowflake = string;

// API Payloads (prefixed with API, suffix is Data for full payloads or Partial)

/**
 * https://discordapp.com/developers/docs/resources/channel#message-object-message-structure
 */
export interface APIMessageData {
	id: snowflake;
	channel_id: snowflake;
	guild_id?: snowflake;
	author: APIUserData;
	member?: APIGuildMemberPartial;
	content: string;
	timestamp: string;
	edited_timestamp?: string;
	tts: boolean;
	mention_everyone: boolean;
	mentions: (APIUserData | (APIUserData & APIGuildMemberPartial))[];
	mention_roles: snowflake[];
	attachments: APIMessageAttachmentData[];
	embeds: APIEmbedData[];
	reactions?: APIReactionData[];
	nonce?: snowflake;
	pinned: boolean;
	webhook_id?: snowflake;
	type: number; // todo: enum
	activity?: APIMessageActivityData;
	application?: APIMessageApplicationData;
}

/**
 * https://discordapp.com/developers/docs/resources/user#user-object
 */
export interface APIUserData {
	id: snowflake;
	username: string;
	discriminator: string;
	avatar?: string;
	bot?: boolean;
	mfa_enabled?: boolean;
	locale?: string;
}

/**
 * https://discordapp.com/developers/docs/resources/guild#member-object
 */
export interface APIGuildMemberData {
	user: APIUserData;
	nick?: string;
	roles: snowflake[];
	joined_at: string;
	deaf: boolean;
	mute: boolean;
}

/**
 * https://discordapp.com/developers/docs/resources/channel#attachment-object
 */
export interface APIMessageAttachmentData {
	id: snowflake;
	filename: string;
	size: number;
	url: string;
	proxy_url: string;
	height?: number;
	width?: number;
}

/**
 * https://discordapp.com/developers/docs/resources/channel#reaction-object
 */
export interface APIReactionData {
	count: number;
	me: boolean;
	emoji: APIEmojiPartial;
}

/**
 * https://discordapp.com/developers/docs/resources/channel#message-object-message-activity-structure
 */
export interface APIMessageActivityData {
	type: number; // todo: enum
	party_id?: string;
}

/**
 * https://discordapp.com/developers/docs/resources/channel#message-object-message-application-structure
 */
export interface APIMessageApplicationData {
	id: snowflake;
	cover_image: string;
	description: string;
	icon: string;
	name: string;
}

// Embeds

/**
 * https://discordapp.com/developers/docs/resources/channel#embed-object
 */
export interface APIEmbedData {
	title?: string;
	type?: 'rich';
	description?: string;
	url?: string;
	timestamp?: string;
	color?: number;
	footer?: APIEmbedFooterData;
	image?: APIEmbedImageData;
	thumbnail?: APIEmbedThumbnailData;
	video?: APIEmbedVideoData;
	provider?: APIEmbedProviderData;
	author?: APIEmbedAuthorData;
	fields?: APIEmbedFieldData[];
}

/**
 * https://discordapp.com/developers/docs/resources/channel#embed-object-embed-footer-structure
 */
export interface APIEmbedFooterData {
	text: string;
	icon_url?: string;
	proxy_icon_url?: string;
}

/**
 * https://discordapp.com/developers/docs/resources/channel#embed-object-embed-image-structure
 */
export interface APIEmbedImageData {
	url?: string;
	proxy_url?: string;
	height?: number;
	width?: number;
}

/**
 * https://discordapp.com/developers/docs/resources/channel#embed-object-embed-thumbnail-structure
 */
export interface APIEmbedThumbnailData {
	url?: string;
	proxy_url?: string;
	height?: number;
	width?: number;
}

/**
 * https://discordapp.com/developers/docs/resources/channel#embed-object-embed-video-structure
 */
export interface APIEmbedVideoData {
	url?: string;
	height?: number;
	width?: number;
}

/**
 * https://discordapp.com/developers/docs/resources/channel#embed-object-embed-provider-structure
 */
export interface APIEmbedProviderData {
	name?: string;
	url?: string;
}

/**
 * https://discordapp.com/developers/docs/resources/channel#embed-object-embed-author-structure
 */
export interface APIEmbedAuthorData {
	name?: string;
	url?: string;
	icon_url?: string;
	proxy_icon_url?: string;
}

/**
 * https://discordapp.com/developers/docs/resources/channel#embed-object-embed-field-structure
 */
export interface APIEmbedFieldData {
	name: string;
	value: string;
	inline?: boolean;
}
