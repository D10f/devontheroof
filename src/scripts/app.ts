import theme from './theme';
import codeblock from './codeblock';
import scroll from './scroll';
import obfuscate from './obfuscate';

import type { Alpine } from 'alpinejs';

export default (Alpine: Alpine) => {
	Alpine.data('theme', theme);
	Alpine.data('codeblock', codeblock);
	Alpine.data('scroll', scroll);
	Alpine.data('obfuscate', obfuscate);
};
