import { AbstractNode, Asciidoctor, Converter } from "asciidoctor";

/**
 * Dynamically builds a <source> element with srcset
 */
function makeImageSrcset(
  src: string,
  filetype: string,
  width: number,
  threshold: "min" | "max" = "min",
) {
  const imageName = src.replace(/\.\w{2,4}$/, `-${width}.${filetype}`);
  return `<source srcset="/${imageName} ${width}w" media="(${threshold}-width: ${width}px)" type="image/${filetype}">`;
}

export default class ImageConverter {
  private converter: Converter;

  constructor(asciidoctor: Asciidoctor) {
    this.converter = asciidoctor.Html5Converter.create();
  }

  convert(node: AbstractNode) {
    if (node.getNodeName() === "image") {
      const attributes = node.getAttributes();

      const figurePos = attributes.attribute_entries[0].value;
      const figure = attributes.$positional[0];

      const nodeHTML = `
        <figure class="imageblock">
          <picture>
            ${makeImageSrcset(attributes.target, "webp", 960)}
            ${makeImageSrcset(attributes.target, "webp", 768)}
            ${makeImageSrcset(attributes.target, "webp", 768)}
            <source srcset="/assets/ssl_pulse_protocol_support-portrait.png" media="(orientation: portrait)">
            <img src="/${attributes.target}" alt="${attributes.alt}" loading="lazy" />
          </picture>
          <figcaption>Figure ${figurePos}. ${figure}</figcaption>
        </figure>
      `;

      return nodeHTML;
    }

    return this.converter.convert(node);
  }
}
