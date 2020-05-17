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
	caching: true
};
