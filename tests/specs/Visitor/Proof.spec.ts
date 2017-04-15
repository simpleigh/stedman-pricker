/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

describe('Proof visitor', function () {

    it('has a dictionary of row counts that starts empty', function () {
        const visitor: Pricker.Visitor.Proof = new Pricker.Visitor.Proof();

        expect(visitor.getRowCounts()).toEqual({ });
    });

    it('accumulates counts when it visits a row', function () {
        const visitor: Pricker.Visitor.Proof = new Pricker.Visitor.Proof(),
            row1: Pricker.Row =
                Pricker.rowFromString('2314567890E', Pricker.Stage.Cinques),
            row2: Pricker.Row =
                Pricker.rowFromString('3241658709E', Pricker.Stage.Cinques),
            block: Pricker.AbstractBlock =
                jasmine.createSpyObj('AbstractBlock', ['setFlag']);

        visitor.visit(row1, block);
        visitor.visit(row2, block);
        visitor.visit(row2, block);

        expect(visitor.getRowCounts()).toEqual(
            {
                '2314567890E': 1,
                '3241658709E': 2,
            },
        );
    });

    it('ignores changes to the result', function () {
        const visitor: Pricker.Visitor.Proof = new Pricker.Visitor.Proof(),
            getRowCounts: { [index: string]: number } = visitor.getRowCounts();

        getRowCounts['2314567890E'] = 5;  // Mutate the getRows result

        expect(visitor.getRowCounts()).not.toEqual(getRowCounts);
        expect(visitor.getRowCounts()).toEqual({ });
    });

    it('starts out true', function () {
        const visitor: Pricker.Visitor.Proof = new Pricker.Visitor.Proof();
        expect(visitor.isTrue()).toBe(true);
    });

    it('remains true when rows are visited', function () {
        const visitor: Pricker.Visitor.Proof = new Pricker.Visitor.Proof(),
            row: Pricker.Row =
                Pricker.rowFromString('231', Pricker.Stage.Cinques),
            block: Pricker.AbstractBlock =
                jasmine.createSpyObj('AbstractBlock', ['setFlag']);

        visitor.visit(row, block);
        expect(visitor.isTrue()).toBe(true);
    });

    it('becomes false when a row is repeated', function () {
        const visitor: Pricker.Visitor.Proof = new Pricker.Visitor.Proof(),
            row: Pricker.Row =
                Pricker.rowFromString('231', Pricker.Stage.Cinques),
            block: Pricker.AbstractBlock =
                jasmine.createSpyObj('AbstractBlock', ['setFlag']);

        visitor.visit(row, block);
        visitor.visit(row, block);
        expect(visitor.isTrue()).toBe(false);
    });

    testAbstractVisitorImplementation(
        Pricker.Visitor.Proof,
        function (
            visitor: Pricker.Visitor.Proof,
        ): { [index: string]: number } {
            return visitor.getRowCounts();
        },
    );

});
