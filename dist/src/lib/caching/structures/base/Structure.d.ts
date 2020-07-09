import type { Client } from '../../../client/Client';
/**
 * The base class for Structures
 */
export declare abstract class Structure<T = Client> {
    readonly client: T;
    /**
     * The id to be defined in Structures
     */
    abstract readonly id: string;
    constructor(client: T);
    /**
     * The Date when this object was created at
     */
    get createdAt(): Date;
    /**
     * The time when this object was created at
     */
    get createdTimestamp(): number;
    /**
     * Basic clone method
     */
    clone(): this;
    /**
     * The method of patching this instance defined in Structures
     * @param data The data packet
     */
    protected abstract _patch(data: unknown): this;
    /**
     * The basic value of this Structure
     */
    valueOf(): string;
    /**
     * The JSON representation of this object.
     */
    toJSON(): Record<string, any>;
}
