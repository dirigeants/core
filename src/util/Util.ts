import type { Channel } from '../client/caching/structures/channels/Channel';
import type { DMChannel } from '../client/caching/structures/channels/DMChannel';
import type { TextChannel } from '../client/caching/structures/channels/TextChannel';
import type { NewsChannel } from '../client/caching/structures/channels/NewsChannel';
import type { CategoryChannel } from '../client/caching/structures/channels/CategoryChannel';
import type { VoiceChannel } from '../client/caching/structures/channels/VoiceChannel';

export function snakeToCamel(input: string): string {
	const [first, ...parts] = input.split('_');

	let output = first.toLowerCase();
	for (const part of parts) {
		output += part[0].toUpperCase() + part.substr(1).toLowerCase();
	}

	return output;
}

export function isTextBasedChannel(channel: Channel): channel is DMChannel | TextChannel | NewsChannel {
	return Reflect.has(channel, 'messages');
}

export function isGuildChannel(channel: Channel): channel is TextChannel | NewsChannel | VoiceChannel | CategoryChannel {
	return Reflect.has(channel, 'guild');
}
