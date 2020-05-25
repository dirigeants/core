import { DataStore } from './base/DataStore';
import type { APIVoiceStatePartial } from '@klasa/dapi-types';
import type { Client } from '../../client/Client';
import type { VoiceState } from '../structures/guilds/VoiceState';
import type { Guild } from '../structures/guilds/Guild';
/**
 * The store for {@link VoiceState voice states}.
 * @since 0.0.1
 */
export declare class VoiceStateStore extends DataStore<VoiceState> {
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
    protected _add(data: APIVoiceStatePartial): VoiceState;
}
