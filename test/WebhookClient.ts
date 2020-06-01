import ava from 'ava';
import nock = require('nock');
import { RestOptionsDefaults, Routes } from '@klasa/rest';
import { Snowflake } from '@klasa/snowflake';
import { WebhookClient, User } from '../src';

import { APIWebhookData, WebhookType, APIUserData, APIMessageData, MessageType } from '@klasa/dapi-types';

const date = new Date(new Date().toString());
const id = Snowflake.generate(date).toString();
const token = 'abcdef';

const rawWebhook: APIWebhookData = {
	id,
	type: WebhookType.Incoming,
	// eslint-disable-next-line @typescript-eslint/camelcase
	channel_id: '9463781',
	name: 'Spidey Bot',
	avatar: null
};

const rawUser: APIUserData = {
	id,
	username: 'Spidey Bot',
	avatar: null,
	discriminator: '0000'
};

const rawMessage: APIMessageData = {
	id: '123789852963',
	// eslint-disable-next-line @typescript-eslint/camelcase
	channel_id: '9463781',
	author: rawUser,
	content: 'FooBar',
	timestamp: date.toString(),
	// eslint-disable-next-line @typescript-eslint/camelcase
	edited_timestamp: null,
	tts: false,
	// eslint-disable-next-line @typescript-eslint/camelcase
	mention_everyone: false,
	mentions: [],
	// eslint-disable-next-line @typescript-eslint/camelcase
	mention_roles: [],
	// eslint-disable-next-line @typescript-eslint/camelcase
	mention_channels: [],
	attachments: [],
	embeds: [],
	pinned: false,
	type: MessageType.Default,
	// eslint-disable-next-line @typescript-eslint/camelcase
	webhook_id: id
};

nock(`${RestOptionsDefaults.api}/v${RestOptionsDefaults.version}`)
	.get(Routes.webhookTokened(id, token))
	.times(Infinity)
	.reply(204, rawWebhook)
	.get(Routes.webhook(id))
	.times(Infinity)
	// eslint-disable-next-line prefer-arrow-callback
	.reply(function handler(): nock.ReplyFnResult {
		// eslint-disable-next-line no-invalid-this, @typescript-eslint/camelcase
		if (this.req.headers.authorization) return [204, { token, guild_id: '54321', user: rawUser, ...rawWebhook }];
		return [403, { message: 'Unauthorized', code: 50013 }];
	})
	.delete(Routes.webhookTokened(id, token))
	.times(Infinity)
	.reply(204)
	.delete(Routes.webhook(id))
	.times(Infinity)
	// eslint-disable-next-line prefer-arrow-callback
	.reply(function handler(): nock.ReplyFnResult {
		// eslint-disable-next-line no-invalid-this, @typescript-eslint/camelcase
		if (this.req.headers.authorization) return [204];
		return [403];
	})
	.post(Routes.webhookTokened(id, token))
	.times(Infinity)
	.reply(204, rawMessage)
	.post(Routes.webhook(id))
	.times(Infinity)
	// eslint-disable-next-line prefer-arrow-callback
	.reply(function handler(): nock.ReplyFnResult {
		// eslint-disable-next-line no-invalid-this, @typescript-eslint/camelcase
		if (this.req.headers.authorization) return [204, rawMessage];
		return [403];
	})
	.patch(Routes.webhookTokened(id, token))
	.times(Infinity)
	// eslint-disable-next-line prefer-arrow-callback
	.reply(function handler(_uri, requestBody): nock.ReplyFnResult {
		// eslint-disable-next-line @typescript-eslint/camelcase
		return [204, { ...rawWebhook, name: (requestBody as Record<string, unknown>).name ?? rawWebhook.name, avatar: (requestBody as Record<string, unknown>).avatar ?? rawWebhook.avatar }];
	})
	.patch(Routes.webhook(id))
	.times(Infinity)
	// eslint-disable-next-line prefer-arrow-callback
	.reply(function handler(_uri, requestBody): nock.ReplyFnResult {
		// eslint-disable-next-line no-invalid-this
		if (this.req.headers.authorization) {
			return [204, {
				...rawWebhook,
				name: (requestBody as Record<string, unknown>).name ?? rawWebhook.name,
				avatar: (requestBody as Record<string, unknown>).avatar ?? rawWebhook.avatar,
				// eslint-disable-next-line @typescript-eslint/camelcase
				channel_id: (requestBody as Record<string, unknown>).channel_id ?? rawWebhook.channel_id
			}];
		}
		return [403];
	});

const client = new WebhookClient();

client.token = 'Not-A-Real-Token';

ava('fetch webhook', async (test): Promise<void> => {
	test.plan(15);

	const webhook = await client.fetch(id);
	test.is(webhook.id, id);
	test.is(webhook.type, WebhookType.Incoming);
	test.is(webhook.guildID, '54321');
	test.true(webhook.user instanceof User);
	test.is(webhook.user?.id, id);
	test.is(webhook.user?.avatar, null);
	test.is(webhook.user?.discriminator, '0000');
	test.is(webhook.user?.username, 'Spidey Bot');
	test.deepEqual(webhook.createdAt, date);
	test.is(webhook.createdTimestamp, date.valueOf());
	test.is(webhook.guild, null);
	test.is(webhook.channel, null);
	test.is(webhook.name, 'Spidey Bot');
	test.is(webhook.channelID, '9463781');
	test.is(webhook.token, token);
});

ava('fetch webhook w/ token', async (test): Promise<void> => {
	test.plan(11);

	const webhook = await client.fetch(id, token);
	test.is(webhook.id, id);
	test.is(webhook.type, WebhookType.Incoming);
	test.is(webhook.guildID, null);
	test.is(webhook.user, null);
	test.deepEqual(webhook.createdAt, date);
	test.is(webhook.createdTimestamp, date.valueOf());
	test.is(webhook.guild, null);
	test.is(webhook.channel, null);
	test.is(webhook.name, 'Spidey Bot');
	test.is(webhook.channelID, '9463781');
	test.is(webhook.token, token);
});

ava('delete webhook', async (test): Promise<void> => {
	test.plan(2);

	const webhook = await client.fetch(id);
	test.is(webhook.deleted, false);
	await webhook.delete();
	test.is(webhook.deleted, true);
});

ava('delete webhook w/ token', async (test): Promise<void> => {
	test.plan(2);

	const webhook = await client.fetch(id, token);
	test.is(webhook.deleted, false);
	await webhook.delete();
	test.is(webhook.deleted, true);
});

ava('send webhook', async (test): Promise<void> => {
	test.plan(3);

	const webhook = await client.fetch(id);
	const [message] = await webhook.send(mb => mb.setContent('FooBar'));
	test.is(message.content, 'FooBar');
	test.is(message.toString(), 'FooBar');
	test.deepEqual(message.createdAt, date);
});

ava('send webhook w/ token', async (test): Promise<void> => {
	test.plan(3);

	const webhook = await client.fetch(id, token);
	const [message] = await webhook.send(mb => mb.setContent('FooBar'));
	test.is(message.content, 'FooBar');
	test.is(message.toString(), 'FooBar');
	test.deepEqual(message.createdAt, date);
});

ava('update webhook', async (test): Promise<void> => {
	test.plan(6);

	const webhook = await client.fetch(id);
	test.is(webhook.name, 'Spidey Bot');
	test.is(webhook.avatar, null);
	test.is(webhook.channelID, '9463781');
	await webhook.modify({ name: 'TestWebhook', avatar: 'a_whatatest', channelID: '74108520963' });
	test.is(webhook.name, 'TestWebhook');
	test.is(webhook.avatar, 'a_whatatest');
	test.is(webhook.channelID, '74108520963');
});

ava('update webhook w/ token', async (test): Promise<void> => {
	test.plan(6);

	const webhook = await client.fetch(id, token);
	test.is(webhook.name, 'Spidey Bot');
	test.is(webhook.avatar, null);
	test.is(webhook.channelID, '9463781');
	await webhook.modify({ name: 'TestWebhook', avatar: 'a_whatatest' });
	test.is(webhook.name, 'TestWebhook');
	test.is(webhook.avatar, 'a_whatatest');
	test.is(webhook.channelID, '9463781');
});
