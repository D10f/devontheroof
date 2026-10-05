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

	const blocks = document.querySelectorAll('.listingblock');

	const tabGroups = [];
	let i = 0;

	while (true) {
		if (i >= blocks.length) break;

		const group = [];

		let j = 1;
		let current = blocks[i];

		while (current.nextElementSibling === blocks[i + j++]) {
			group.push(current);
			current = current.nextElementSibling;
		}

		if (group.length > 0) {
			group.push(current);
			tabGroups.push(group);
			i += group.length;
		} else {
			++i;
		}
	}

	tabGroups.forEach((group) => {
		const tabGroup = document.createElement('div');
		tabGroup.classList = 'listingblock-tabs';
		tabGroup.setAttribute('x-data', '{ current: 0 }');

		const tabList = document.createElement('ul');
		tabGroup.appendChild(tabList);

		group[0].insertAdjacentElement('beforebegin', tabGroup);
		group.forEach((tab, idx) => {
			const item = document.createElement('li');
			item.setAttribute(':class', `{ 'active': current === ${idx} }`);

			const button = document.createElement('button');
			button.setAttribute('@click', `current = ${idx}`);
			button.textContent =
				tab.querySelector('figcaption')?.textContent ||
				tab.getAttribute('data-language') ||
				`Tab ${idx + 1}`;

			item.appendChild(button);
			tabList.appendChild(item);

			tab.setAttribute('x-show', `current === ${idx}`);
			tabGroup.appendChild(tab);
		});
	});
};
