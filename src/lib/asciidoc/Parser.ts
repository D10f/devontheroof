import path from "path";
import Asciidoctor, { Document, Title } from "asciidoctor";
import BaseConverter, {
  CustomConverter,
} from "@/lib/asciidoc/converters/BaseConverter";

const BASE_PATHNAME = "public";

export default class AsciidocParser {
  private asciidoctor = Asciidoctor();
  private document: Document;
  private documentTitle: Title;
  private converter: BaseConverter;

  constructor(slug: string) {
    this.document = this.readFile(slug);
    this.documentTitle = this.document.getDocumentTitle({
      partition: true,
    }) as Title;
    this.converter = new BaseConverter();
    this.registerConverter();
  }

  get title() {
    return this.documentTitle.getMain();
  }

  get subtitle() {
    return this.documentTitle.getSubtitle();
  }

  get version() {
    return this.document.getRevisionNumber();
  }

  get date() {
    return this.document.getRevisionDate();
  }

  get content() {
    return this.document.getContent() as string;
  }

  private registerConverter() {
    this.asciidoctor.ConverterFactory.register(this.converter, ["html5"]);
  }

  private readFile(slug: string) {
    return this.asciidoctor.loadFile(path.join(BASE_PATHNAME, slug + ".adoc"), {
      safe: "unsafe",
    });
  }

  use(converter: CustomConverter) {
    this.converter.use(converter);
    return this;
  }
}
