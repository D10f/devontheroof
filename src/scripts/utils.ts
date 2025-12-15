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
