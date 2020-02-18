let INCREMENT = 0n;

/* eslint-disable no-bitwise */

/**
 * A class for parsing snowflake ids
 */
export class Snowflake {

	/**
	 * The id in BigInt form
	 */
	public id: bigint;

	/**
	 * The timestamp stored in the snowflake
	 */
	public timestamp: number;

	/**
	 * The worker id stored in the snowflake
	 */
	public workerID: number;

	/**
	 * The process id stored in the snowflake
	 */
	public processID: number;

	/**
	 * The increment stored in the snowflake
	 */
	public increment: number;

	// Discord epoch (2015-01-01T00:00:00.000Z)
	private static EPOCH = 1420070400000;

	/**
	 * @param id The id to parse
	 */
	public constructor(id: string | bigint) {
		this.id = BigInt(id); // eslint-disable-line no-undef
		this.timestamp = Number(this.id >> 22n) + Snowflake.EPOCH;
		this.workerID = Number((this.id >> 17n) & 0b11111n);
		this.processID = Number((this.id >> 12n) & 0b11111n);
		this.increment = Number(this.id & 0b111111111111n);
	}

	/**
	 * The timestamp in a Date form
	 */
	public get date(): Date {
		return new Date(this.timestamp);
	}

	/**
	 * The binary string of the snowflake
	 */
	public get binary(): string {
		return this.id.toString(2);
	}

	/**
	 * The snowflake as a string
	 */
	public toString(): string {
		return this.id.toString();
	}

	/**
	 * Generates a Discord like snowflake
	 * @param timestamp Timestamp or date of the snowflake to generate
	 */
	public static generate(timestamp: number | Date = Date.now()): Snowflake {
		if (timestamp instanceof Date) timestamp = timestamp.getTime();
		if (typeof timestamp !== 'number' || isNaN(timestamp)) {
			throw new TypeError(`"timestamp" argument must be a number or Date (received ${isNaN(timestamp) ? 'NaN' : typeof timestamp})`);
		}
		if (INCREMENT >= 4095n) INCREMENT = 0n;

		// timestamp, workerID hard-coded to 1, processID hard-coded to 1, increment
		return new Snowflake((BigInt(timestamp) << 22n) | (1n << 17n) | (1n << 12n) | INCREMENT++); // eslint-disable-line no-undef
	}

}

/* eslint-enable no-bitwise */
