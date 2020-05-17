import { RestOptionsDefaults } from '@klasa/rest';
import { WSOptionsDefaults } from '@klasa/ws';

import type { ClientOptions } from '../client/Client';
import type { BaseClientOptions } from '../client/BaseClient';

export const BaseClientOptionsDefaults: Required<BaseClientOptions> = {
	rest: RestOptionsDefaults
};

export const ClientOptionsDefaults: Required<ClientOptions> = {
	...BaseClientOptionsDefaults,
	ws: WSOptionsDefaults,
	pieces: {
		createFolders: false,
		disabledCoreTypes: []
	},
	cache: {
		enabled: true,
		limits: {
			bans: Infinity,
			dms: Infinity,
			channels: Infinity,
			emojis: Infinity,
			members: Infinity,
			guilds: Infinity,
			invites: Infinity,
			reactions: Infinity,
			messages: 100,
			presences: Infinity,
			roles: Infinity,
			users: Infinity,
			voiceStates: Infinity
		}
	}
};
