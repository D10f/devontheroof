import { AbstractNode } from "asciidoctor";
import { CustomConverter } from "@/lib/asciidoc/converters/BaseConverter";

type ImageConverterProps = {
    sizes?: number[];
    filetypes?: string[];
};

type AttributeEntry = {
    $$id: number;
    name: string;
    value: number;
    negate: boolean;
};

type NodeAttributes = {
    attribute_entries: AttributeEntry[];
    imagesdir: string;
    "default-alt": string;
    alt: string;
    target: string;
    $positional?: number;
};

export default class ImageConverter implements CustomConverter {
    /**
     * The node type that this class modifies.
     */
    public targetNode = "image";

    /**
     * Viewport width breakpoints.
     */
    private sizes = [768, 960];

    /**
     * Image filetypes to include as options to the picture element.
     */
    private filetypes = ["webp"];

    constructor(props?: ImageConverterProps) {
        props?.sizes && (this.sizes = props.sizes);
        props?.filetypes && (this.filetypes = props.filetypes);
    }

    convert(node: AbstractNode): string {
        const attributes = node.getAttributes() as NodeAttributes;

        //const srcSets = this.makeImageSrcset(attributes.target, "webp", 768);
        // ${ this.makeImageSrcset(attributes.target, "webp", 960) }
        // ${ this.makeImageSrcset(attributes.target, "webp", 768) }

        const nodeHTML = `
          <figure class="imageblock">
            <picture>
              <img src="/${attributes.target}" alt="${attributes.alt}" loading="lazy" />
              ${this.makeFigureCaption(attributes)}
            </picture>
          </figure>
        `;

        return nodeHTML;
    }

    private makeImageSrcset(
        src: string,
        filetype: string,
        width: number,
        threshold: "min" | "max" = "min",
    ) {
        const imageName = src.replace(/\.\w{2,4}$/, `-${width}.${filetype}`);
        return `<source srcset="/${imageName} ${width}w" media="(${threshold}-width: ${width}px)" type="image/${filetype}">`;
    }

    private makeFigureCaption(attributes: NodeAttributes) {
        if (!Object.hasOwn(attributes, "attribute_entries")) {
            return "";
        }

        const figurePos = attributes.attribute_entries[0].value;
        const figure = attributes.$positional as number;

        return `<figcaption>Figure ${figurePos}. ${figure}</figcaption>`;
    }
}
