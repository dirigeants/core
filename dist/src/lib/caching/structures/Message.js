"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
/* eslint-disable no-dupe-class-members */
const cache_1 = require("@klasa/cache");
const rest_1 = require("@klasa/rest");
const Embed_1 = require("./Embed");
const Util_1 = require("../../util/Util");
const MessageAttachment_1 = require("./messages/MessageAttachment");
const MessageFlags_1 = require("../../util/bitfields/MessageFlags");
const MessageMentions_1 = require("./messages/MessageMentions");
const MessageReaction_1 = require("./messages/reactions/MessageReaction");
const MessageReactionStore_1 = require("../stores/MessageReactionStore");
const Structure_1 = require("./base/Structure");
const ReactionCollector_1 = require("../../util/collectors/ReactionCollector");
const Permissions_1 = require("../../util/bitfields/Permissions");
const MessageBuilder_1 = require("./messages/MessageBuilder");
class Message extends Structure_1.Structure {
    constructor(client, data, guild) {
        var _a;
        super(client);
        /**
         * The embedded data.
         * @since 0.0.1
         */
        this.embeds = [];
        /**
         * Whether the message is deleted.
         * @since 0.0.1
         */
        this.deleted = false;
        this.id = data.id;
        this.attachments = new cache_1.Cache();
        this.reactions = new MessageReactionStore_1.MessageReactionStore(client, this);
        this.guild = guild || (data.guild_id ? (_a = this.client.guilds.get(data.guild_id)) !== null && _a !== void 0 ? _a : null : null);
        this.channel = this.client.channels.get(data.channel_id);
        // eslint-disable-next-line dot-notation
        this.author = this.client.users['_add'](data.author);
        // eslint-disable-next-line dot-notation
        this.member = data.member && this.guild ? this.guild.members['_add']({ ...data.member, user: data.author }) : null;
        this.createdTimestamp = new Date(data.timestamp).getTime();
        this.mentions = new MessageMentions_1.MessageMentions(this, data.mentions, data.mention_roles, data.mention_channels, data.mention_everyone);
        this.type = data.type;
        if (Util_1.isSet(data, 'nonce'))
            this.nonce = data.nonce;
        if (Util_1.isSet(data, 'webhook_id'))
            this.webhookID = data.webhook_id;
        if (Util_1.isSet(data, 'activity'))
            this.activity = data.activity;
        if (Util_1.isSet(data, 'application'))
            this.application = data.application;
        if (Util_1.isSet(data, 'message_reference'))
            this.reference = data.message_reference;
        this._patch(data);
    }
    /**
     * When this message was sent.
     * @since 0.0.1
     */
    get createdAt() {
        return new Date(this.createdTimestamp);
    }
    /**
     * When this message was edited (or null if never).
     * @since 0.0.1
     */
    get editedAt() {
        return this.editedTimestamp ? new Date(this.editedTimestamp) : null;
    }
    /**
     * If the client can react to this message.
     * @since 0.0.1
     */
    get deletable() {
        var _a, _b;
        if (this.deleted)
            return false;
        if (!this.guild)
            return this.editable;
        return this.editable || ((_b = (_a = this.guild.me) === null || _a === void 0 ? void 0 : _a.permissionsIn(this.channel).has([Permissions_1.Permissions.FLAGS.MANAGE_MESSAGES])) !== null && _b !== void 0 ? _b : null);
    }
    /**
     * If the client can react to this message.
     * @since 0.0.1
     */
    get editable() {
        return !this.deleted && (this.author === this.client.user);
    }
    /**
     * If the client can react to this message.
     * @since 0.0.1
     */
    get pinnable() {
        var _a, _b;
        if (this.deleted)
            return false;
        if (!this.guild)
            return true;
        return (_b = (_a = this.guild.me) === null || _a === void 0 ? void 0 : _a.permissionsIn(this.channel).has([Permissions_1.Permissions.FLAGS.MANAGE_MESSAGES])) !== null && _b !== void 0 ? _b : null;
    }
    /**
     * If the client can react to this message.
     * @since 0.0.1
     */
    get reactable() {
        var _a, _b;
        if (this.deleted)
            return false;
        if (!this.guild)
            return true;
        return (_b = (_a = this.guild.me) === null || _a === void 0 ? void 0 : _a.permissionsIn(this.channel).has([Permissions_1.Permissions.FLAGS.ADD_REACTIONS])) !== null && _b !== void 0 ? _b : null;
    }
    /**
     * Awaits a group of messages.
     * @since 0.0.1
     * @param options The options to control what you receive.
     */
    awaitReactions(options = {}) {
        return new ReactionCollector_1.ReactionCollector(this, options).collect();
    }
    /**
     * Edits the message.
     * @param data The {@link MessageBuilder builder} to send.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/resources/channel#edit-message
     */
    async edit(data) {
        data = typeof data === 'function' ? await data(new MessageBuilder_1.MessageBuilder()) : data;
        const apiData = await this.client.api.patch(rest_1.Routes.channelMessage(this.channel.id, this.id), data);
        return this._patch(apiData);
    }
    /**
     * Deletes the message.
     * @param requestOptions The additional request options.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/resources/channel#delete-message
     */
    async delete(requestOptions = {}) {
        await this.channel.messages.remove(this.id, requestOptions);
        this.deleted = true;
        return this;
    }
    _patch(data) {
        if (Util_1.isSet(data, 'content'))
            this.content = data.content;
        if (Util_1.isSet(data, 'edited_timestamp'))
            this.editedTimestamp = data.edited_timestamp ? new Date(data.edited_timestamp).getTime() : null;
        if (Util_1.isSet(data, 'tts'))
            this.tts = data.tts;
        if (data.reactions) {
            this.reactions.clear();
            for (const reaction of data.reactions) {
                const messageReaction = new MessageReaction_1.MessageReaction(this.client, reaction, this);
                this.reactions.set(messageReaction.id, messageReaction);
            }
        }
        if (data.attachments)
            for (const attachment of data.attachments)
                this.attachments.set(attachment.id, new MessageAttachment_1.MessageAttachment(attachment));
        if (data.embeds)
            for (const embed of data.embeds)
                this.embeds.push(new Embed_1.Embed(embed));
        if (Util_1.isSet(data, 'pinned'))
            this.pinned = data.pinned;
        if (Util_1.isSet(data, 'flags'))
            this.flags = new MessageFlags_1.MessageFlags(data.flags);
        return this;
    }
}
exports.Message = Message;
//# sourceMappingURL=Message.js.map