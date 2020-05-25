/// <reference types="node" />
import { Readable } from 'stream';
import { MessageAttachment } from './messages/MessageAttachment';
import type { File } from '@klasa/rest';
export declare class Attachment {
    /**
     * The name of the Attachment
     */
    name?: string;
    /**
     * The unresolved file to send to the api
     */
    file?: string | Readable | Buffer | MessageAttachment;
    constructor(attachment?: Partial<Attachment>);
    /**
     * Allows you to set the name of the attachment
     * @param name The name of the Attachment
     */
    setName(name: string): this;
    /**
     * Allows you to set the file of the attachment
     * @param file The unresolved file to send to the api
     */
    setFile(file: string | Readable | Buffer | MessageAttachment): this;
    /**
     * Resolves a stream, url, file location, or text into a buffer we can send to the api
     */
    resolve(): Promise<File>;
}
