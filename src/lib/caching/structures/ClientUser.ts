import { extender } from '../../util/Extender';

/**
 * Represents the client's user account.
 * @see https://discord.com/developers/docs/resources/user#user-object
 */
export class ClientUser extends extender.get('User') {}

extender.extend('ClientUser', () => ClientUser);
