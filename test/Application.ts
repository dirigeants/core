import ava from 'ava';
import nock = require('nock');
import { RestOptionsDefaults, Routes } from '@klasa/rest';
import { Client, Application } from '../src';

import type { APIUserData, APIOauthData, APIGuildData } from '@klasa/dapi-types';

/* eslint-disable camelcase */

const rawGuild: APIGuildData = {
	id: '551164951497899949',
	name: 'Some Guild Headquarters',
	icon: 'eed97f542f2a60e9cafcb469abfef5f1',
	description: null,
	splash: null,
	discovery_splash: null,
	features: [],
	emojis: [],
	banner: null,
	owner_id: '167383252271628288',
	application_id: null,
	region: 'us-west',
	afk_channel_id: null,
	afk_timeout: 300,
	system_channel_id: null,
	widget_enabled: true,
	verification_level: 4,
	roles: [],
	default_message_notifications: 1,
	mfa_level: 1,
	explicit_content_filter: 1,
	max_presences: null,
	max_members: 250000,
	max_video_channel_users: 25,
	vanity_url_code: null,
	premium_tier: 1,
	premium_subscription_count: 2,
	system_channel_flags: 0,
	preferred_locale: 'en-US',
	rules_channel_id: null,
	public_updates_channel_id: null,
	embed_enabled: true
};

const rawOwner: APIUserData = {
	id: '167383252271628288',
	username: 'Owner',
	avatar: '6b26b2972fe980d745dcced464dc7cff',
	discriminator: '0001',
	public_flags: 131840,
	flags: 131840
};

const rawApplication: APIOauthData = {
	id: '228831628164566615',
	name: 'Klasa',
	icon: '5decfa5644c11081120c2f1b032d7c67',
	description: '',
	rpc_origins: ['http://localhost:3344'],
	summary: '',
	bot_public: true,
	bot_require_code_grant: false,
	verify_key: 'You-Do-Not-Want-This',
	owner: rawOwner,
	guild_id: '551164951497899949',
	primary_sku_id: '440053840386788838',
	slug: 'Some Slug!',
	cover_image: '5higje5644g11081120g2j1f032h7g67'
};

/* eslint-enable camelcase */

nock(`${RestOptionsDefaults.api}/v${RestOptionsDefaults.version}`)
	.get(Routes.oauthApplication())
	.times(Infinity)
	.reply(204, rawApplication);

const client = new Client();

client.token = 'Not-A-Real-Token';

ava('fetch application', async (test): Promise<void> => {
	const application = await Application.fetch(client);

	test.is(application.client, client);
	test.is(application.id, rawApplication.id);
	test.is(application.name, rawApplication.name);
	test.is(application.icon, rawApplication.icon);
	test.is(application.description, rawApplication.description);
	test.deepEqual(application.rpcOrigins, rawApplication.rpc_origins);
	test.is(application.botPublic, rawApplication.bot_public);
	test.is(application.botRequireCodeGrant, rawApplication.bot_require_code_grant);
	test.is(application.summary, rawApplication.summary);
	test.is(application.verifyKey, rawApplication.verify_key);
	test.is(application.guildID, rawApplication.guild_id);
	test.is(application.primarySkuID, rawApplication.primary_sku_id);
	test.is(application.slug, rawApplication.slug);
	test.is(application.coverImage, rawApplication.cover_image);
	test.is(application.team, null);

	test.not(application.owner, null);
	const { owner } = application;
	test.is(owner.id, rawOwner.id);
	test.is(owner.username, rawOwner.username);
	test.is(owner.avatar, rawOwner.avatar);
	test.is(owner.discriminator, rawOwner.discriminator);
	test.is(owner.publicFlags, rawOwner.public_flags);
	test.is(owner.flags, rawOwner.flags);

	// Test guild availability
	test.is(application.guild, null);
	// eslint-disable-next-line dot-notation
	const guild = client.guilds['_add'](rawGuild);
	test.is(application.guild, guild);
});
