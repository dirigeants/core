import * as Package from '../../package.json';
import { ClientOptions } from '../client/Client';

export const UserAgent = `DiscordBot (${Package.homepage.split('#')[0]}, ${Package.version}) Node.js/${process.version}`;

export const ClientOptionsDefaults: Required<ClientOptions> = {
	shards: 1,
	rest: {
		offset: 100,
		retryLimit: 1,
		timeout: 15000,
		version: 7,
		api: 'https://discordapp.com/api'
	}
};
