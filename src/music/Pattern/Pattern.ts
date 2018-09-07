/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import * as Templates from '../../templates';
import AbstractMatcher from '../AbstractMatcher';
import MatchType from '../MatchType';
import text from './text.dot';

/**
 * Pattern that can be used to match rows
 */
@Templates.makePrintable({ text })
class Pattern extends AbstractMatcher {

    /**
     * Count of matches
     */
    protected _matchCount: number = 0;

    /**
     * Constructor
     * @param pattern  string to match
     * @param name     name of this pattern
     * @param type     type of match
     */
    constructor(
        protected _pattern: string,
        protected _name?: string,
        protected _type: MatchType = MatchType.Back,
    ) {
        super();
    }

    /* AbstractMatcher methods ************************************************/

    /**
     * Matches a row string
     */
    public match(row: string): boolean {
        if (this._type === MatchType.Back) {
            row = row.slice(-this._pattern.length);
        } else if (this._type === MatchType.Front) {
            row = row.slice(0, this._pattern.length);
        }

        if (row === this._pattern) {
            this._matchCount += 1;
            return true;
        }

        return false;
    }

    /**
     * Provides read access to the name
     */
    get name(): string {
        return this._name || this._pattern;
    }

    /**
     * Provides read access to the count of matches
     */
    get matchCount(): number {
        return this._matchCount;
    }

    /* Pattern methods ********************************************************/

    /**
     * Determines whether this is a wildcard match
     */
    get isWildcardMatch(): boolean {
        return this._type !== MatchType.Row;
    }

}

export default Pattern;
