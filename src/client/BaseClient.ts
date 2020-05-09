import { EventEmitter } from 'events';
import { mergeDefault } from '@klasa/utils';
import { REST, RESTOptions, RESTManagerEvents } from '@klasa/rest';
import { TimerManager } from '@klasa/timer-manager';

import { BaseClientOptionsDefaults } from '../util/Constants';

const plugins: Set<Function> = new Set();

export interface Plugin {
	[BaseClient.plugin]: Function;
}

export interface BaseClientOptions {
	rest: RESTOptions;
}

/**
 * The Project-Blue Base Client used to wrap the Discord API
 */
export class BaseClient extends EventEmitter {

	/**
	 * The rest api interface
	 */
	public api: REST;

	/**
	 * The options to use for this client
	 */
	public options: BaseClientOptions;

	/**
	 * @param options All of your preferences on how Project-Blue should work for you
	 */
	public constructor(options: Partial<BaseClientOptions>) {
		super();
		this.options = mergeDefault(BaseClientOptionsDefaults, options);
		this.api = new REST(this.options.rest)
			.on(RESTManagerEvents.Debug, this.emit.bind(this, RESTManagerEvents.ClientRESTDebug))
			.on(RESTManagerEvents.Ratelimited, this.emit.bind(this, RESTManagerEvents.Ratelimited));

		for (const plugin of plugins) plugin.call(this);
	}

	/**
	 * Sets the token to use for the api.
	 */
	set token(token: string) {
		this.api.token = token;
	}

	/**
	 * Destroys all timers
	 */
	public async destroy(): Promise<void> {
		TimerManager.destroy();
	}

	/**
	 * The plugin symbol to be used in external packages
	 */
	public static readonly plugin: unique symbol = Symbol('ProjectBluePlugin');

	/**
	 * Caches a plugin module to be used when creating a BaseClient instance
	 * @param mod The module of the plugin to use
	 */
	public static use(mod: Plugin): typeof BaseClient {
		const plugin = mod[BaseClient.plugin];
		if (typeof plugin !== 'function') throw new TypeError('The provided module does not include a plugin function');
		plugins.add(plugin);
		return BaseClient;
	}

}
