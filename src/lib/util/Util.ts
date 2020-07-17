import type { Channel } from '../caching/structures/channels/Channel';
import type { DMChannel } from '../caching/structures/channels/DMChannel';
import type { TextChannel } from '../caching/structures/channels/TextChannel';
import type { NewsChannel } from '../caching/structures/channels/NewsChannel';
import type { CategoryChannel } from '../caching/structures/channels/CategoryChannel';
import type { VoiceChannel } from '../caching/structures/channels/VoiceChannel';
import type { StoreChannel } from '../caching/structures/channels/StoreChannel';
import type { GuildEmoji } from '../caching/structures/guilds/GuildEmoji';
import type { MessageReactionEmoji } from '../caching/structures/messages/reactions/MessageReactionEmoji';

export function snakeToCamel(input: string): string {
	const [first, ...parts] = input.split('_');

	let output = first.toLowerCase();
	for (const part of parts) {
		output += part[0].toUpperCase() + part.substr(1).toLowerCase();
	}

	return output;
}

export type GuildBasedChannel = TextChannel | NewsChannel | VoiceChannel | CategoryChannel | StoreChannel;
export type GuildTextBasedChannel = TextChannel | NewsChannel;
export type TextBasedChannel = DMChannel | GuildTextBasedChannel;
export type Channels = DMChannel | GuildBasedChannel;

export function isTextBasedChannel(channel: Channel): channel is TextBasedChannel {
	return Reflect.has(channel, 'messages');
}

export function isGuildTextBasedChannel(channel: Channel): channel is GuildTextBasedChannel {
	return isTextBasedChannel(channel) && isGuildChannel(channel);
}

export function isGuildChannel(channel: Channel): channel is GuildBasedChannel {
	return Reflect.has(channel, 'guild');
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function isSet<V extends {}, K extends keyof V>(value: V, key: K): value is V & Required<Pick<V, K>> {
	return Reflect.has(value, key);
}

export type EmojiResolvable = string | MessageReactionEmoji | GuildEmoji;

export function resolveEmoji(emoji: EmojiResolvable): string {
	if (typeof emoji === 'string') {
		// <:klasa:354702113147846666> -> :klasa:354702113147846666
		if (emoji.startsWith('<')) return emoji.slice(1, -1);

		// :klasa:354702113147846666 -> :klasa:354702113147846666
		// a:klasa:354702113147846666 -> a:klasa:354702113147846666
		if (emoji.startsWith(':') || emoji.startsWith('a:')) return emoji;

		// 🚀 -> %F0%9F%9A%80
		return encodeURIComponent(emoji);
	}

	// Safe-guard against https://github.com/discordapp/discord-api-docs/issues/974
	return emoji.id ? `${emoji.animated ? 'a' : ''}:${(emoji.name as string).replace(/~\d+/, '')}:${emoji.id}` : encodeURIComponent(emoji.name as string);
}
