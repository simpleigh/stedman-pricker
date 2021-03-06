/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

/**
 * Creates a style element for pricker rendering
 * @param parentDocument  document object to use (inject for testing)
 */
const createAndAppendStyle = (
    parentDocument: HTMLDocument = document,
    styles: string = '',
): HTMLStyleElement => {
    const style = parentDocument.createElement('style');
    style.type = 'text/css';
    style.innerText = styles;

    parentDocument.head.appendChild(style);

    return style;
};

export default createAndAppendStyle;
