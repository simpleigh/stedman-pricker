/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import Bell from './Bell';

/**
 * Converts a character into a [[Bell]].
 *
 * Tries to convert an individual bell character into a bell number.
 * An exception is thrown if the character cannot be recognised.
 *
 * ```
 * > Pricker.bellFromSymbol('E');
 * 11
 * ```
 */
const bellFromSymbol = (input: string): Bell => {
    input = input.toUpperCase();

    // tslint:disable:object-literal-key-quotes object-literal-sort-keys
    const bellSymbolsMap: { [index: string]: number } = {
        '1': 1, '2': 2, '3': 3, '4': 4,
        '5': 5, '6': 6, '7': 7, '8': 8,
        '9': 9, '0': 10, 'E': 11, 'T': 12,
        'A': 13, 'B': 14, 'C': 15, 'D': 16,
    };
    // tslint:enable:object-literal-key-quotes object-literal-sort-keys

    if (!bellSymbolsMap[input]) {
        throw new Error('Unknown bell');
    }

    return bellSymbolsMap[input];
};

export default bellFromSymbol;