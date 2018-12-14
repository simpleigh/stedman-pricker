/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-19 Leigh Simpson. All rights reserved.
 */

import Row from './Row';

/**
 * Converts a [[Row]] into a string.
 */
const stringFromRow = (row: Row): string => {
    const bellSymbols = ' 1234567890ETABCD';
    const bellCharacters: string[] = [ ];

    for (const bell of row) {
        bellCharacters.push(bellSymbols.charAt(bell));
    }

    return bellCharacters.join('');
};

export default stringFromRow;
