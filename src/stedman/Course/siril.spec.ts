/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import Course from '.';
import { createTestRow } from '../../testFunctions.spec';

describe('siril template for Course', () => {

    it('renders a course correctly', () => {
        const course = Course.fromString(createTestRow(), 's2 3 (4)');
        expect(course.print('siril')).toBe(
            'plain, slow, single, quick, bob, slow, plain, quick, "@  '
                + course.print('text', { courseEnd: false })
                + '"\n',
        );
    });

    const EXPECTED_OUTPUTS: string[] = [
        '',  // length zero not tested
        'plain, ',
        'plain, +3, ',
        'plain, +3.1, ',
        'plain, +3.1.3, ',
        'plain, +3.1.3.1, ',
        'plain, slow, ',
        'plain, slow, single, ',
        'plain, slow, single, +1, ',
        'plain, slow, single, +1.3, ',
        'plain, slow, single, +1.3.1, ',
        'plain, slow, single, +1.3.1.3, ',
        'plain, slow, single, quick, ',
        'plain, slow, single, quick, bob, ',
        'plain, slow, single, quick, bob, +3, ',
        'plain, slow, single, quick, bob, +3.1, ',
        'plain, slow, single, quick, bob, +3.1.3, ',
        'plain, slow, single, quick, bob, +3.1.3.1, ',
        'plain, slow, single, quick, bob, slow, ',
        'plain, slow, single, quick, bob, slow, plain, ',
        'plain, slow, single, quick, bob, slow, plain, +1, ',
        'plain, slow, single, quick, bob, slow, plain, +1.3, ',
        'plain, slow, single, quick, bob, slow, plain, +1.3.1, ',
        'plain, slow, single, quick, bob, slow, plain, +1.3.1.3, ',
        'plain, slow, single, quick, bob, slow, plain, quick, ',
    ];

    it('stops rendering based on the remaining rows in the touch', () => {
        const course = Course.fromString(createTestRow(), 's2 3 (4)');
        for (let i = 1; i < EXPECTED_OUTPUTS.length; i += 1) {
            expect(course.print('siril', { touchRows: i }))
                .toBe(EXPECTED_OUTPUTS[i] + '"@  s2 3  (4 sixes)"\n');
        }
    });

});
