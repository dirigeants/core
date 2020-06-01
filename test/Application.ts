import ava from 'ava';
import nock = require('nock');
import { RestOptionsDefaults, Routes } from '@klasa/rest';
import { Client, Application } from '../src';

import type { APIUserData, APIOauthData } from '@klasa/dapi-types';

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
	summary: '',
	bot_public: true,
	bot_require_code_grant: false,
	verify_key: 'You-Do-Not-Want-This',
	owner: rawOwner
};

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
	test.deepEqual(application.rpcOrigins, []);
	test.is(application.botPublic, rawApplication.bot_public);
	test.is(application.botRequireCodeGrant, rawApplication.bot_require_code_grant);
	test.is(application.summary, rawApplication.summary);
	test.is(application.verifyKey, rawApplication.verify_key);
	test.is(application.guildID, null);
	test.is(application.primarySkuID, null);
	test.is(application.slug, null);
	test.is(application.coverImage, null);

	test.not(application.owner, null);
	const { owner } = application;
	test.is(owner.id, rawOwner.id);
	test.is(owner.username, rawOwner.username);
	test.is(owner.avatar, rawOwner.avatar);
	test.is(owner.discriminator, rawOwner.discriminator);
	test.is(owner.publicFlags, rawOwner.public_flags);
	test.is(owner.flags, rawOwner.flags);

	test.is(application.team, null);
});
