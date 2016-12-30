/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-16 Leigh Simpson. All rights reserved.
 */

namespace Pricker {
    'use strict';

    /**
     * A touch, being a set of courses
     */
    export class Touch extends AbstractContainer<Course> {

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
            let course: Course = this.getBlock(index);

            this._blocks.splice(index - 1, 1);
            course.setOwnership(undefined, undefined);
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
    }
}
