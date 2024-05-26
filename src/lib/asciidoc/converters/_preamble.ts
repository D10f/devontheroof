import Asciidoctor, {
  AbstractNode,
  Converter,
  Html5Converter,
  Section,
} from "asciidoctor";

type TocPosition = "before" | "after";

type TocNode = {
  title: string;
  id: string;
  children: TocNode[];
};

export default class TableOfContentsConverter implements Html5Converter {
  private baseConverter: Converter;

  constructor(private position: TocPosition = "after") {
    const asciidoctor = Asciidoctor();
    this.baseConverter = asciidoctor.Html5Converter.create();
  }

  convert(node: AbstractNode): string {
    if (node.getNodeName() !== "preamble") {
      return this.baseConverter.convert(node);
    }

    const toc = node
      .getDocument()
      .getSections()
      .map((node) => this.buildToc(node));

    // const tocHtml = this.buildTocHtml(toc);
    const tocHtml = "";

    const preambleHTML = this.baseConverter.convert(node);

    return this.position === "before"
      ? tocHtml + preambleHTML
      : preambleHTML + tocHtml;
  }

  buildToc(node: Section, maxLevel = 3): TocNode {
    const tocNode = {
      title: node.getTitle() as string,
      id: node.getId() as string,
      children: [],
    };

    if (node.getLevel() === maxLevel) {
      return tocNode;
    }

    return {
      ...tocNode,
      children: node.getSections().map((node) => this.buildToc(node)),
    };
  }
}
