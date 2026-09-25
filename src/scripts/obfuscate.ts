import type { AlpineComponent } from 'alpinejs';

type Challenge = {
	ciphertext: string;
	timeout?: number;
	iv: string;
	salt: string;
	iterations: number;
	nonce: string;
};

type AlpineCallback = AlpineComponent<{
	cleartext?: string;
	timeout?: number;
	errorMsg?: string;
	loading: boolean;
	solved: boolean;
	error: boolean;
	reveal(): void;
	showSpinner: boolean;
	showError: boolean;
	showSuccess: boolean;
	isIdle: boolean;
	isSolved: boolean;
}>;

const hexToBytes = (hex: string) => {
	const bytes = new Uint8Array(hex.length / 2);
	for (let i = 0, c = 0; c < hex.length; c += 2)
		bytes[i++] = parseInt(hex.substring(c, c + 2), 16);
	return bytes;
};

/**
 * Concatenates two Uint8Arrays into a new buffer.
 * @credit altcha
 */
export function concatBuffers(a: Uint8Array, b: Uint8Array) {
	const out = new Uint8Array(a.length + b.length);
	out.set(a, 0);
	out.set(b, a.length);
	return out;
}

const delay = (timeout: number) =>
	new Promise((resolve) => setTimeout(resolve, timeout));

export default function (challenge: Challenge): AlpineCallback {
	return {
		cleartext: undefined,
		timeout: (challenge.timeout || 10_000) as number,
		errorMsg: undefined,
		loading: false,
		solved: false,
		error: false,

		get showSpinner() {
			return this.loading;
		},

		get showError() {
			return this.error;
		},

		get showSuccess() {
			return this.solved && !this.cleartext;
		},

		get isIdle() {
			return !(
				this.loading ||
				this.solved ||
				this.error ||
				this.cleartext
			);
		},

		get isSolved() {
			return this.solved && this.cleartext !== undefined;
		},

		async reveal() {
			this.error = false;
			this.solved = false;
			this.loading = true;

			const start = performance.now();
			let iterations =
				Math.floor(Math.random() * (220_500 - 220_000 + 1)) + 220_000;
			let decryptedBuff;
			let tmp = '';

			const passwordKey = await window.crypto.subtle.importKey(
				'raw',
				hexToBytes(challenge.nonce),
				{ name: 'PBKDF2' },
				false,
				['deriveKey'],
			);

			while (!decryptedBuff) {
				await delay(0);
				try {
					const decryptionKey = await window.crypto.subtle.deriveKey(
						{
							name: 'PBKDF2',
							salt: hexToBytes(challenge.salt),
							iterations,
							hash: 'SHA-256',
						},
						passwordKey,
						{
							name: 'AES-GCM',
							length: 256,
						},
						true,
						['decrypt'],
					);

					decryptedBuff = await window.crypto.subtle.decrypt(
						{
							name: 'AES-GCM',
							iv: hexToBytes(challenge.iv),
						},
						decryptionKey,
						hexToBytes(challenge.ciphertext),
					);
				} catch {
					if (performance.now() - start >= (this.timeout as number)) {
						this.error = true;
						this.loading = false;
						this.errorMsg = 'Challenge timed out.';
						return;
					}

					iterations =
						iterations + 1 > 220_500 ? 220_000 : iterations + 1;
				}
			}

			tmp = new TextDecoder().decode(decryptedBuff);

			this.solved = true;
			this.loading = false;

			if (this.solved) {
				this.cleartext = '';
				await delay(1000); // let the success icon show for a bit
				const typeInterval = Math.ceil(1000 / tmp.length);
				for (const letter of tmp) {
					this.cleartext += letter;
					await delay(typeInterval);
				}
			}
		},
	};
}
