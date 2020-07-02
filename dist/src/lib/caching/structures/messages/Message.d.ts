import { APIMessageData, APIMessageActivityData, APIMessageApplicationData, APIMessageReferenceData } from '@klasa/dapi-types';
import { Cache } from '@klasa/cache';
import { RequestOptions } from '@klasa/rest';
import { Embed } from '../Embed';
import { TextBasedChannel } from '../../../util/Util';
import { MessageAttachment } from './MessageAttachment';
import { MessageFlags } from '../../../util/bitfields/MessageFlags';
import { MessageMentions } from './MessageMentions';
import { MessageReaction } from './reactions/MessageReaction';
import { MessageReactionStore } from '../../stores/MessageReactionStore';
import { WebhookMessage } from './WebhookMessage';
import { ReactionCollectorOptions } from '../../../util/collectors/ReactionCollector';
import { MessageBuilder, MessageOptions } from './MessageBuilder';
import type { User } from '../User';
import type { Guild } from '../guilds/Guild';
import type { Client } from '../../../client/Client';
import type { GuildMember } from '../guilds/GuildMember';
export declare class Message extends WebhookMessage<Client> {
    /**
     * The channel the message was sent in.
     * @since 0.0.1
     */
    readonly channel: TextBasedChannel;
    /**
     * The guild the message was sent in.
     * @since 0.0.1
     */
    readonly guild: Guild | null;
    /**
     * Author of this message.
     * @since 0.0.1
     */
    readonly author: User;
    /**
     * The author's member data, always null if {@link Message#guild} is null.
     * @since 0.0.1
     */
    readonly member: GuildMember | null;
    /**
     * The mentions.
     * @since 0.0.1
     */
    readonly mentions: MessageMentions;
    /**
     * The attached files.
     * @since 0.0.1
     */
    readonly attachments: Cache<string, MessageAttachment>;
    /**
     * When this message was edited (or null if never).
     * @since 0.0.1
     */
    editedTimestamp: number | null;
    /**
     * Whether or not this was a TTS message.
     * @since 0.0.1
     */
    tts: boolean;
    /**
     * The embedded data.
     * @since 0.0.1
     */
    embeds: Embed[];
    /**
     * Reactions to the message.
     * @since 0.0.1
     */
    readonly reactions: MessageReactionStore;
    /**
     * Used for validating a message was sent.
     * @since 0.0.1
     */
    readonly nonce?: string | null;
    /**
     * Whether or not this message is pinned.
     * @since 0.0.1
     */
    pinned: boolean;
    /**
     * Sent with Rich Presence-related chat embeds.
     * @since 0.0.1
     */
    readonly activity: APIMessageActivityData | null;
    /**
     * Sent with Rich Presence-related chat embeds.
     * @since 0.0.1
     */
    readonly application: APIMessageApplicationData | null;
    /**
     * Reference data sent with crossposted messages.
     * @since 0.0.1
     */
    readonly reference: APIMessageReferenceData | null;
    /**
     * Describes extra features of the message.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/resources/channel#message-object-message-flags
     */
    flags: MessageFlags;
    /**
     * Whether the message is deleted.
     * @since 0.0.1
     */
    deleted: boolean;
    constructor(client: Client, data: APIMessageData, guild?: Guild);
    /**
     * When this message was sent.
     * @since 0.0.1
     */
    get createdAt(): Date;
    /**
     * When this message was edited (or null if never).
     * @since 0.0.1
     */
    get editedAt(): Date | null;
    /**
     * If the client can delete this message.
     * @since 0.0.1
     */
    get deletable(): boolean | null;
    /**
     * If the client can edit this message.
     * @since 0.0.1
     */
    get editable(): boolean;
    /**
     * If the client can pin this message.
     * @since 0.0.1
     */
    get pinnable(): boolean | null;
    /**
     * If the client can react to this message.
     * @since 0.0.1
     */
    get reactable(): boolean | null;
    /**
     * The link to this message
     * @since 0.0.4
     */
    get link(): string;
    /**
     * Awaits a group of messages.
     * @since 0.0.1
     * @param options The options to control what you receive.
     */
    awaitReactions(options: ReactionCollectorOptions): Promise<Cache<string, MessageReaction>>;
    /**
     * Crosspost this message.
     * @since 0.0.4
     */
    crosspost(): Promise<this>;
    /**
     * Sends a message to the channel.
     * @param data The {@link MessageBuilder builder} to send.
     * @since 0.0.2
     * @see https://discord.com/developers/docs/resources/channel#edit-message
     * @example
     * message.edit(new MessageBuilder()
     *     .setContent('Ping!')
     *     .setEmbed(new Embed().setDescription('From an embed!')));
     */
    edit(data: MessageOptions): Promise<Message>;
    /**
     * Sends a message to the channel.
     * @param data A callback with a {@link MessageBuilder builder} as an argument.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/resources/channel#edit-message
     * @example
     * message.edit(builder => builder
     *     .setContent('Ping!')
     *     .setEmbed(embed => embed.setDescription('From an embed!')));
     */
    edit(data: (message: MessageBuilder) => MessageBuilder | Promise<MessageBuilder>): Promise<Message>;
    /**
     * Deletes the message.
     * @param requestOptions The additional request options.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/resources/channel#delete-message
     */
    delete(requestOptions?: RequestOptions): Promise<this>;
    /**
     * Defines the toString behavior of this structure.
     * @since 0.0.4
     */
    toString(): string;
    /**
     * Pins the message to the channel
     * @since 0.0.4
     */
    pin(): Promise<this>;
    /**
     * Unpins the message to the channel
     * @since 0.0.4
     */
    unpin(): Promise<this>;
    protected _patch(data: Partial<APIMessageData>): this;
}
