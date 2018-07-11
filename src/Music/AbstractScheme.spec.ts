/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import Stage from '../Stage';
import AbstractScheme from './AbstractScheme';
import { testMatcherInterface } from './MatcherInterface.spec';

/**
 * Tests that a scheme behaves as an AbstractScheme
 * @param createFn    function to create the sceme under test
 * @param schemeName  expected name of the scheme
 * @param testCases   array of tests: [stage, row, matches, output]
 */
export const testAbstractSchemeImplementation = (
    createFn: (stage?: Stage) => AbstractScheme,
    schemeName: string,
    testCases: Array<[Stage, string, number, string]>,
) => {

    describe('is derived from AbstractScheme and', () => {

        it('provides access to the matchers', () => {
            expect(createFn().getMatchers().length).toBeGreaterThan(0);
        });

        it('ignores changes to the returned matchers array', () => {
            const scheme = createFn();
            const matchers = scheme.getMatchers();
            const length = matchers.length;

            matchers.slice(1);
            expect(scheme.getMatchers().length).toBe(length);
        });

        it('matches music correctly', () => {
            for (const testCase of testCases) {
                if (!testCase) { continue; }  // IE8 trailing comma
                const stage: Stage = testCase[0];
                const rowString: string = testCase[1];
                const matches: number = testCase[2];
                const output: string = testCase[3];
                const scheme = createFn(stage);

                scheme.match(rowString);
                expect(scheme.getMatchCount()).toBe(matches);
                expect(scheme.print('text')).toBe(output);
            }
        });

        testMatcherInterface(createFn, schemeName);

    });

};