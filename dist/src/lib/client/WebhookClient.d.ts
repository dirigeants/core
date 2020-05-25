import { BaseClient } from './BaseClient';
import { Webhook } from '../caching/structures/Webhook';
import { Cache } from '@klasa/cache';
/**
 * The Project-Blue Webhook Client used to manipulate webhooks
 */
export declare class WebhookClient extends BaseClient {
    /**
     * Cache of all fetched webhooks
     */
    webhooks: Cache<string, Webhook>;
    /**
     * Fetches a webhook from the api
     * @param id The webhook id
     * @param token The webhook token
     */
    fetch(id: string, token?: string): Promise<Webhook>;
}
