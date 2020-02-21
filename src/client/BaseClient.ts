import { EventEmitter } from 'events';
import { mergeDefault } from '@klasa/utils';
import { REST } from './rest/REST';
import { BaseClientOptionsDefaults } from '../util/Constants';

import type { RESTOptions } from './rest/RESTManager';
import { TimerManager } from '../util/TimerManager';

export interface BaseClientOptions {
	rest: RESTOptions;
}

/**
 * The Project-Blue Base Client used to wrap the discord api
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
			.on('debug', this.emit.bind(this, 'debug'))
			.on('ratelimited', this.emit.bind(this, 'ratelimited'));
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

}
