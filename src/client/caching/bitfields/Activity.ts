import { BitField } from './base/BitField';

/**
 * Handles Activity BitFields in Project-Blue
 */
export class Activity extends BitField {

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
	};

}
