/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-19 Leigh Simpson. All rights reserved.
 */

import AbstractMatcher from './AbstractMatcher';
import AbstractScheme from './AbstractScheme';
import MatchType from './MatchType';
import Pattern from './Pattern';
import PatternGroup from './PatternGroup';

/**
 * Reverses a string
 * @param {string} str - String to reverse.
 * @returns {string} reversed version of `str`.
 */
const reverse = (str: string) => str.split('').reverse().join('');

/**
 * Runs-based music matching scheme.
 */
class RunsScheme extends AbstractScheme {

    /* AbstractMatcher methods ************************************************/

    /**
     * Provides read access to the name..
     */
    public readonly name: string = 'Runs-based scheme';

    /* AbstractScheme methods *************************************************/

    /**
     * Create matchers for this scheme/stage.
     */
    protected createMatchers(rounds: string): AbstractMatcher[] {
        const matchers: AbstractMatcher[] = [ ];

        matchers.push(new Pattern(reverse(rounds), 'Reverse rounds'));

        // Loop over possible run lengths
        // Start with longer runs as they're more interesting.
        // Ignore rounds and the `n - 1` bell run (also rounds).
        // Ignore runs involving fewer than four bells.
        for (let run = this._stage - 2; run >= 4; run = run - 1) {
            const front: Pattern[] = [ ];
            const back: Pattern[] = [ ];

            // Slice rounds at different points to generate all possible runs
            for (let index = 0; index <= this._stage - run; index = index + 1) {
                const pattern = rounds.slice(index, index + run);
                const revPattern = reverse(pattern);

                front.push(
                    new Pattern(pattern, pattern, MatchType.Front),
                    new Pattern(revPattern, revPattern, MatchType.Front),
                );
                back.push(
                    new Pattern(pattern, pattern, MatchType.Back),
                    new Pattern(revPattern, revPattern, MatchType.Back),
                );
            }

            matchers.push(
                new PatternGroup(`front ${run}-runs`, front),
                new PatternGroup(`back ${run}-runs`, back),
            );
        }

        return matchers;
    }

}

export default RunsScheme;
