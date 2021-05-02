document.addEventListener('DOMContentLoaded', loadTableOfContents, { once: true });

function loadTableOfContents() {
  const post = document.querySelector('.post__content');
  const table = document.querySelector('.blog__table-of-contents');

  if (!table) return;

  const ul = document.createElement('ul');

  post.querySelectorAll('h3').forEach(title => {

    title.id = title.textContent.split(' ').join('-');

    const li = document.createElement('li');
    li.className = 'blog__table-item';

    const a = document.createElement('a');
    a.className = 'blog__table-link';
    a.href = `#${title.id}`;
    a.textContent = title.textContent;

    li.appendChild(a);
    ul.appendChild(li);
  });

  table.appendChild(ul);
}
