import Asciidoctor, { Block, Document, Title } from "asciidoctor";
import dayjs from "dayjs";
import AdvancedFormat from "dayjs/plugin/advancedFormat";
import BaseConverter, {
    CustomConverter,
} from "@/lib/asciidoc/converters/BaseConverter";
import CodeBlockConverter from "@/lib/asciidoc/converters/CodeBlockConverter";
import { ShikiHighlighter } from "../shiki/highlighter";
import { BundledLanguage } from "shiki";

dayjs.extend(AdvancedFormat);
//const BASE_PATHNAME = "public/posts";

export default class AsciidocParser {
    private asciidoctor = Asciidoctor();
    private document: Document;
    private documentTitle: Title;
    private converter: BaseConverter;
    private highlighter: ShikiHighlighter;

    constructor(
        private filename: string,
        //private syntaxHighlighterThemes: Array<
        //    string | Record<string, any>
        //> = [],
    ) {
        this.converter = new BaseConverter();
        this.registerConverter();
        this.document = this.readFile(filename) as Document;
        this.documentTitle = this.document.getDocumentTitle({
            partition: true,
        }) as Title;
        this.highlighter = ShikiHighlighter.getInstance();
    }

    get description() {
        return this.document.getAttribute("description");
    }

    get keywords() {
        return this.document.getAttribute("keywords");
    }

    /**
     * A non-standard attribute list describing the technologies the document
     * speaks about. It is later used to display an icon.
     */
    get technologies(): string[] {
        const techs = this.document.getAttribute("technologies") || "";
        return techs.split(" ");
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
        return dayjs(this.document.getRevisionDate());
        //return this.document.getRevisionDate();
    }

    get content() {
        return this.document.getContent() as string;
    }

    get slug() {
        //return this.filename.replace(/\..*$/, "");
        return this.filename.replace(/^.*\/([^/]+$)/, (_, p1) => {
            return p1.replace(/\..*$/, "");
        });
    }

    get preamble() {
        // https://gitlab.com/opendevise/oss/descriptionizer
        const [documentBlock] = this.document.getBlocks() as Block[];
        const [preambleBlock] = documentBlock.getBlocks() as Block[];
        if (preambleBlock) return preambleBlock.getSourceLines()[0];
    }

    async useSyntaxHighligher() {
        const languages = this.document
            .findBy({ context: "listing" })
            .reduce((acc, cur) => {
                acc.add(cur.getAttribute("language"));
                return acc;
            }, new Set<BundledLanguage>());

        const codeBlockConverter = new CodeBlockConverter(
            await this.highlighter.getHighlighter(Array.from(languages)),
        );
        //await getHighlighter({
        //    themes: this.syntaxHighlighterThemes,
        //    langs: Array.from(languages),
        //}),

        this.use(codeBlockConverter);
    }

    private registerConverter() {
        this.asciidoctor.ConverterFactory.register(this.converter, ["html5"]);
    }

    private readFile(filename: string) {
        //return this.asciidoctor.loadFile(path.join(BASE_PATHNAME, filename), {
        try {
            return this.asciidoctor.loadFile(filename, {
                safe: "unsafe",
            });
        } catch (error) {
            if (
                (error as Error).name === "ENOENT" &&
                process.env.NODE_ENV === "development"
            ) {
                return this.asciidoctor.loadFile(
                    filename.replace(/(\.adoc)$/, ".draft$1"),
                    {
                        safe: "unsafe",
                    },
                );
            }
        }
    }

    use(converter: CustomConverter) {
        this.converter.use(converter);
        return this;
    }
}
