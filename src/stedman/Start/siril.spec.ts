/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import Start from '.';
import { createTestRow } from '../../testFunctions.spec';
import SixType from '../SixType';

describe('siril template for Start', () => {

    const initialRow = createTestRow();

    type StartPosition = [SixType, string[]];

    const startPositions: StartPosition[] = [
        [SixType.Quick, [
            '', // Aligns array indices with rowIndex
            '+1.3.1.3.1',
            '+3.1.3.1',
            '+1.3.1',
            '+3.1',
            '+1',
            '+',
        ]],
        [SixType.Slow, [
            '', // Aligns array indices with rowIndex
            '+3.1.3.1.3',
            '+1.3.1.3',
            '+3.1.3',
            '+1.3',
            '+3',
            '+',
        ]],
    ];

    for (const startPosition of startPositions) {
        for (let rowIndex = 1; rowIndex <= 6; rowIndex = rowIndex + 1) {
            const sixType = startPosition[0];
            const expected = startPosition[1][rowIndex];

            it(`prints correctly "${expected}"`, () => {
                const start = new Start(initialRow);
                start.rowIndex = rowIndex;
                start.sixType = sixType;
                expect(start.print('siril')).toBe(expected);
            });
        }
    }

});
