import { WebhookMessageBuilder, WebhookMessageOptions } from './messages/WebhookMessageBuilder';
import { Structure } from './base/Structure';
import type { APIWebhookData, WebhookType } from '@klasa/dapi-types';
import type { Client } from '../../client/Client';
import type { WebhookClient } from '../../client/WebhookClient';
import type { SplitOptions } from './messages/MessageBuilder';
import type { Message } from './Message';
import type { User } from './User';
import type { Guild } from './guilds/Guild';
import type { Channel } from './channels/Channel';
export interface WebhookUpdateData {
    name?: string;
    avatar?: string;
    channelID?: string;
}
export declare class Webhook extends Structure<Client | WebhookClient> {
    /**
     * The id of the webhook
     */
    id: string;
    /**
     * The type of the webhook
     */
    type: WebhookType;
    /**
     * The guildID this webhook is for
     */
    guildID?: string;
    /**
     * The channelID this webhook is for
     */
    channelID: string;
    /**
     * The "user" of the webhook displayed on the webhook messages
     */
    user?: User<Client | WebhookClient>;
    /**
     * The name of the webhook
     */
    name: string | null;
    /**
     * The avatar used for this webhook
     */
    avatar: string | null;
    /**
     * The token for this webhook
     */
    token?: string;
    /**
     * @param client The client to manage this webhook
     * @param data The webhook data
     */
    constructor(client: Client | WebhookClient, data: APIWebhookData);
    _patch(data: APIWebhookData): this;
    /**
     * The guild that this webhook is in
     */
    get guild(): Guild | null;
    /**
     * The channel of this webhook
     */
    get channel(): Channel | null;
    /**
     * The timestamp the webhook was created at
     */
    get createdTimestamp(): number;
    /**
     * The time the webhook was created at
     */
    get createdAt(): Date;
    /**
     * Sends a message over the webhook
     * @param data Message data
     */
    send(data: WebhookMessageOptions, splitOptions?: SplitOptions): Promise<Message[]>;
    send(data: (message: WebhookMessageBuilder) => WebhookMessageBuilder | Promise<WebhookMessageBuilder>, splitOptions?: SplitOptions): Promise<Message[]>;
    /**
     * Updates the webhook properties
     * @param webhookUpdateData Data to update the webhook with
     */
    update({ name, avatar, channelID }: WebhookUpdateData): Promise<this>;
    /**
     * Delete this webhook from the api
     */
    delete(): Promise<void>;
    /**
     * Returns a {@link Webhook webhook}, this uses the client for the authentication.
     * @since 0.0.1
     * @param client The {@link Client client} or {@link WebhookClient webhook client} that will manage the created object.
     * @param id The {@link Webhook webhook} ID.
     * @see https://discord.com/developers/docs/resources/webhook#get-webhook
     */
    static fetch(client: Client | WebhookClient, id: string): Promise<Webhook>;
    /**
     * Returns a {@link Webhook webhook}, this uses the token passed.
     * @since 0.0.1
     * @param client The {@link Client client} or {@link WebhookClient webhook client} that will manage the created object.
     * @param id The {@link Webhook webhook} ID.
     * @param token The {@link Webhook webhook}'s token.
     * @see https://discord.com/developers/docs/resources/webhook#get-webhook-with-token
     */
    static fetch(client: Client | WebhookClient, id: string, token: string): Promise<Webhook>;
}
