import { RestOptionsDefaults } from '@klasa/rest';
import { WSOptionsDefaults } from '@klasa/ws';

import type { ClientOptions } from '../client/Client';
import type { BaseClientOptions } from '../client/BaseClient';

export const BaseClientOptionsDefaults: Required<BaseClientOptions> = {
	rest: RestOptionsDefaults
};

export const ClientOptionsDefaults: Required<ClientOptions> = {
	...BaseClientOptionsDefaults,
	ws: WSOptionsDefaults
};

export const MessageTypes = [
	'DEFAULT',
	'RECIPIENT_ADD',
	'RECIPIENT_REMOVE',
	'CALL',
	'CHANNEL_NAME_CHANGE',
	'CHANNEL_ICON_CHANGE',
	'PINS_ADD',
	'GUILD_MEMBER_JOIN',
	'USER_PREMIUM_GUILD_SUBSCRIPTION',
	'USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_1',
	'USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_2',
	'USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_3',
	'CHANNEL_FOLLOW_ADD',
	// 13 but it's not documented in discord api docs
	null,
	'GUILD_DISCOVERY_DISQUALIFIED',
	'GUILD_DISCOVERY_REQUALIFIED'
];
