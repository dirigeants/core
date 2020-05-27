import { BitField, BitFieldObject } from '@klasa/bitfield';

/* eslint-disable no-bitwise */

export const enum MessageFlagsFlags {
	Crossposted = 'CROSSPOSTED',
	IsCrosspost = 'IS_CROSSPOST',
	SuppressEmbeds = 'SUPPRESS_EMBEDS',
	SourceMessageDeleted = 'SOURCE_MESSAGE_DELETED',
	Urgent = 'URGENT'
}

export type MessageFlagsResolvable = MessageFlagsFlags | number | BitFieldObject | (MessageFlagsFlags | number | BitFieldObject)[];

/**
 * Handles MessageFlags BitFields in Klasa-Core
 */
export class MessageFlags extends BitField<MessageFlagsResolvable> {

	/**
	 * The MessageFlags flags
	 */
	public static FLAGS = {
		[MessageFlagsFlags.Crossposted]: 1 << 0,
		[MessageFlagsFlags.IsCrosspost]: 1 << 1,
		[MessageFlagsFlags.SuppressEmbeds]: 1 << 2,
		[MessageFlagsFlags.SourceMessageDeleted]: 1 << 3,
		[MessageFlagsFlags.Urgent]: 1 << 4
	} as const;

}
