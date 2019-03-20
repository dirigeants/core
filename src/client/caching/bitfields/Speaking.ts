import BitField from './base/BitField.ts';

/**
 * Handles Speaking BitFields in D.TS
 */
export default class Speaking extends BitField {

	/**
	 * The Speaking flags
	 */
	/* tslint:disable:object-literal-sort-keys */
	public static FLAGS: any = {
		SPEAKING: 1 << 0,
		SOUNDSHARE: 1 << 1
	};
	/* tslint:enable:object-literal-sort-keys */

}
