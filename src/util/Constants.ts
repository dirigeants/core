import * as Package from '../../package.json';
import { ClientOptions } from '../client/Client';
import { RESTOptions } from '../client/rest/RESTManager';
import { BaseClientOptions } from '../client/BaseClient';

export const UserAgent = `DiscordBot (${Package.homepage.split('#')[0]}, ${Package.version}) Node.js/${process.version}`;

export const RestOptionsDefaults: Required<RESTOptions> = {
	offset: 100,
	retries: 1,
	timeout: 15000,
	version: 7,
	api: 'https://discordapp.com/api'
};

export const BaseClientOptionsDefaults: Required<BaseClientOptions> = {
	rest: RestOptionsDefaults
};

export const ClientOptionsDefaults: Required<ClientOptions> = {
	...BaseClientOptionsDefaults,
	shards: 1
};
