/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="Row.ts" />
/// <reference path="Changes.ts" />
/// <reference path="AbstractSix.ts" />
/// <reference path="Visitor/Abstract.ts" />

namespace Pricker {
    'use strict';

    /**
     * A quick six
     */
    export class Quick extends AbstractSix {

        /* AbstractBlock methods **********************************************/

        /**
         * Receives a visitor that will be called to process each row
         */
        public accept(visitor: Visitor.AbstractVisitor): this {
            const oddRow: Row = this.getFirstRow(),
                evenRow: Row = oddRow.slice();

            Changes.permute1(evenRow);

            return this.acceptHelper(
                visitor,
                oddRow,
                this.backwardRotator,
                evenRow,
                this.forwardRotator,
            );
        }

        /* PrintableMixin methods *********************************************/

        /**
         * Path for this class' templates
         */
        public readonly templatePath: string = 'Quick';

        /* AbstractSix methods ************************************************/

        /**
         * Transposes the front three bells depending upon the type of six
         */
        protected applySixTransposition(): void {
            Changes.permute3(this._end);
        }

    }

}
