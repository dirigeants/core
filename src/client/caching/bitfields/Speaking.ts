import { BitField } from './base/BitField';

export type SpeakingResolvable = keyof typeof Speaking.FLAGS | number | Speaking | (keyof typeof Speaking.FLAGS)[] | number[] | Speaking[];

/* eslint-disable no-bitwise */

/**
 * Handles Speaking BitFields in Project-Blue
 */
export class Speaking extends BitField<SpeakingResolvable> {

	/**
	 * The Speaking flags
	 */
	public static FLAGS = {
		SPEAKING: 1 << 0,
		SOUNDSHARE: 1 << 1
	};

}

/* eslint-enable no-bitwise */
