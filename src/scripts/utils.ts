import { createCipheriv, pbkdf2Sync, randomBytes } from 'node:crypto';
import type { CollectionEntry } from 'astro:content';

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
		.replace(/[^\w-]+/g, '')
		.replace(/--+/g, '-')
		.replace(/^-+/, '')
		.replace(/-+$/, '');
}

/**
 * Decomposes a filename into it's base name and extension, if any. Does
 * not work with filenames that start with a period.
 */
export function splitFilenameComponents(filename: string) {
	const match = filename.match(/^(?<path>.*\/)*(?<name>[^\.]+)\.(?<ext>.*)$/);
	return {
		filepath: match?.groups?.path ?? null,
		filename: match?.groups?.name ?? null,
		extension: match?.groups?.ext ?? null,
	};
}

export function obfuscate(str: string) {
	const nonce = randomBytes(16);
	const salt = randomBytes(16);
	const iv = randomBytes(12);
	const iterations = 1000;
	const keyLength = 32;
	const hashAlgorithm = 'sha256';

	const encryptionKey = pbkdf2Sync(
		nonce,
		salt,
		iterations,
		keyLength,
		hashAlgorithm,
	);

	const cipher = createCipheriv('aes-256-gcm', encryptionKey, iv);

	const ciphertext = Buffer.concat([
		cipher.update(str, 'utf8'),
		cipher.final(),
		cipher.getAuthTag(),
	]);

	return {
		ciphertext: ciphertext.toString('hex'),
		keyPrefix: encryptionKey.toString('hex').slice(0, keyLength),
		iv: iv.toString('hex'),
		salt: salt.toString('hex').slice(4),
		iterations,
		nonce: nonce.toString('hex'),
	};
}

/**
 * Utility function to sort collection entries
 */
export function sortByDate<T extends CollectionEntry<'series' | 'blog'>>(
	a: T,
	b: T,
) {
	return a.data.createdAt.valueOf() - b.data.createdAt.valueOf();
}

/**
 * Each of the series have an index file that describes that particular
 * series. It's the /series/<series-name> URL. However, all AsciiDoc
 * files are stored together and are part of the same Astro Collection.
 * This utility function separates the posts from the index.
 */
export function separateIndex(posts: CollectionEntry<'series'>[]) {
	return posts.reduce(
		(acc, curr) => {
			if (!curr.data['series-prev'] && !curr.data['series-next']) {
				acc.index = curr;
			} else {
				acc.posts.push(curr);
			}

			return acc;
		},
		{ posts: [], index: undefined } as {
			posts: CollectionEntry<'series'>[];
			index?: CollectionEntry<'series'>;
		},
	);
}
