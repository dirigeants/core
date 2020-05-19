import { BitField, BitFieldObject } from '@klasa/bitfield';

export type ActivityResolvable = keyof typeof Activity.FLAGS | number | BitFieldObject | ((keyof typeof Activity.FLAGS) | number | BitFieldObject)[];

/* eslint-disable no-bitwise */

/**
 * Handles Activity BitFields in Project-Blue
 */
export class Activity extends BitField<ActivityResolvable> {

	/**
	 * The Activity flags
	 */
	public static FLAGS = {
		INSTANCE: 1 << 0,
		JOIN: 1 << 1,
		SPECTATE: 1 << 2,
		JOIN_REQUEST: 1 << 3,
		SYNC: 1 << 4,
		PLAY: 1 << 5
	} as const;

}

/* eslint-enable no-bitwise */
