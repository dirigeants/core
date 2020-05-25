/// <reference types="node" />
import { EventEmitter } from 'events';
import { REST, RESTOptions } from '@klasa/rest';
export interface BaseClientOptions {
    rest: RESTOptions;
}
/**
 * The Project-Blue Base Client used to wrap the Discord API
 */
export declare class BaseClient extends EventEmitter {
    /**
     * The rest api interface
     */
    api: REST;
    /**
     * The options to use for this client
     */
    options: BaseClientOptions;
    /**
     * @param options All of your preferences on how Project-Blue should work for you
     */
    constructor(options: Partial<BaseClientOptions>);
    /**
     * Sets the token to use for the api.
     */
    set token(token: string);
    /**
     * Destroys all timers
     */
    destroy(): Promise<void>;
}
