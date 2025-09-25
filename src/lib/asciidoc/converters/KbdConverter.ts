import { AbstractNode, Converter } from "asciidoctor";
import { CustomConverter } from "./BaseConverter";

/**
 * Converter for elements representing keyboard keys i.e., <kbd> element.
 */
export default class KbdConverter implements CustomConverter {
    public targetNode = "inline_quoted";

    private keyboardRegex = [
        // Alphanumeric keys
        new RegExp(/^[A-F0-9]$/),

        // Control keys
        new RegExp(
            /^(?:Ctrl|Shift|Alt|Fn|FnLock|CapsLock|Space|Backspace|Tab|Pr(?:in)?t(?:Scrn?)?|Super|Windows|Enter|NumPad\s?\d)$/,
        ),

        // Function Keys
        new RegExp(/^F(?:[1-9]|1[0-2])$/),

        // Punctuation keys
        new RegExp(/^[`~!@#$%&*()_+\-=\[\]{};:'"|/\\,<.>/?^]$/),

        // Visual keys
        new RegExp(/^[↓←→↑↹↲]$/),
    ];

    convert(node: AbstractNode, defaultConverter: Converter) {
        const text = node.getText();
        const isKey = this.keyboardRegex.some((re) => re.test(text));
        return isKey ? `<kbd>${text}</kbd>` : defaultConverter.convert(node);
    }
}
