import { BitField } from './base/BitField';

/* eslint-disable no-bitwise */

/**
 * Handles Speaking BitFields in Project-Blue
 */
export class Speaking extends BitField {

	/**
	 * The Speaking flags
	 */
	public static FLAGS = {
		SPEAKING: 1 << 0,
		SOUNDSHARE: 1 << 1
	};

}

/* eslint-enable no-bitwise */
