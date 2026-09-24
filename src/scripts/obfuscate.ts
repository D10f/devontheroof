import type { AlpineComponent } from 'alpinejs';

type Challenge = {
	ciphertext: string;
	iv: string;
	salt: string;
	tag: string;
	iterations: number;
	nonce: string;
};

type AlpineCallback = AlpineComponent<{
	cleartext?: string;
	errorMsg?: string;
	loading: boolean;
	solved: boolean;
	error: boolean;
	reveal(): void;
}>;

const hexToBytes = (hex: string) => {
	const bytes = new Uint8Array(hex.length / 2);
	for (let i = 0, c = 0; c < hex.length; c += 2)
		bytes[i++] = parseInt(hex.substring(c, c + 2), 16);
	return bytes;
};

const delay = (timeout: number) =>
	new Promise((resolve) => setTimeout(resolve, timeout));

export default function (challenge: Challenge) {
	return {
		cleartext: undefined,
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

			await delay(1000);
			let tmp = '';

			try {
				const passwordKey = await window.crypto.subtle.importKey(
					'raw',
					hexToBytes(challenge.nonce),
					{ name: 'PBKDF2' },
					false,
					['deriveKey'],
				);

				const decryptionKey = await window.crypto.subtle.deriveKey(
					{
						name: 'PBKDF2',
						salt: hexToBytes(challenge.salt),
						iterations: challenge.iterations,
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

				const decyptedBuff = await window.crypto.subtle.decrypt(
					{
						name: 'AES-GCM',
						iv: hexToBytes(challenge.iv),
					},
					decryptionKey,
					hexToBytes(challenge.ciphertext + challenge.tag),
				);

				tmp = new TextDecoder().decode(decyptedBuff);
				this.solved = true;
				this.loading = false;
				await delay(400);
			} catch (e) {
				this.error = true;
				this.errorMsg = (e as Error).message;
			} finally {
				this.loading = false;

				if (this.solved) {
					this.cleartext = '';
					await delay(600);
					const typeInterval = Math.ceil(1000 / tmp.length);
					for (const letter of tmp) {
						this.cleartext += letter;
						await delay(typeInterval);
					}
				}
			}
		},
	} as AlpineCallback;
}
