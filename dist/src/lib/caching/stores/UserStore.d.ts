import { DataStore } from './base/DataStore';
import type { User } from '../structures/User';
import type { Client } from '../../client/Client';
/**
 * The store for {@link User users}.
 * @since 0.0.1
 */
export declare class UserStore extends DataStore<User> {
    /**
     * Builds the store.
     * @since 0.0.1
     * @param client The {@link Client client} this store belongs to.
     */
    constructor(client: Client);
    /**
     * Gets a {@link User user} by its ID.
     * @since 0.0.1
     * @param userID The {@link User user} ID.
     * @see https://discord.com/developers/docs/resources/user#get-user
     */
    fetch(userID: string): Promise<User>;
    /**
     * Resolves data into Structures
     * @param data The data to resolve
     */
    resolve(data: unknown): User | null;
    /**
     * Resolves data into ids
     * @param data The data to resolve
     */
    resolveID(data: unknown): string | null;
}
