/**
 * Generate unique identifiers for tags, tooltips, etc.
 */
export const generateId = (tag: string) => {
	let s = '';
	crypto.getRandomValues(new Uint8Array(16)).forEach((byte) => {
		s += byte.toString(36);
	});
	return s.slice(0, 10) + '_' + tag;
};

/**
 * Transforms the given string (presumably a popular technology brand
 * name) into a Unicode-normalized, lowercase form, removing any
 * punctuation and other special characters. For example:
 *
 * Node.js -> nodejs
 * NestJS  -> nestjs
 */
export const normalizeBrandName = (brand: string) => {
	return brand.toLowerCase().replaceAll(/\./g, '').normalize();
};
