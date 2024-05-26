import Asciidoctor, {
  AbstractNode,
  Converter,
  Html5Converter,
} from "asciidoctor";

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

export default class ImageConverter implements Html5Converter {
  private baseConverter: Converter;

  constructor() {
    const asciidoctor = Asciidoctor();
    this.baseConverter = asciidoctor.Html5Converter.create();
  }

  convert(node: AbstractNode): string {
    if (node.getNodeName() !== "image") {
      return this.baseConverter.convert(node);
    }

    const attributes = node.getAttributes();

    const figurePos = attributes.attribute_entries[0].value;
    const figure = attributes.$positional[0];

    const nodeHTML = `
      <figure class="imageblock">
        <picture>
          ${makeImageSrcset(attributes.target, "webp", 960)}
          ${makeImageSrcset(attributes.target, "webp", 768)}
          <img src="/${attributes.target}" alt="${attributes.alt}" loading="lazy" />
          </picture>
        <figcaption>Figure ${figurePos}. ${figure}</figcaption>
      </figure>
    `;

    // <source srcset="/assets/ssl_pulse_protocol_support-portrait.png" media="(orientation: portrait)">
    return nodeHTML;
  }
}
