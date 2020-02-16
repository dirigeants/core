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

	// eslint-disable-next-line no-useless-constructor
	public constructor(public readonly client: Client) { }

	/**
	 * A guild's route
	 * @param id The guild's id
	 * @param args Any additional arguments
	 */
	public guilds(id: string, ...args: Array<string>): this {
		this.url.push('guilds', id, ...args);
		this.route.push('guilds', id, ...args);
		return this;
	}

	/**
	 * A channel's route
	 * @param id The channel's id
	 * @param args Any additional arguments
	 */
	public channels(id: string, ...args: Array<string>): this {
		this.url.push('channels', id, ...args);
		this.route.push('channels', id, ...args);
		return this;
	}

	/**
	 * A user's route
	 * @param id The user's id
	 * @param args Any additional arguments
	 */
	public users(id: string, ...args: Array<string>): this {
		this.url.push('users', id, ...args);
		this.route.push('users', ':id', ...args);
		return this;
	}

	/**
	 * An emoji's route
	 * @param id The emoji's id
	 * @param args Any additional arguments
	 */
	public emojis(id: string, ...args: Array<string>): this {
		this.url.push('emojis', id, ...args);
		this.route.push('emojis', ':id', ...args);
		return this;
	}

	/**
	 * The gateway route
	 * @param args Any additional arguments
	 */
	public gateway(...args: Array<string>): this {
		this.url.push('gateway', ...args);
		this.route.push('gateway', ...args);
		return this;
	}

	/**
	 * A channel pin's route
	 * @param id The id of the pin
	 * @param args Any additional arguments
	 */
	public pins(id: string, ...args: Array<string>): this {
		this.url.push('pins', id, ...args);
		this.route.push('pins', ':id', ...args);
		return this;
	}

	/**
	 * A member's route
	 * @param id The member's id
	 * @param args Any additional arguments
	 */
	public members(id: string, ...args: Array<string>): this {
		this.url.push('members', id, ...args);
		this.route.push('members', ':id', ...args);
		return this;
	}

	/**
	 * A message's route
	 * @param id The message's id
	 * @param args Any additional arguments
	 */
	public messages(id: string, ...args: Array<string>): this {
		this.url.push('messages', id, ...args);
		this.route.push('messages', ':id', ...args);
		return this;
	}

	/**
	 * A reaction's route
	 * @param emoji The emoji's id
	 * @param args Any additional arguments
	 */
	public reactions(emoji: string, ...args: Array<string>): this {
		this.url.push('reactions', emoji, ...args);
		this.route.push('reactions', ':emoji', ...args);
		return this;
	}

	/**
	 * A webhook's route
	 * @param webhook The webhook's id
	 * @param args Any additional arguments
	 */
	public webhooks(webhook: string, ...args: Array<string>): this {
		this.url.push('webhooks', webhook, ...args);
		this.route.push('webhooks', ':id', ...args);
		return this;
	}

	/**
	 * An invite's route
	 * @param invite The invite's id
	 * @param args Any additional arguments
	 */
	public invites(invite: string, ...args: Array<string>): this {
		this.url.push('invites', invite, ...args);
		this.route.push('invites', ':id', ...args);
		return this;
	}

	/**
	 * An application's route
	 * @param application The application's id
	 * @param args Any additional arguments
	 */
	public applications(application: string, ...args: Array<string>): this {
		this.url.push('applications', application, ...args);
		this.route.push('applications', ':id', ...args);
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
