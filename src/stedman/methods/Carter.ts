/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import { Row } from '../../rows';
import Course from '../Course';
import { AbstractSix, Eight, Four } from '../sixes';
import SixType from '../SixType';
import AbstractMethod from './AbstractMethod';

/**
 * Carter-specific functionality
 */
class Carter extends AbstractMethod {

    /**
     * Method name
     */
    public readonly name: string = 'Carter';

    /**
     * Creates a new six for use in a course
     * @param initialRow  initial row for the six
     * @param course      course that will own the six
     * @param index       index of six in the course
     */
    public createSix(
        initialRow: Row,
        course: Course,
        index: number,
    ): AbstractSix {
        const offset = course.firstSixType === SixType.Four ? 0 : 1;
        return (offset + index) % 2
            ? new Four(initialRow)
            : new Eight(initialRow);
    }

    /**
     * Mapping from each valid six type to its successor
     */
    protected readonly sixTypeProgression: Partial<Record<SixType, SixType>> = {
        [SixType.Four]: SixType.Eight,
        [SixType.Eight]: SixType.Four,
    };

    /**
     * First six in a standard course
     */
    public readonly defaultFirstSix: SixType = SixType.Four;

    /**
     * Type of six for standard start
     */
    public readonly defaultStartSixType: SixType = SixType.Eight;

    /**
     * Index of rounds within six for standard start
     */
    public readonly defaultStartRowIndex: number = 8;

}

export default Carter;
