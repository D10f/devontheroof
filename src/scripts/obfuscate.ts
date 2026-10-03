import type { AlpineComponent } from 'alpinejs';

type Challenge = {
	ciphertext: string;
	keyPrefix: string;
	timeout?: number;
	iv: string;
	salt: string;
	iterations: number;
	nonce: string;
};

type AlpineCallback = AlpineComponent<{
	cleartext?: string;
	timeout: number;
	errorMsg?: string;
	loading: boolean;
	solved: boolean;
	error: boolean;
	workers: Worker[];
	cleanup(): void;
	success(cleartext: string): void;
	fail(reason: string): void;
	spawnWorker(n: number): void;
	reveal(): void;
	abort(): void;
	time: number;
	stopwatch: ReturnType<typeof setInterval>;
	countdown: ReturnType<typeof setTimeout>;
	showSpinner: boolean;
	showError: boolean;
	showSuccess: boolean;
	showTakingTooLong: boolean;
	isIdle: boolean;
	isSolved: boolean;
}>;

function delay(timeout: number) {
	return new Promise((resolve) => setTimeout(resolve, timeout));
}

export default function (challenge: Challenge): AlpineCallback {
	return {
		cleartext: undefined,
		timeout: challenge.timeout || 30_000,
		errorMsg: undefined,
		loading: false,
		solved: false,
		error: false,
		time: 0,
		// @ts-expect-error type of interval
		stopwatch: 0,
		// @ts-expect-error type of timeout
		countdown: 0,

		get showSpinner() {
			return this.loading;
		},

		get showError() {
			return this.error;
		},

		get showSuccess() {
			return this.solved && !this.cleartext;
		},

		get showTakingTooLong() {
			return this.time > this.timeout / 3;
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

		workers: [],

		cleanup() {
			clearInterval(this.stopwatch);
			clearTimeout(this.countdown);
			this.workers.forEach((worker) => {
				worker.terminate();
			});
			this.time = 0;
		},

		success(cleartext) {
			this.cleanup();

			this.solved = true;
			this.loading = false;

			if (this.solved) {
				this.cleartext = '';
				const typeInterval = Math.ceil(1000 / cleartext.length);

				// show the success icon for a second, then the cleartext
				delay(1000).then(async () => {
					for (const letter of cleartext) {
						this.cleartext += letter;
						await delay(typeInterval);
					}
				});
			}
		},

		fail(reason) {
			this.cleanup();
			this.error = true;
			this.loading = false;
			this.errorMsg = reason;
		},

		abort() {
			this.fail('Operation cancelled.');
		},

		spawnWorker(n) {
			const domain = 2 ** 16 / n;

			for (let i = 0; i < n; ++i) {
				const worker = new Worker(
					new URL('obfuscate-worker.ts', import.meta.url),
					{ type: 'module' },
				);

				worker.addEventListener(
					'message',
					async (msg: MessageEvent<string | null>) => {
						if (msg.data) {
							this.success(msg.data);
						} else {
							this.fail('Search space too large.');
						}
					},
				);

				worker.postMessage({
					...challenge,
					start: i * domain,
					end: (i + 1) * domain,
				});

				this.workers.push(worker);
			}
		},

		reveal() {
			this.error = false;
			this.solved = false;
			this.loading = true;

			this.spawnWorker(navigator.hardwareConcurrency);

			this.stopwatch = setInterval(() => {
				this.time += 100;
			}, 100);

			this.countdown = setTimeout(() => {
				if (this.solved) return;
				this.fail('Challenge timed out.');
			}, this.timeout);
		},
	};
}
