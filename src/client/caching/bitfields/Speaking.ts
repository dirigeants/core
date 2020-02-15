import { BitField } from './base/BitField';

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
