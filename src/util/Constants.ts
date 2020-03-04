import { RestOptionsDefaults } from '@klasa/rest';

import * as Package from '../../package.json';
import { Intents } from '../client/caching/bitfields/Intents';

import type { ClientOptions } from '../client/Client';
import type { BaseClientOptions } from '../client/BaseClient';
import type { WSOptions } from '../client/ws/WebSocketManager';

const WebSocketID = `Project Blue v${Package.version}; Node.js/${process.version}`;

export const WSOptionsDefaults: Required<WSOptions> = {
	shards: 'auto',
	totalShards: null,
	intents: Intents.DEFAULT,
	additionalOptions: {
		// eslint-disable-next-line @typescript-eslint/camelcase
		large_threshold: 250,
		properties: {
			$os: process.platform,
			$browser: WebSocketID,
			$device: WebSocketID
		}
	},
	gatewayVersion: 6
};

export const BaseClientOptionsDefaults: Required<BaseClientOptions> = {
	rest: RestOptionsDefaults
};

export const ClientOptionsDefaults: Required<ClientOptions> = {
	...BaseClientOptionsDefaults,
	ws: WSOptionsDefaults
};
