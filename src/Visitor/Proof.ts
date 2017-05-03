/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="../AbstractSix.ts" />
/// <reference path="../Row.ts" />
/// <reference path="../stringFromRow.ts" />
/// <reference path="Abstract.ts" />

namespace Pricker {
    'use strict';

    /**
     * Visitor classes to traverse blocks
     */
    export namespace Visitor {

        /**
         * Proof visitor that proves touches
         */
        export class Proof extends AbstractVisitor {

            /**
             * Log of rows that we've seen
             */
            private _rowCounts:
                { [index: string]: Array<AbstractSix | undefined> };

            /**
             * Index of false blocks
             */
            private _index: Pricker.TouchIndex;

            /**
             * Flag recording truth
             */
            private _isTrue: boolean = true;

            /**
             * Constructor
             */
            constructor() {
                super();
                this._rowCounts = { };
                this._index = new Pricker.TouchIndex();
            }

            /**
             * Read access to row counts
             */
            public getRowCounts(): { [index: string]: number } {
                const result: { [index: string]: number } = { };

                for (const rowString in this._rowCounts) {
                    if (this._rowCounts.hasOwnProperty(rowString)) {
                        result[rowString] = this._rowCounts[rowString].length;
                    }
                }

                return result;
            }

            /**
             * Read access to the index
             */
            public getIndex(): Pricker.TouchIndex {
                return this._index;
            }

            /**
             * Receives a row for processing
             */
            public visitImplementation(row: Row, six?: AbstractSix): void {
                const rowString: string = stringFromRow(row);
                if (rowString in this._rowCounts) {
                    // Already seen - i.e. false
                    this._rowCounts[rowString].push(six);
                    this._isTrue = false;
                    for (const block of this._rowCounts[rowString]) {
                        if (block) {
                            this._index.add(block);
                        }
                    }
                } else {
                    // Not seen - i.e. true
                    this._rowCounts[rowString] = [six];
                }
            }

            /**
             * Checks whether the visited touch was true
             */
            public isTrue(): boolean {
                return this._isTrue;
            }
        }

    }

}
