import Client from '../Client';

export default class Router {

	private url: Array<string> = [];
	private route: Array<string> = [];

	public constructor(public client: Client) { }

	public guilds(id: string, ...args: Array<string>): this {
		this.url.push('guilds', id, ...args);
		this.route.push('guilds', id, ...args);
		return this;
	}

	public channels(id: string, ...args: Array<string>): this {
		this.url.push('channels', id, ...args);
		this.route.push('channels', id, ...args);
		return this;
	}

	public users(id: string, ...args: Array<string>): this {
		this.url.push('users', id, ...args);
		this.route.push('users', ':id', ...args);
		return this;
	}

	public emojis(id: string, ...args: Array<string>): this {
		this.url.push('emojis', id, ...args);
		this.route.push('emojis', ':id', ...args);
		return this;
	}

	public pins(id: string, ...args: Array<string>): this {
		this.url.push('pins', id, ...args);
		this.route.push('pins', ':id', ...args);
		return this;
	}

	public members(id: string, ...args: Array<string>): this {
		this.url.push('members', id, ...args);
		this.route.push('members', ':id', ...args);
		return this;
	}

	public messages(id: string, ...args: Array<string>): this {
		this.url.push('messages', id, ...args);
		this.route.push('messages', ':id', ...args);
		return this;
	}

	public reactions(emoji: string, ...args: Array<string>): this {
		this.url.push('reactions', emoji, ...args);
		this.route.push('reactions', ':emoji', ...args);
		return this;
	}

	public webhooks(webhook: string, ...args: Array<string>): this {
		this.url.push('webhooks', webhook, ...args);
		this.route.push('webhooks', ':id', ...args);
		return this;
	}

	public invites(invite: string, ...args: Array<string>): this {
		this.url.push('invites', invite, ...args);
		this.route.push('invites', ':id', ...args);
		return this;
	}

	public applications(application: string, ...args: Array<string>): this {
		this.url.push('applications', application, ...args);
		this.route.push('applications', ':id', ...args);
		return this;
	}

	public get() {
		return this.client.rest.makeRequest('get', this.url.join('/'), this.route.join('/'));
	}

	public delete() {
		return this.client.rest.makeRequest('delete', this.url.join('/'), this.route.join('/'));
	}

	public patch(data: any) {
		return this.client.rest.makeRequest('patch', this.url.join('/'), this.route.join('/'), data);
	}

	public put(data: any) {
		return this.client.rest.makeRequest('put', this.url.join('/'), this.route.join('/'), data);
	}

	public post(data: any) {
		return this.client.rest.makeRequest('post', this.url.join('/'), this.route.join('/'), data);
	}

}
