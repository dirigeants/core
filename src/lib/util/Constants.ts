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
		defaults: {
			events: {
				enabled: true,
				once: false
			}
		},
		createFolders: false,
		disabledCoreTypes: []
	},
	cache: {
		enabled: true,
		limits: {
			bans: Infinity,
			channels: Infinity,
			dms: Infinity,
			emojis: Infinity,
			guilds: Infinity,
			integrations: Infinity,
			invites: Infinity,
			members: Infinity,
			messages: 100,
			overwrites: Infinity,
			presences: Infinity,
			reactions: Infinity,
			roles: Infinity,
			users: Infinity,
			voiceStates: Infinity
		},
		messageLifetime: 0,
		messageSweepInterval: 0
	}
};
