import { BitField, BitFieldObject } from '@klasa/bitfield';

/* eslint-disable no-bitwise */

export const enum UserFlagsFlags {
	DiscordEmployee = 'DISCORD_EMPLOYEE',
	DiscordPartner = 'DISCORD_PARTNER',
	HypesquadEvents = 'HYPESQUAD_EVENTS',
	BugHunterLevel1 = 'BUG_HUNTER_LEVEL_1',
	HouseBravery = 'HOUSE_BRAVERY',
	HouseBrilliance = 'HOUSE_BRILLIANCE',
	HouseBalance = 'HOUSE_BALANCE',
	EarlySupporter = 'EARLY_SUPPORTER',
	TeamUser = 'TEAM_USER',
	System = 'SYSTEM',
	BugHunterLevel2 = 'BUG_HUNTER_LEVEL_2'
}

export type UserFlagsResolvable = UserFlagsFlags | number | BitFieldObject | (UserFlagsFlags | number | BitFieldObject)[];

/**
 * Handles UserFlags BitFields in Klasa-Core
 */
export class UserFlags extends BitField<UserFlagsResolvable> {

	/**
	 * The UserFlags flags
	 */
	public static FLAGS = {
		[UserFlagsFlags.DiscordEmployee]: 1 << 0,
		[UserFlagsFlags.DiscordPartner]: 1 << 1,
		[UserFlagsFlags.HypesquadEvents]: 1 << 2,
		[UserFlagsFlags.BugHunterLevel1]: 1 << 3,
		[UserFlagsFlags.HouseBravery]: 1 << 6,
		[UserFlagsFlags.HouseBrilliance]: 1 << 7,
		[UserFlagsFlags.HouseBalance]: 1 << 8,
		[UserFlagsFlags.EarlySupporter]: 1 << 9,
		[UserFlagsFlags.TeamUser]: 1 << 10,
		[UserFlagsFlags.System]: 1 << 12,
		[UserFlagsFlags.BugHunterLevel2]: 1 << 14
	} as const;

}
