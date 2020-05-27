import { BitField, BitFieldObject } from '@klasa/bitfield';

/* eslint-disable no-bitwise */

export const enum SpeakingFlags {
	Speaking = 'SPEAKING',
	Soundshare = 'SOUNDSHARE'
}

export type SpeakingResolvable = SpeakingFlags | number | BitFieldObject | (SpeakingFlags | number | BitFieldObject)[];

/**
 * Handles Speaking BitFields in Klasa-Core
 */
export class Speaking extends BitField<SpeakingResolvable> {

	/**
	 * The Speaking flags
	 */
	public static FLAGS = {
		[SpeakingFlags.Speaking]: 1 << 0,
		[SpeakingFlags.Soundshare]: 1 << 1
	} as const;

}
