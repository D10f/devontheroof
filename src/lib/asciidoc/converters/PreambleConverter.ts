import { AbstractNode, Converter, Section } from "asciidoctor";
import { CustomConverter } from "@/lib/asciidoc/converters/BaseConverter";

type TocPosition = "before" | "after";

type TocNode = {
    title: string;
    id: string;
    level: number;
    children: TocNode[];
};

export default class PreambleConverter implements CustomConverter {
    public targetNode = "preamble";

    constructor(public readonly tocMaxLevel = 3) {}

    convert(node: AbstractNode, defaultConverter: Converter) {
        const toc = node
            .getDocument()
            .getSections()
            .map((node) => this.buildToc(node))
            .map((node) => this.buildTocHtml(node))
            .join("");

        const preamble = defaultConverter.convert(node);

        return preamble + '<menu class="toc">' + toc + "</menu>";
    }

    private buildToc(node: Section, maxLevel = MAX_LEVEL): TocNode {
        const tocNode = {
            title: node.getTitle() as string,
            id: node.getId() as string,
            level: node.getLevel(),
            children: [],
        };

        if (tocNode.level === maxLevel) {
            return tocNode;
        }

        return {
            ...tocNode,
            children: node.getSections().map((node) => this.buildToc(node)),
        };
    }

    private buildTocHtml(node: TocNode): string {
        const liTag = '<li class="toc__item">';
        const link = `<a href="#${node.id}">${node.title}</a>`;

        if (node.children.length === 0) {
            return liTag + link + "</li>";
        }

        const childNodesHtml = node.children
            .map((n) => this.buildTocHtml(n))
            .join("");

        return liTag + link + "<ul>" + childNodesHtml + "</ul></li>";
    }
}
