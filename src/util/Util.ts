import type { Channel } from '../client/caching/structures/channels/Channel';
import type { DMChannel } from '../client/caching/structures/channels/DMChannel';
import type { TextChannel } from '../client/caching/structures/channels/TextChannel';
import type { NewsChannel } from '../client/caching/structures/channels/NewsChannel';
import type { CategoryChannel } from '../client/caching/structures/channels/CategoryChannel';
import type { VoiceChannel } from '../client/caching/structures/channels/VoiceChannel';
import type { GuildEmoji } from '../client/caching/structures/guilds/GuildEmoji';
import type { MessageReactionEmoji } from '../client/caching/structures/messages/reactions/MessageReactionEmoji';

export function snakeToCamel(input: string): string {
	const [first, ...parts] = input.split('_');

	let output = first.toLowerCase();
	for (const part of parts) {
		output += part[0].toUpperCase() + part.substr(1).toLowerCase();
	}

	return output;
}

export type GuildBasedChannel = TextChannel | NewsChannel | VoiceChannel | CategoryChannel;
export type GuildTextBasedChannel = TextChannel | NewsChannel;
export type TextBasedChannel = DMChannel | GuildTextBasedChannel;

export function isTextBasedChannel(channel: Channel): channel is TextBasedChannel {
	return Reflect.has(channel, 'messages');
}

export function isGuildChannel(channel: Channel): channel is GuildBasedChannel {
	return Reflect.has(channel, 'guild');
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
