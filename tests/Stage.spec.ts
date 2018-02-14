/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-17 Leigh Simpson. All rights reserved.
 */

describe('Stage enum', () => {

    it('maps stage names to numbers of bells', () => {
        expect(Pricker.Stage.Triples).toBe(7);
        expect(Pricker.Stage.Caters).toBe(9);
        expect(Pricker.Stage.Cinques).toBe(11);
        expect(Pricker.Stage.Sextuples).toBe(13);
        expect(Pricker.Stage.Septuples).toBe(15);
    });

    it('maps numbers of bells to stage names', () => {
        expect(Pricker.Stage[7]).toBe('Triples');
        expect(Pricker.Stage[9]).toBe('Caters');
        expect(Pricker.Stage[11]).toBe('Cinques');
        expect(Pricker.Stage[13]).toBe('Sextuples');
        expect(Pricker.Stage[15]).toBe('Septuples');
    });

});
