/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="Row.ts" />
/// <reference path="Changes.ts" />
/// <reference path="Course.ts" />
/// <reference path="Stage.ts" />
/// <reference path="stringFromRow.ts" />
/// <reference path="Visitor/Abstract.ts" />

namespace Pricker {
    'use strict';

    /**
     * A touch, being a set of courses
     */
    export class Touch extends AbstractContainer<Course> {

        /* AbstractBlock methods **********************************************/

        /**
         * Receives a visitor that will be called to process each row
         */
        public accept(visitor: Visitor.AbstractVisitor): this {
            const row: Row = this._initialRow.slice();

            Changes.permute1(row);  // Go backwards one change from _initialRow
            visitor.visit(row);
            visitor.visit(this._initialRow);

            return super.accept(visitor);
        }

        /**
         * Path for this class' templates
         */
        public readonly templatePath: string = 'Touch';

        /* AbstractContainer methods ******************************************/

        /**
         * Returns the default length of new containers of this type
         *
         * Derived classes should override this method if required.
         */
        protected getDefaultLength(initialRow: Row): number {
            return 0;
        }

        /**
         * Creates a new block for the container
         *
         * Used by extend() when creating the container or increasing its
         * length.
         * @param {Row}     initialRow - initial row for the block
         * @param {number}  index      - index of block in container
         */
        protected createBlock(initialRow: Row, index: number): Course {
            return new Course(initialRow, this, index);
        }

        /**
         * Returns the limits on length for the particular concrete class
         *
         * minimum, maximum
         */
        protected getLengthLimits(): [number, number] {
            return [0, 100];
        }

        /* Touch methods ******************************************************/

        /**
         * Read access to courses
         */
        public getCourse(index: number): Course {
            return this.getBlock(index);
        }

        /**
         * Inserts a course at the specified index
         */
        public insertCourse(index: number, course: Course): this {
            this._blocks.splice(index - 1, 0, course);
            this.fixupOwnership(index);

            this.notify(index - 1);
            return this;
        }

        /**
         * Deletes the course at the specified index
         */
        public deleteCourse(index: number): Course {
            const course: Course = this.getBlock(index);

            this._blocks.splice(index - 1, 1);
            course.clearOwnership();
            this.fixupOwnership(index);

            this.notify(index - 1);
            return course;
        }

        /**
         * Helper to fixup ownership of blocks
         */
        private fixupOwnership(index: number): void {
            for (let i: number = index; i <= this.getLength(); i++) {
                this.getCourse(i).setOwnership(this, i);
            }
        }

        /**
         * Creates a new touch from a string representation
         */
        public static fromString(input: string): Touch {
            const inputLines: string[] = input.split('\n'),
                processedLines: string[] = [ ];

            let i: number,
                inputLine: string,
                firstLine: string | undefined,
                course: Course,
                touch: Touch;

            // Process each input line, making text substitutions
            for (i = 0; i < inputLines.length; i++) {
                inputLine = inputLines[i];

                // Drop any content after comment characters "//"
                inputLine = inputLine.replace(/\/\/.*$/, '');

                // Ignore a microsiril comment "/" at the start of a line
                inputLine = inputLine.replace(/^\//, '');

                // Skip this line if it's blank
                if (/^\s*$/.test(inputLine)) {
                    continue;
                }

                processedLines.push(inputLine);
            }

            // Create the touch with a stage based on the first line
            firstLine = processedLines.shift();
            if (!firstLine) {
                throw new Error('No input lines');
            }
            firstLine.replace(/\s/g, '');
            if (!Stage[firstLine.length]) {
                throw new Error('Cannot recognise stage');
            }
            touch = new Touch(rowFromString('231', firstLine.length));

            // Create a course for each remaining line
            for (i = 0; i < processedLines.length; i++) {
                course = Course.fromString(touch.getEnd(), processedLines[i]);
                touch.insertCourse(touch.getLength() + 1, course);
            }

            return touch;
        }
    }
}
