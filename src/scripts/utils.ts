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
 * Converts the given string to a slug to be used in a URL.
 */
export function slugify(text: string) {
	return text
		.trim()
		.normalize()
		.toLowerCase()
		.replace(/\s+/g, '-')
		.replace(/--+/g, '-')
		.replace(/[^\w-]+/g, '')
		.replace(/^-+/, '')
		.replace(/-+$/, '');
}
