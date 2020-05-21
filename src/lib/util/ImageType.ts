/**
 * @param buffer The buffer the sniff the magic numbers from.
 * @see https://en.wikipedia.org/wiki/GIF
 * @private
 */
function isGif(buffer: Buffer): boolean {
	// 0x47 0x49 0x46 0x38 0x39 0x61
	return buffer.length > 6 &&
		buffer[0] === 0x47 &&
		buffer[1] === 0x49 &&
		buffer[2] === 0x46 &&
		buffer[3] === 0x38 &&
		buffer[4] === 0x39 &&
		buffer[5] === 0x61;
}

/**
 * @param buffer The buffer the sniff the magic numbers from.
 * @see https://en.wikipedia.org/wiki/JPEG
 * @private
 */
function isJpeg(buffer: Buffer): boolean {
	// 0xFF 0xD8 0xFF
	return buffer.length > 3 &&
		buffer[0] === 0xFF &&
		buffer[1] === 0xD8 &&
		buffer[2] === 0xFF;
}

/**
 * @param buffer The buffer the sniff the magic numbers from.
 * @see https://en.wikipedia.org/wiki/Portable_Network_Graphics
 * @private
 */
function isPng(buffer: Buffer): boolean {
	// 0x89 0x50 0x4E 0x47 0x0D 0x0A 0x1A 0x0A
	return buffer.length > 8 &&
		buffer[0] === 0x89 &&
		buffer[1] === 0x50 &&
		buffer[2] === 0x4E &&
		buffer[3] === 0x47 &&
		buffer[4] === 0x0D &&
		buffer[5] === 0x0A &&
		buffer[6] === 0x1A &&
		buffer[7] === 0x0A;
}

/**
 * @param buffer The buffer the sniff the magic numbers from.
 * @see https://en.wikipedia.org/wiki/WebP
 * @private
 */
function isWebp(buffer: Buffer): boolean {
	// 0x52 0x49 0x46 0x46 0x__ 0x__ 0x__ 0x__ 0x57 0x45 0x42 0x50
	return buffer.length > 11 &&
		buffer[0] === 0x52 &&
		buffer[1] === 0x49 &&
		buffer[2] === 0x46 &&
		buffer[3] === 0x46 &&
		buffer[8] === 0x57 &&
		buffer[9] === 0x45 &&
		buffer[10] === 0x42 &&
		buffer[11] === 0x50;
}

/**
 * Determines whether or not a buffer corresponds to a GIF, JPG/JPEG, PNG, or WebP.
 * @since 0.0.1
 * @param buffer The buffer to sniff the magic numbers from.
 */
export function getImageType(buffer: Buffer): string | null {
	if (isGif(buffer)) return 'image/gif';
	if (isJpeg(buffer)) return 'image/jpeg';
	if (isPng(buffer)) return 'image/png';
	if (isWebp(buffer)) return 'image/webp';
	return null;
}

/**
 * Determines the image's file type based on its contents and provides a base 64 string on success.
 * @since 0.0.1
 * @param buffer The buffer to sniff and stringify into a Base 64 string.
 */
export function getImageAsBase64(buffer: Buffer): string | null {
	const type = getImageType(buffer);
	return type ? `data:${type};base64,${buffer.toString('base64')}` : null;
}
