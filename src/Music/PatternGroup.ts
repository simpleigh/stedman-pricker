/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="../Row.ts" />
/// <reference path="MatcherInterface.ts" />
/// <reference path="MatchResult.ts" />
/// <reference path="Pattern.ts" />

namespace Pricker {
    'use strict';

    /**
     * Music classes to analyse rows
     */
    export namespace Music {

        /**
         * Group of similar patterns to match related rows
         */
        export class PatternGroup implements MatcherInterface {

            /**
             * Patterns in this group
             */
            protected _patterns: Pattern[];

            /**
             * Constructor
             * @param {string}   name     - Name of this pattern group
             * @param {Pattern}  patterns - Patterns in this group
             */
            constructor(
                protected _name: string,
                ...patterns: Pattern[],
            ) {
                this._patterns = patterns;
            }

            /**
             * Matches a row
             */
            public match(row: Row): MatchResult {
                const result: MatchResult = {
                        'isMatch': false,
                        'text': '',
                        'terminate': false,
                    },
                    matchText: string[] = [ ];

                for (const pattern of this._patterns) {
                    const patternResult: MatchResult = pattern.match(row);
                    result.isMatch = result.isMatch || patternResult.isMatch;
                    if (patternResult.isMatch) {
                        matchText.push(patternResult.text);
                        if (patternResult.terminate) {
                            result.terminate = true;
                            break;
                        }
                    }
                }

                result.text = this._name + ' (' + matchText.join(', ') + ')';
                return result;
            }

        }

    }

}
