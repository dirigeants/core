/**
 * Represents an error sent back from discord
 */
export class DiscordAPIError extends Error {

	/**
	 * @param message The error message reported by discord
	 * @param code The error code reported by discord
	 * @param status The status code of the response
	 * @param method The method of the request that erred
	 * @param url The url of the request that erred
	 */
	public constructor(message: string, public code: number, public status: number, public method: string, public url: string) {
		super(message);
	}

	/**
	 * The name of the error
	 */
	public get name(): string {
		return `${DiscordAPIError.name}[${this.code}]`;
	}

}
