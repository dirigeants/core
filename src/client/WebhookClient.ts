import { Router } from './rest/Router';
import { RestOptions } from './rest/RestManager';
import { Webhook } from './caching/structures/Webhook';
import { Cache } from '../util/Cache';

/**
 * The Project-Blue Webhook Client used to manipulate webhooks
 */
export class WebhookClient {

	/**
	 * The api router
	 */
	public api: Router;

	/**
	 * Cache of all fetched webhooks
	 */
	public webhooks: Cache<string, Webhook>;

	/**
	 * @param options All of your preferences on how Project-Blue should work for you
	 */
	public constructor(options: Partial<RestOptions>) {
		this.api = new Router(options);
		this.webhooks = new Cache();
	}

	/**
	 * Fetches a webhook from the api
	 * @param id The webhook id
	 * @param token The webhook token
	 */
	public async fetch(id: string, token?: string): Promise<Webhook> {
		const webhook = await Webhook.fetch(this, id, token);
		this.webhooks.set(id, webhook);
		return webhook;
	}

}
