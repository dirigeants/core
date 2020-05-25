import { PresenceUpdateData } from '@klasa/ws';
import { Presence } from '../guilds/Presence';
import { PresenceBuilder } from './PresenceBuilder';
/**
 * The {@link Presence presence} for the {@link ClientUser client user}.
 * @since 0.0.1
 * @see https://discord.com/developers/docs/topics/gateway#presence
 */
export declare class ClientPresence extends Presence {
    /**
     * Sets the client presence.
     * @since 0.0.1
     * @param presence The presence data to be sent.
     * @see https://discord.com/developers/docs/topics/gateway#update-status
     */
    modify(game: PresenceUpdateData, shards?: number | number[]): this;
    /**
     * Sets the client presence with a builder, and returns it.
     * @since 0.0.1
     * @param builder The builder to aid building the game.
     */
    modify(builder: (presence: PresenceBuilder) => PresenceBuilder, shards?: number | number[]): this;
}
