import { BitField, BitFieldObject } from './base/BitField';

export interface SpeakingBitField extends BitFieldObject {
	constructor: SpeakingConstructor;
}

export interface SpeakingConstructor {
	name: 'Speaking';
}

export type SpeakingResolvable = keyof typeof Speaking.FLAGS | number | SpeakingBitField | ((keyof typeof Speaking.FLAGS) | number | SpeakingBitField)[];

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
	} as const;

}

/* eslint-enable no-bitwise */
