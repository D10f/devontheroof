type Challenge = {
	ciphertext: string;
	timeout: number;
	iv: string;
	salt: string;
	iterations: number;
	nonce: string;
	start: number;
	end: number;
};

const hexToBytes = (hex: string) => {
	const bytes = new Uint8Array(hex.length / 2);
	for (let i = 0, c = 0; c < hex.length; c += 2)
		bytes[i++] = parseInt(hex.substring(c, c + 2), 16);
	return bytes;
};

self.addEventListener('message', async (ctx: MessageEvent<Challenge>) => {
	const salt = hexToBytes(ctx.data.salt);
	const iv = hexToBytes(ctx.data.iv);
	const ciphertext = hexToBytes(ctx.data.ciphertext);
	const nonce = hexToBytes(ctx.data.nonce);

	const saltBuffer = new Uint8Array(2 + salt.length);
	const saltBufferView = new DataView(saltBuffer.buffer);
	saltBuffer.set(salt, 2);

	const passwordKey = await crypto.subtle.importKey(
		'raw',
		nonce,
		{ name: 'PBKDF2' },
		false,
		['deriveKey'],
	);

	for (let i = ctx.data.start; i < ctx.data.end; i++) {
		saltBufferView.setUint16(0, i);
		try {
			const decryptionKey = await crypto.subtle.deriveKey(
				{
					name: 'PBKDF2',
					salt: saltBuffer,
					iterations: ctx.data.iterations,
					hash: 'SHA-256',
				},
				passwordKey,
				{ name: 'AES-GCM', length: 256 },
				true,
				['decrypt'],
			);

			const decryptedBuff = await crypto.subtle.decrypt(
				{ name: 'AES-GCM', iv },
				decryptionKey,
				ciphertext,
			);

			postMessage(new TextDecoder().decode(decryptedBuff));
		} catch {}
	}

	postMessage(null);
});
