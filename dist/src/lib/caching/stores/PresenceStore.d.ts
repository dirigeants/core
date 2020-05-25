import { DataStore } from './base/DataStore';
import type { APIPresenceUpdateData } from '@klasa/dapi-types';
import type { Presence } from '../structures/guilds/Presence';
import type { Client } from '../../client/Client';
import type { Guild } from '../structures/guilds/Guild';
/**
 * The store for {@link Presence presences}.
 * @since 0.0.1
 */
export declare class PresenceStore extends DataStore<Presence> {
    /**
     * The {@link Guild guild} this store belongs to.
     * @since 0.0.1
     */
    readonly guild: Guild;
    /**
     * Builds the store.
     * @since 0.0.1
     * @param client The {@link Client client} this store belongs to.
     * @param guild The {@link Guild guild} this store belongs to.
     */
    constructor(client: Client, guild: Guild);
    /**
     * Adds a new structure to this DataStore
     * @param data The data packet to add
     */
    protected _add(data: APIPresenceUpdateData): Presence;
}
