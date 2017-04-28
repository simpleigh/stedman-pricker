/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/* tslint:disable:max-line-length */

/// <reference path="../rowFromString.ts" />
/// <reference path="../Stage.ts" />
/// <reference path="AbstractScheme.ts" />
/// <reference path="MatchType.ts" />
/// <reference path="Pattern.ts" />
/// <reference path="PatternGroup.ts" />

namespace Pricker {
    'use strict';

    /**
     * Music classes to analyse rows
     */
    export namespace Music {

        /**
         * MBD-style music matching scheme
         */
        export class MbdScheme extends AbstractScheme {

            /* MatcherInterface methods ***************************************/

            /**
             * Provides read access to the name
             */
            public getName(): string {
                return 'MBD scheme';
            }

            /* AbstractScheme methods *****************************************/

            /**
             * Create matchers for this scheme/stage
             */
            protected createMatchers(rounds: string): MatcherInterface[] {
                const matchers: MatcherInterface[] = [ ];
                let pattern: string,
                    patternArray: Pattern[];

                // 567890E
                pattern = rounds.slice(4 - this._stage);
                matchers.push(new Pattern(pattern));

                // 56789E0
                pattern = rounds.slice(4 - this._stage, -2)
                    + rounds.slice(-1)
                    + rounds.slice(-2, -1);
                matchers.push(new Pattern(pattern));

                // 657890E
                pattern = '65' + rounds.slice(6 - this._stage);
                matchers.push(new Pattern(pattern));

                // Near misses
                patternArray = [ ];
                for (let i: number = 0; i < this._stage - 1; i += 1) {
                    pattern = rounds.slice(0, i)  // 123
                        + rounds.charAt(i + 1)    // 5
                        + rounds.charAt(i)        // 4
                        + rounds.slice(i + 2);    // 67890E
                    patternArray.push(new Pattern(
                        pattern,
                        rounds.charAt(i + 1) + rounds.charAt(i),
                        MatchType.Row,
                    ));
                }
                matchers.push(new PatternGroup('near misses', patternArray));

                // Queens music
                // tslint:disable-next-line:switch-default
                switch (this._stage) {
                    case Pricker.Stage.Triples:
                        matchers.push(new PatternGroup(
                            '468',
                            [
                                new Pattern('246', '2468'),
                                new Pattern('75346', '753468'),
                                new Pattern('1357246', 'Queens', MatchType.Row),
                                new Pattern('7531246', 'Reverse Queens', MatchType.Row),
                                new Pattern('1275346', 'Whittingtons', MatchType.Row),
                            ],
                            new Pattern('46'),
                        ));
                        break;

                    case Pricker.Stage.Caters:
                        matchers.push(new PatternGroup(
                            '680',
                            [
                                new Pattern('468', '4680'),
                                new Pattern('97568', '975680'),
                                new Pattern('135792468', 'Queens', MatchType.Row),
                                new Pattern('975312468', 'Reverse Queens', MatchType.Row),
                                new Pattern('123497568', 'Whittingtons', MatchType.Row),
                            ],
                            new Pattern('68'),
                        ));
                        break;

                    case Pricker.Stage.Cinques:
                        matchers.push(new PatternGroup(
                            '80T',
                            [
                                new Pattern('680', '680T'),
                                new Pattern('E9780', 'E9780T'),
                                new Pattern('13579E24680', 'Queens', MatchType.Row),
                                new Pattern('E9753124680', 'Reverse Queens', MatchType.Row),
                                new Pattern('531246E9780', 'Double Whittingtons', MatchType.Row),
                            ],
                            new Pattern('80'),
                        ));
                        break;

                    case Pricker.Stage.Sextuples:
                        matchers.push(new PatternGroup(
                            '0TB',
                            [
                                new Pattern('80T', '80TB'),
                                new Pattern('AE90T', 'AE90TB'),
                                new Pattern('13579EA24680T', 'Queens', MatchType.Row),
                                new Pattern('AE9753124680T', 'Reverse Queens', MatchType.Row),
                            ],
                            new Pattern('0T'),
                        ));
                        break;

                    case Pricker.Stage.Septuples:
                        matchers.push(new PatternGroup(
                            'TB',
                            [
                                new Pattern('0TB'),
                                new Pattern('CAETB'),
                                new Pattern('13579EAC24680TB', 'Queens', MatchType.Row),
                                new Pattern('CAE9753124680TB', 'Reverse Queens', MatchType.Row),
                            ],
                            new Pattern('TB'),
                        ));
                        break;
                }

                matchers.push(new PatternGroup(
                    'front LB5',
                    [
                        new Pattern('12345', '12345', MatchType.Front),
                        new Pattern('54321', '54321', MatchType.Front),
                        new Pattern('23456', '23456', MatchType.Front),
                        new Pattern('65432', '65432', MatchType.Front),
                    ],
                ));

                matchers.push(new PatternGroup(
                    'back LB5',
                    [
                        new Pattern('12345', '12345', MatchType.Back),
                        new Pattern('54321', '54321', MatchType.Back),
                        new Pattern('23456', '23456', MatchType.Back),
                        new Pattern('65432', '65432', MatchType.Back),
                    ],
                ));

                matchers.push(new PatternGroup(
                    'front LB4',
                    [
                        new Pattern('1234', '1234', MatchType.Front),
                        new Pattern('4321', '4321', MatchType.Front),
                        new Pattern('2345', '2345', MatchType.Front),
                        new Pattern('5432', '5432', MatchType.Front),
                        new Pattern('3456', '3456', MatchType.Front),
                        new Pattern('6543', '6543', MatchType.Front),
                    ],
                ));

                matchers.push(new PatternGroup(
                    'back LB4',
                    [
                        new Pattern('1234', '1234', MatchType.Back),
                        new Pattern('4321', '4321', MatchType.Back),
                        new Pattern('2345', '2345', MatchType.Back),
                        new Pattern('5432', '5432', MatchType.Back),
                        new Pattern('3456', '3456', MatchType.Back),
                        new Pattern('6543', '6543', MatchType.Back),
                    ],
                ));

                // Reverse rollups
                if (this._stage === Pricker.Stage.Triples) {
                    matchers.push(new PatternGroup('reverse rollups', [new Pattern('7654')]));
                } else {
                    patternArray = [ ];
                    for (let i: number = this._stage - 8; i >= 0; i -= 1) {
                        // reverse rounds
                        pattern = rounds.split('').reverse().join('');
                        pattern = pattern.slice(i, i + 4);
                        patternArray.push(new Pattern(pattern));
                    }
                    matchers.push(new PatternGroup('reverse rollups', patternArray));
                }

                return matchers;

            }

        }

    }

}