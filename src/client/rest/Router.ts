import { Client } from '../Client';

export interface RequestOptions {
	query?: any;
	headers?: any;
	data?: any;
	files?: any[];
	reason?: string;
}

export interface Request extends RequestOptions {
	method: string;
	url: string;
}

/**
 * The route builder class
 */
export class Router {

	/**
	 * The url being built
	 */
	private readonly url: Array<string> = [];

	/**
	 * The route being built
	 */
	private readonly route: Array<string> = [];

	/**
	 * The types of ids that differenciate ratelimit buckets
	 * https://discordapp.com/developers/docs/topics/rate-limits#rate-limits
	 */
	private static MAJOR_PARAMETERS = ['channels', 'guilds', 'webhooks'];

	// eslint-disable-next-line no-useless-constructor
	public constructor(public readonly client: Client) { }

	/**
	 * A guilds route
	 */
	public get guilds(): this {
		this.url.push('guilds');
		this.route.push('guilds');
		return this;
	}

	/**
	 * A channels route
	 */
	public get channels(): this {
		this.url.push('channels');
		this.route.push('channels');
		return this;
	}

	/**
	 * A users route
	 */
	public get users(): this {
		this.url.push('users');
		this.route.push('users');
		return this;
	}

	/**
	 * An emojis route
	 */
	public get emojis(): this {
		this.url.push('emojis');
		this.route.push('emojis');
		return this;
	}

	/**
	 * The gateway route
	 * @param args Any additional arguments
	 */
	public get gateway(): this {
		this.url.push('gateway');
		this.route.push('gateway');
		return this;
	}

	/**
	 * A channel pins route
	 */
	public get pins(): this {
		this.url.push('pins');
		this.route.push('pins');
		return this;
	}

	/**
	 * A members route
	 */
	public members(): this {
		this.url.push('members');
		this.route.push('members');
		return this;
	}

	/**
	 * A messages route
	 */
	public get messages(): this {
		this.url.push('messages');
		this.route.push('messages');
		return this;
	}

	/**
	 * A reactions route
	 */
	public get reactions(): this {
		this.url.push('reactions');
		this.route.push('reactions');
		return this;
	}

	/**
	 * A webhooks route
	 */
	public get webhooks(): this {
		this.url.push('webhooks');
		this.route.push('webhooks');
		return this;
	}

	/**
	 * An invites route
	 */
	public get invites(): this {
		this.url.push('invites');
		this.route.push('invites');
		return this;
	}

	/**
	 * An application's route
	 */
	public get applications(): this {
		this.url.push('applications');
		this.route.push('applications');
		return this;
	}

	/**
	 * A permissions route
	 */
	public get permissions(): this {
		this.url.push('permissions');
		this.route.push('permissions');
		return this;
	}

	/**
	 * A recipients route
	 */
	public get recipients(): this {
		this.url.push('recipients');
		this.route.push('recipients');
		return this;
	}

	/**
	 * The audit-logs route
	 */
	public get auditLogs(): this {
		this.url.push('audit-logs');
		this.route.push('audit-logs');
		return this;
	}

	/**
	 * The prune route
	 */
	public get prune(): this {
		this.url.push('prune');
		this.route.push('prune');
		return this;
	}

	/**
	 * The prune route
	 */
	public get regions(): this {
		this.url.push('prune');
		this.route.push('prune');
		return this;
	}

	/**
	 * The integrations route
	 */
	public get integrations(): this {
		this.url.push('integrations');
		this.route.push('integrations');
		return this;
	}

	/**
	 * The embed route
	 */
	public get embed(): this {
		this.url.push('embed');
		this.route.push('embed');
		return this;
	}

	/**
	 * The vanity-url route
	 */
	public get vanityURL(): this {
		this.url.push('vanity-url');
		this.route.push('vanity-url');
		return this;
	}

	/**
	 * A specific id's route
	 */
	public id(...ids: string[]): this {
		this.url.push(...ids);

		for (const id of ids) {
			const previousSegment = this.route[this.route.length - 1];
			let routeSegment = id;

			// The 'reactions' route and sub-routes all share the same bucket
			if (previousSegment === 'reactions') return this;
			// The ID should only be litteral if it's not an id of a Major Parameter
			if (!Router.MAJOR_PARAMETERS.includes(previousSegment)) routeSegment = ':id';
			// All other IDs should be considered as part of the bucket identifier "route"
			this.route.push(routeSegment);
		}

		return this;
	}

	/**
	 * Makes this Router's route into a get request
	 */
	public get(options: RequestOptions = {}): any {
		return this.client.rest!.queueRequest(this.route.join('/'), { method: 'get', url: this.url.join('/'), ...options });
	}

	/**
	 * Makes this Router's route into a delete request
	 */
	public delete(options: RequestOptions = {}): any {
		return this.client.rest!.queueRequest(this.route.join('/'), { method: 'delete', url: this.url.join('/'), ...options });
	}

	/**
	 * Makes this Router's route into a patch request
	 * @param data The data to patch
	 */
	public patch(options: RequestOptions = {}): any {
		return this.client.rest!.queueRequest(this.route.join('/'), { method: 'patch', url: this.url.join('/'), ...options });
	}

	/**
	 * Makes this Router's route into a put request
	 * @param data The data to put
	 */
	public put(options: RequestOptions = {}): any {
		return this.client.rest!.queueRequest(this.route.join('/'), { method: 'put', url: this.url.join('/'), ...options });
	}

	/**
	 * Makes this Router's route into a post request
	 * @param data The data to post
	 */
	public post(options: RequestOptions = {}): any {
		return this.client.rest!.queueRequest(this.route.join('/'), { method: 'post', url: this.url.join('/'), ...options });
	}

}
