import { BitField, BitFieldObject } from './base/BitField';

export interface ActivityBitField extends BitFieldObject {
	constructor: ActivityConstructor;
}

export interface ActivityConstructor extends BitFieldObject {
	name: 'Activity';
}

export type ActivityResolvable = keyof typeof Activity.FLAGS | number | ActivityBitField | ((keyof typeof Activity.FLAGS) | number | ActivityBitField)[];

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
