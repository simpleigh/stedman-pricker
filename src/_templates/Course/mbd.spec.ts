/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import Course from '../../Course';
import stringFromRow from '../../stringFromRow';
import { createTestRow } from '../../testFunctions.spec';

describe('mbd template for Course', () => {

    it('renders a course correctly', () => {
        const course = Course.fromString(createTestRow(), 's2 3 (4)');
        expect(course.print('mbd')).toBe(''
            + '<u>2314567890E</u><br />'
            + course.getSix(1).print('mbd')
            + course.getSix(2).print('mbd')
            + course.getSix(3).print('mbd')
            + course.getSix(4).print('mbd', {'underline': true}),
        );
    });

    it('can print extra sixes after the pricker', () => {
        const course = new Course(createTestRow()),
            extraSixes = course.clone();

        course.setLength(2);
        extraSixes.setLength(2);

        expect(course.print('mbd', {'extraSixes': extraSixes})).toBe(''
            + '<u>2314567890E</u><br />'
            + course.getSix(1).print('mbd')
            + course.getSix(2).print('mbd', {'underline': true})
            + '<span class="extraSix">'
            + stringFromRow(extraSixes.getSix(1).getEnd())
            + '</span><br />'
            + '<span class="extraSix">'
            + stringFromRow(extraSixes.getSix(2).getEnd())
            + '</span><br />',
        );
    });

    it('can display a six head as well as a six end', () => {
        const course = new Course(createTestRow()),
            extraSixes = course.clone();

        course.setLength(2);
        extraSixes.setLength(2);

        expect(course.print('mbd', {
            'extraSixes': extraSixes,
            'showSixHeads': true,
        })).toBe(''
            + '<u>2314567890E</u><br />'
            + course.getSix(1).print('mbd', {'showSixHeads': true})
            + course.getSix(2).print('mbd', {
                'showSixHeads': true,
                'underline': true,
            })
            + '<span class="extraSix">'
            + stringFromRow(extraSixes.getSix(1).getHead())
            + '<br /><u>'
            + stringFromRow(extraSixes.getSix(1).getEnd())
            + '</u></span><br />'
            + '<span class="extraSix">'
            + stringFromRow(extraSixes.getSix(2).getHead())
            + '<br /><u>'
            + stringFromRow(extraSixes.getSix(2).getEnd())
            + '</u></span><br />',
        );
    });

});