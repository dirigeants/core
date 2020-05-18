import { BaseClient } from './BaseClient';
import { Webhook } from './caching/structures/Webhook';
import { Cache } from '@klasa/cache';

/**
 * The Project-Blue Webhook Client used to manipulate webhooks
 */
export class WebhookClient extends BaseClient {

	/**
	 * Cache of all fetched webhooks
	 */
	public webhooks: Cache<string, Webhook> = new Cache();

	/**
	 * Fetches a webhook from the api
	 * @param id The webhook id
	 * @param token The webhook token
	 */
	public async fetch(id: string, token?: string): Promise<Webhook> {
		// @ts-expect-error
		const webhook = await Webhook.fetch(this, id, token);
		this.webhooks.set(id, webhook);
		return webhook;
	}

}
