import { BitField, BitFieldObject } from '@klasa/bitfield';

export type SpeakingResolvable = keyof typeof Speaking.FLAGS | number | BitFieldObject | ((keyof typeof Speaking.FLAGS) | number | BitFieldObject)[];

/* eslint-disable no-bitwise */

/**
 * Handles Speaking BitFields in Klasa-Core
 */
export class Speaking extends BitField<SpeakingResolvable> {

	/**
	 * The Speaking flags
	 */
	public static FLAGS = {
		SPEAKING: 1 << 0,
		SOUNDSHARE: 1 << 1
	} as const;

}

/* eslint-enable no-bitwise */
