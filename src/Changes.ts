/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="Bell.ts" />
/// <reference path="Row.ts" />

namespace Pricker {
    'use strict';

    /**
     * Simple functions to permute rows
     */
    export namespace Changes {

        /**
         * Helper function to swap two bells
         */
        function swapPair(row: Row, index: number): void {
            let bell: Bell;

            bell = row[index];
            row[index] = row[index + 1];
            row[index + 1] = bell;
        }

        /**
         * Notation <1>
         */
        export function permute1(row: Row): void {
            let index: number;

            for (index = 1; index < row.length - 1; index += 2) {
                swapPair(row, index);
            }
        }

        /**
         * Notation <3>
         */
        export function permute3(row: Row): void {
            let index: number;

            swapPair(row, 0);

            for (index = 3; index < row.length - 1; index += 2) {
                swapPair(row, index);
            }
        }

        /**
         * Notation <n>
         */
        export function permuteN(row: Row): void {
            let index: number;

            for (index = 0; index < row.length - 1; index += 2) {
                swapPair(row, index);
            }
        }

    }
}
