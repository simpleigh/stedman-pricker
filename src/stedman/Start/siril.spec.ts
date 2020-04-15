/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import { rounds, Stage } from '../../rows';
import { AbstractMethod, Stedman, StedmanJump, Carter } from '../methods';
import SixType from '../SixType';
import SixTypeMap from '../SixTypeMap';
import Start from '.';

describe('siril template for Start', () => {

    type StartPosition = [SixType, string[]];

    const startPositions: StartPosition[] = [
        [SixType.Slow, [
            '', // Aligns array indices with rowIndex
            '+3.1.3.1.3',
            '+1.3.1.3',
            '+3.1.3',
            '+1.3',
            '+3',
            '+',
        ]],
        [SixType.Quick, [
            '', // Aligns array indices with rowIndex
            '+1.3.1.3.1',
            '+3.1.3.1',
            '+1.3.1',
            '+3.1',
            '+1',
            '+',
        ]],
        [SixType.Cold, [
            '', // Aligns array indices with rowIndex
            "'231547698E0', '231547698E0', '231547698E0', '231547698E0', '231547698E0'", // eslint-disable-line max-len
            "'231547698E0', '231547698E0', '231547698E0', '231547698E0'",
            "'231547698E0', '231547698E0', '231547698E0'",
            "'231547698E0', '231547698E0'",
            "'231547698E0'",
            '',
        ]],
        [SixType.Hot, [
            '', // Aligns array indices with rowIndex
            "'312547698E0', '312547698E0', '312547698E0', '312547698E0', '312547698E0'", // eslint-disable-line max-len
            "'312547698E0', '312547698E0', '312547698E0', '312547698E0'",
            "'312547698E0', '312547698E0', '312547698E0'",
            "'312547698E0', '312547698E0'",
            "'312547698E0'",
            '',
        ]],
        [SixType.Four, [
            '', // Aligns array indices with rowIndex
            '+3.1.3',
            '+1.3',
            '+3',
            '+',
        ]],
        [SixType.Eight, [
            '', // Aligns array indices with rowIndex
            '+1.3.5.3.5.3.1',
            '+3.5.3.5.3.1',
            '+5.3.5.3.1',
            '+3.5.3.1',
            '+5.3.1',
            '+3.1',
            '+1',
            '+',
        ]],
    ];

    const methodMap: SixTypeMap<new() => AbstractMethod> = {
        [SixType.Slow]:  Stedman,
        [SixType.Quick]: Stedman,
        [SixType.Cold]:  StedmanJump,
        [SixType.Hot]:   StedmanJump,
        [SixType.Four]:  Carter,
        [SixType.Eight]: Carter,
    };

    for (const [sixType, positions] of startPositions) {
        const method = new methodMap[sixType]!();
        const start = new Start(rounds(Stage.Cinques), undefined, method);
        start.sixType = sixType;

        for (let rowIndex = 1; rowIndex <= start.lastRowIndex; rowIndex += 1) {
            const expected = positions[rowIndex];

            it(`prints correctly "${expected}"`, () => {
                start.rowIndex = rowIndex;
                expect(start.print('siril')).toBe(expected);
            });
        }
    }

});
