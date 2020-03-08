import { BitField, BitFieldObject } from '@klasa/bitfield';

export type MessageFlagsResolvable = keyof typeof MessageFlags.FLAGS | number | BitFieldObject | ((keyof typeof MessageFlags.FLAGS) | number | BitFieldObject)[];

/* eslint-disable no-bitwise */

/**
 * Handles MessageFlags BitFields in Project-Blue
 */
export class MessageFlags extends BitField<MessageFlagsResolvable> {

	/**
	 * The MessageFlags flags
	 */
	public static FLAGS = {
		CROSSPOSTED: 1 << 0,
		IS_CROSSPOST: 1 << 1,
		SUPPRESS_EMBEDS: 1 << 2,
		SOURCE_MESSAGE_DELETED: 1 << 3,
		URGENT: 1 << 4
	} as const;

}

/* eslint-enable no-bitwise */
