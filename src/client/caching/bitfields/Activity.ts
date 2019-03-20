import BitField from './base/BitField.ts';

/**
 * Handles Activity BitFields in D.TS
 */
export default class Activity extends BitField {

	/**
	 * The Activity flags
	 */
	/* tslint:disable:object-literal-sort-keys */
	public static FLAGS: any = {
		INSTANCE: 1 << 0,
		JOIN: 1 << 1,
		SPECTATE: 1 << 2,
		JOIN_REQUEST: 1 << 3,
		SYNC: 1 << 4,
		PLAY: 1 << 5
	};
	/* tslint:enable:object-literal-sort-keys */

}
