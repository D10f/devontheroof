export default () => {
  const groups = document.querySelectorAll('.wp-block-group');

  groups.forEach(group => {

    const titlebar = group.querySelector('.prism-titlename') as HTMLDivElement;
    titlebar.innerHTML = '';
    titlebar.style.display = 'flex';
    titlebar.style.gap = '1rem';

    const codeContainer = group.querySelector('pre');

    Array.from(group.children).forEach((pre, idx) => {
      const title = pre.getAttribute('title') ?? pre.querySelector('code').getAttribute('lang') + `-${idx + 1}`;
      const code = pre.querySelector('code') as HTMLElement;

      const btn = document.createElement('button');
      btn.textContent = title;
      btn.classList.add('prism-tab')
      titlebar.appendChild(btn);

      btn.addEventListener('click', (ev: MouseEvent) => {

        if (btn.classList.contains('prism-tab--active')) return;

        codeContainer.lastChild.remove();
        codeContainer.appendChild(code);

        Array.from(titlebar.children).forEach(btn => {
          btn.classList.remove('prism-tab--active');
        });
        btn.classList.add('prism-tab--active');
      });

      if (idx > 0) {
        pre.remove();
      } else {
        btn.classList.add('prism-tab--active');
      }
    });
  });
}
