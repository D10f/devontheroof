import { AbstractNode, Converter } from "asciidoctor";
import { CustomConverter } from "./BaseConverter";

/**
 * Converter for elements representing keyboard keys i.e., <kbd> element.
 */
export default class KbdConverter implements CustomConverter {
    public targetNode = "inline_quoted";

    private keyboardRegex = [
        new RegExp(
            /^(?:Ctrl|Shift|Alt|Space|Backspace|Print(?:Scrn)?|Super|Windows)/,
        ),

        new RegExp(/^F(?:[1-9]|1[0-2])$/),

        new RegExp(/^[!@#$%^&*()_+\-=\[\]{};:'"|/\\,<.>/?]$/),

        // TODO: Media keys, arrows, unicode, emojis, other languages, etc.
    ];

    convert(node: AbstractNode, defaultConverter: Converter) {
        const text = node.getText();
        const isKey = this.keyboardRegex.some((re) => re.test(text));
        return isKey ? `<kbd>${text}</kbd>` : defaultConverter.convert(node);
    }
}
