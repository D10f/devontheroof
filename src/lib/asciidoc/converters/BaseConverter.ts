import Asciidoctor, {
  AbstractNode,
  Converter,
  Html5Converter,
} from "asciidoctor";

export interface CustomConverter {
  targetNode: string;
  convert(node: AbstractNode, converter: Converter): string;
}

export type ConvertFn = (node: AbstractNode) => string;

export default class BaseConverter implements Html5Converter {
  private defaultConverter: Converter;
  private converters: Map<string, CustomConverter>;

  constructor() {
    const asciidoctor = Asciidoctor();
    this.defaultConverter = asciidoctor.Html5Converter.create();
    this.converters = new Map();
  }

  use(converter: CustomConverter) {
    this.converters.set(converter.targetNode, converter);
    return this;
  }

  convert(node: AbstractNode) {
    const customConverter = this.converters.get(node.getNodeName());
    return customConverter
      ? customConverter.convert(node, this.defaultConverter)
      : this.defaultConverter.convert(node);
  }
}
