/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import AbstractSix from '.';
import {
    BlockDirectory,
    BlockOwnership,
} from '../../../blocks';
import { rounds, Row, Stage, stringFromRow } from '../../../rows';
import Call from '../../Call';
import Course from '../../Course';
import Quick from '../Quick';
import Slow from '../Slow';

/**
 * Tests the template behaves like the parent version
 * @param factory  creates an instance of the object under test
 */
const testMbdAbstractSixTemplate = (
    factory: (initialRow: Row, _ownership?: BlockOwnership) => AbstractSix,
) => () => {

    describe('is derived from mbd template for AbstractSix and', () => {
        let six: AbstractSix;

        beforeEach(() => {
            six = createTestSix(1);
        });

        const createTestSix = (index: number): AbstractSix => {
            const initialRow = rounds(Stage.Cinques);
            const container: Course =
                jasmine.createSpyObj('Course', ['notify']);

            return factory(initialRow, { container, index });
        };

        it('renders a six correctly', () => {
            expect(six.print('mbd')).toRenderAs(`
                <span class="">
                    ${stringFromRow(six.getLast())}
                </span>
                &nbsp;&nbsp;
                <span class="${six.type} call" onclick="pricker.c(1)" onmousedown="return false">
                    &nbsp;&nbsp;&nbsp;
                </span>
                &nbsp;&nbsp;
                1
                <br />
            `);
        });

        it('displays bobbed sixes correctly', () => {
            six.setCall(Call.Bob);
            expect(six.print('mbd')).toRenderAs(`
                <span class="">
                    ${stringFromRow(six.getLast())}
                </span>
                &nbsp;&nbsp;
                <span class="${six.type} call" onclick="pricker.c(1)" onmousedown="return false">
                    &nbsp;-&nbsp;
                </span>
                &nbsp;&nbsp;
                1
                <br />
            `);
        });

        it('displays singled sixes correctly', () => {
            six.setCall(Call.Single);
            expect(six.print('mbd')).toRenderAs(`
                <span class="">
                    ${stringFromRow(six.getLast())}
                </span>
                &nbsp;&nbsp;
                <span class="${six.type} call" onclick="pricker.c(1)" onmousedown="return false">
                    &nbsp;s&nbsp;
                </span>
                &nbsp;&nbsp;
                1
                <br />
            `);
        });

        it('displays the index correctly', () => {
            six = createTestSix(999);
            expect(six.print('mbd')).toRenderAs(`
                <span class="">
                    ${stringFromRow(six.getLast())}
                </span>
                &nbsp;&nbsp;
                <span class="${six.type} call" onclick="pricker.c(999)" onmousedown="return false">
                    &nbsp;&nbsp;&nbsp;
                </span>
                &nbsp;&nbsp;
                999
                <br />
            `);
        });

        it('highlights sixes based on a music directory', () => {
            const music = new BlockDirectory();

            music.add(2, 1);

            expect(six.print('mbd', { music, courseIndex: 2 })).toRenderAs(`
                <span class="musicalBlock">
                    ${stringFromRow(six.getLast())}
                </span>
                &nbsp;&nbsp;
                <span class="${six.type} call" onclick="pricker.c(1)" onmousedown="return false">
                    &nbsp;&nbsp;&nbsp;
                </span>
                &nbsp;&nbsp;
                1
                <br />
            `);
        });

        it('highlights sixes based on a falseness directory', () => {
            const falseness = new BlockDirectory();

            falseness.add(2, 1);

            expect(six.print('mbd', { falseness, courseIndex: 2 })).toRenderAs(`
                <span class="falseBlock">
                    ${stringFromRow(six.getLast())}
                </span>
                &nbsp;&nbsp;
                <span class="${six.type} call" onclick="pricker.c(1)" onmousedown="return false">
                    &nbsp;&nbsp;&nbsp;
                </span>
                &nbsp;&nbsp;
                1
                <br />
            `);
        });

        it('gives priority to falseness over music', () => {
            const falseness = new BlockDirectory();
            const music = new BlockDirectory();

            falseness.add(2, 1);
            music.add(2, 1);

            expect(six.print('mbd', {
                courseIndex: 2,
                falseness,
                music,
            })).toRenderAs(`
                <span class="falseBlock">
                    ${stringFromRow(six.getLast())}
                </span>
                &nbsp;&nbsp;
                <span class="${six.type} call" onclick="pricker.c(1)" onmousedown="return false">
                    &nbsp;&nbsp;&nbsp;
                </span>
                &nbsp;&nbsp;
                1
                <br />
            `);
        });

        it('can underline a sixend', () => {
            expect(six.print('mbd', { underline: true })).toRenderAs(`
                <span class="">
                    <u>
                        ${stringFromRow(six.getLast())}
                    </u>
                </span>
                &nbsp;&nbsp;
                <span class="${six.type} call" onclick="pricker.c(1)" onmousedown="return false">
                    &nbsp;&nbsp;&nbsp;
                </span>
                &nbsp;&nbsp;
                1
                <br />
            `);
        });

        it('can display a six head as well as a six end', () => {
            expect(six.print('mbd', { showSixHeads: true })).toRenderAs(`
                <span class="">
                    ${stringFromRow(six.getFirst())}
                </span>
                &nbsp;&nbsp;
                <span class="${six.type} call" onclick="pricker.c(1)" onmousedown="return false">
                    &nbsp;&nbsp;&nbsp;
                </span>
                &nbsp;&nbsp;
                1
                <br />
                <span class="">
                    <u>
                        ${stringFromRow(six.getLast())}
                    </u>
                </span>
                <br />
            `);
        });

    });

};

describe('mbd template for Quick six', testMbdAbstractSixTemplate(
    (initialRow, _ownership) => new Quick(initialRow, _ownership),
));

describe('mbd template for Slow six', testMbdAbstractSixTemplate(
    (initialRow, _ownership) => new Slow(initialRow, _ownership),
));
