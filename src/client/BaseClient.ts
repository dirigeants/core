import { EventEmitter } from 'events';
import { mergeDefault } from '@klasa/utils';
import { REST } from './rest/REST';
import { ClientOptionsDefaults } from '../util/Constants';

import type { RESTOptions } from './rest/RESTManager';

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
		this.options = mergeDefault(ClientOptionsDefaults, options);
		this.api = new REST(this.options.rest)
			.on('debug', this.emit.bind(this, 'debug'))
			.on('ratelimited', this.emit.bind(this, 'ratelimited'));
	}

}
