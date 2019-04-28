import { testAbstractMatcherImplementation } from '../AbstractMatcher.spec';
import MatchType from '../MatchType';
import Pattern from '../Pattern';
import OneOnlyMatcherSet from './OneOnlyMatcherSet';

describe('OneOnlyMatcherSet', () => {

    let matchers: Pattern[];

    let set: OneOnlyMatcherSet;

    beforeEach(() => {
        matchers = [
            new Pattern('1234', undefined, MatchType.Front),
            new Pattern('5678'),
        ];
        set = new OneOnlyMatcherSet(matchers);
    });

    it('provides access to the matchers', () => {
        expect(set.matchers).toEqual(matchers);
    });

    it('ignores changes to the returned matchers array', () => {
        set.matchers.slice(1);
        expect(set.matchers).toEqual(matchers);
    });

    it('matches the first pattern', () => {
        expect(set.match('1234xxxx')).toBe(true);
        expect(set.matchers[0].matchCount).toBe(1);
    });

    it("matches the second pattern if the first doesn't match", () => {
        expect(set.match('xxxx5678')).toBe(true);
        expect(set.matchers[1].matchCount).toBe(1);
    });

    it('skips matching the second pattern if the first has matched', () => {
        expect(set.match('12345678')).toBe(true);
        expect(set.matchers[1].matchCount).toBe(0);
    });

    it('reports the count correctly when matching the first pattern', () => {
        set.match('1234xxxx');
        expect(set.matchCount).toBe(1);
    });

    it('reports the count corerctly when matching the second pattern', () => {
        set.match('xxxx5678');
        expect(set.matchCount).toBe(1);
    });

    it('reports the count correctly when matching both patterns', () => {
        set.match('12345678');
        expect(set.matchCount).toBe(1);
    });

    testAbstractMatcherImplementation(
        () => new OneOnlyMatcherSet([new Pattern('890E')], 'test'),
    );

});
