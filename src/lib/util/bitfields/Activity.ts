import { BitField, BitFieldObject } from '@klasa/bitfield';

/* eslint-disable no-bitwise */

export const enum ActivityFlags {
	Instance = 'INSTANCE',
	Join = 'JOIN',
	Spectate = 'SPECTATE',
	JoinRequest = 'JOIN_REQUEST',
	Sync = 'SYNC',
	Play ='PLAY'
}

export type ActivityResolvable = ActivityFlags | number | BitFieldObject | (ActivityFlags | number | BitFieldObject)[];

/**
 * Handles Activity BitFields in Klasa-Core
 */
export class Activity extends BitField<ActivityResolvable> {

	/**
	 * The Activity flags
	 */
	public static FLAGS = {
		[ActivityFlags.Instance]: 1 << 0,
		[ActivityFlags.Join]: 1 << 1,
		[ActivityFlags.Spectate]: 1 << 2,
		[ActivityFlags.JoinRequest]: 1 << 3,
		[ActivityFlags.Sync]: 1 << 4,
		[ActivityFlags.Play]: 1 << 5
	} as const;

}
