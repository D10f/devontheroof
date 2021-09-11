import('./prism');
// class NerdMode {
//   constructor() {
//
//     this.nerdMode = false;
//
//     this.elements = [
//       title,
//       blogLink,
//       contactLink,
//       headlineTitle,
//       headlineSubtitle,
//       navigateLink,
//       gitHubLink
//     ];
//
//     document
//       .getElementById('nerdmode')
//       .addEventListener('click', () => this.toggleNerdMode());
//   }
//
//   toggleNerdMode() {
//     this.nerdMode = !this.nerdMode;
//     this.elements.forEach(el => {
//       el.selector.innerHTML = this.nerdMode ? el.html : el.original;
//     });
//     Prism.highlightAll();
//   }
// }
//
// export default NerdMode;
//
// /* HEADER SECTION */
// const title = {
//   selector: document.querySelector('h1.section__title'),
//   html: '<code class="language-js">class DeveloperSojourn {}</code>',
//   original: 'Developer Sojourn'
// };
//
// const blogLink = {
//   selector: document.querySelector('a[href="https://developersojourn.site/blog"]'),
//   html: `<code class="language-js">API.goto('developersojourn.site/blog')</code>`,
//   original: `Blog
//     <svg class="icon" width=24 height=24 viewBox="0 0 40 40" aria-hidden="true">
//       <path d="M13.757 19.868c-0.416 0-0.832-0.159-1.149-0.476-2.973-2.973-2.973-7.81 0-10.783l6-6c1.44-1.44 3.355-2.233 5.392-2.233s3.951 0.793 5.392 2.233c2.973 2.973 2.973 7.81 0 10.783l-2.743 2.743c-0.635 0.635-1.663 0.635-2.298 0s-0.635-1.663 0-2.298l2.743-2.743c1.706-1.706 1.706-4.481 0-6.187-0.826-0.826-1.925-1.281-3.094-1.281s-2.267 0.455-3.094 1.281l-6 6c-1.706 1.706-1.706 4.481 0 6.187 0.635 0.635 0.635 1.663 0 2.298-0.317 0.317-0.733 0.476-1.149 0.476z"></path>
//       <path d="M8 31.625c-2.037 0-3.952-0.793-5.392-2.233-2.973-2.973-2.973-7.81 0-10.783l2.743-2.743c0.635-0.635 1.664-0.635 2.298 0s0.635 1.663 0 2.298l-2.743 2.743c-1.706 1.706-1.706 4.481 0 6.187 0.826 0.826 1.925 1.281 3.094 1.281s2.267-0.455 3.094-1.281l6-6c1.706-1.706 1.706-4.481 0-6.187-0.635-0.635-0.635-1.663 0-2.298s1.663-0.635 2.298 0c2.973 2.973 2.973 7.81 0 10.783l-6 6c-1.44 1.44-3.355 2.233-5.392 2.233z"></path>
//     </svg>`
// };
//
// const contactLink = {
//   selector: document.querySelector('a[href="#contact"]'),
//   html: '<code class="language-js">getInfo()</code>',
//   original: 'Contact'
// };
//
// const headlineTitle = {
//   selector: document.querySelector('.headline__title'),
//   html: `<code class="headline__title language-js">Person.create({ city: "Madrid", profession: "Web Developer" });</code>`,
//   original: `I'm a Web Developer based in Madrid, Spain.`
// };
//
// const headlineSubtitle = {
//   selector: document.querySelector('.headline__subtitle'),
//   html: `<code class="headline__subtitle language-js">console.greet(&#128075;);</code>`,
//   original: 'Hi! &#128075;'
// };
//
// const navigateLink = {
//   selector: document.querySelector('a[href="#webapps"]'),
//   html: `<code class="language-js">next()</code>`,
//   original: 'Take A Look Around'
// };
//
// const gitHubLink = {
//   selector: document.querySelector('a[href="https://github.com/herokunt"]'),
//   html: `<code class="language-js">API.goto('github.com/herokunt')</code>`,
//   original: `What I'm Working On Next
//   <svg class="icon" width=24 height=24 viewBox="0 0 18 18" aria-hidden="true">
//     <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
//   </svg>`
// };
