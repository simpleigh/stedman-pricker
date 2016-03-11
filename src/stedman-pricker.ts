/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015 Leigh Simpson. All rights reserved.
 */

/**
 * Top-level namespace
 */
namespace Pricker {
    'use strict';


    /**
     * Bell number
     * 
     * n.b. Bell numbers are 1-indexed, i.e.:
     *   treble =  1
     *   eleven = 11
     */
    export type Bell = number;


    /**
     * Matches the number of bells to the name of each stage
     */
    export enum Stage {
        Triples = 7,
        Caters = 9,
        Cinques = 11,
        Sextuples = 13,
        Septuples = 15,
    }


    /**
     * Symbols to be used for bells
     */
    const BELL_SYMBOLS: string = ' 1234567890ETABC';


    /**
     * Lookup table from bell characters back to numbers
     */
    const BELL_SYMBOLS_REVERSE: any = {
        '1': 1, '2': 2, '3': 3, '4': 4, '5': 5,
        '6': 6, '7': 7, '8': 8, '9': 9, '0': 10,
        'E': 11, 'T': 12, 'A': 13, 'B': 14, 'C': 15,
    };


    /**
     * A row (permutation of bells)
     */
    export type Row = Bell[];


    /**
     * Converts a string into a row array
     */
    export function rowFromString(input: string, stage: Stage): Row {
        let bellNumber: Bell,
            bellsSeen: boolean[] = [],
            inputIndex: number,
            output: Row = [];

        input = input.toUpperCase();

        if (input.length > stage) {
            throw new Error('Row too long');
        }

        // Build a table to record when we've seen each bell
        for (bellNumber = 1; bellNumber <= stage; bellNumber += 1) {
            bellsSeen[bellNumber] = false;
        }

        for (
            inputIndex = 0;
            inputIndex < input.length && inputIndex < stage;
            inputIndex += 1
        ) {
            bellNumber = BELL_SYMBOLS_REVERSE[input[inputIndex]];

            if (bellNumber && bellNumber <= stage) {
                if (bellsSeen[bellNumber]) {
                    throw new Error('Bell repeated');
                }
                output.push(bellNumber);
                bellsSeen[bellNumber] = true;
            } else {
                throw new Error('Unknown bell');
            }
        }

        if (input.length < stage) {
            for (bellNumber = 1; bellNumber <= stage; bellNumber += 1) {
                if (!bellsSeen[bellNumber]) {
                    output.push(bellNumber);
                }
            }
        }

        return output;
    }


    /**
     * Converts a row array to a string
     */
    export function stringFromRow(row: Row): string {
        let bellCharacters: string[] = [],
            bellIndex: number;

        for (bellIndex = 0; bellIndex < row.length; bellIndex += 1) {
            bellCharacters.push(BELL_SYMBOLS[row[bellIndex]]);
        }

        return bellCharacters.join('');
    }


    /**
     * Types of call
     * @enum {number}
     */
    export enum Call {Plain = 1, Bob, Single};


    /**
     * Sixes, slow and quick
     */
    export namespace Six {

        /**
         * Base class for sixes
         */
        export abstract class AbstractSix {
            /**
             * Six end of the previous six
             */
            protected _previousSixEnd: Row;

            /**
             * Six end of this six
             */
            protected _sixEnd: Row;

            /**
             * Call used to start the six
             */
            protected _call: Call;

            /**
             * Constructs the six
             * @param {Row}  previousSixEnd    - Six end of the previous six
             * @param {Call} [call=Call.Plain] - Call used to start the six
             */
            constructor(previousSixEnd: Row, call: Call = Call.Plain) {
                this._previousSixEnd = previousSixEnd;
                this._call = call;
                this.calculateSixEnd();
            }

            /**
             * Recalculates the six end
             */
            protected calculateSixEnd(): AbstractSix {
                let n: number;
                this._sixEnd = this._previousSixEnd.slice(); // Create new array

                this.transposeFrontThree();

                // Odd places go up
                for (n = 4; n < this._sixEnd.length; n += 2) {
                    this._sixEnd[n] = this._previousSixEnd[n - 2];
                }

                // Even places go in
                for (n = 5; n < this._sixEnd.length; n += 2) {
                    this._sixEnd[n - 2] = this._previousSixEnd[n];
                }

                // Random stuff happens at the back
                n = this._sixEnd.length - 1;
                if (this._call === Call.Plain) {
                    this._sixEnd[n - 1] = this._previousSixEnd[n];
                } else {
                    this._sixEnd[n - 3] = this._previousSixEnd[n - 2];
                    if (this._call === Call.Bob) {
                        this._sixEnd[n - 1] = this._previousSixEnd[n - 1];
                        this._sixEnd[n] = this._previousSixEnd[n];
                    } else {
                        this._sixEnd[n - 1] = this._previousSixEnd[n];
                        this._sixEnd[n] = this._previousSixEnd[n - 1];
                    }
                }

                return this;
            }

            /**
             * Toggles the call type between Plain -> Bob -> Single -> Plain
             */
            public toggleCall(): Call {
                this._call = (this._call % 3) + 1;
                return this._call;
            }

            /**
             * Read access to the previous six end
             */
            public getPreviousSixEnd(): Row {
                return this._previousSixEnd.slice();
            }

            /**
             * Write access to the previous six end
             */
            public setPreviousSixEnd(row: Row): AbstractSix {
                this._previousSixEnd = row;
                this.calculateSixEnd();
                return this;
            }

            /**
             * Read access to the six end
             */
            public getSixEnd(): Row {
                return this._sixEnd.slice();
            }

            /**
             * Read access to the call
             */
            public getCall(): Call {
                return this._call;
            }

            /**
             * Write access to the call
             */
            public setCall(call: Call): AbstractSix {
                this._call = call;
                this.calculateSixEnd();
                return this;
            }

            /**
             * Transposes the front three bells depending upon the type of six
             */
            protected abstract transposeFrontThree(): AbstractSix;
        }

        /**
         * A slow six
         */
        export class Slow extends AbstractSix {
            /**
             * Transposes the front three bells depending upon the type of six
             */
            protected transposeFrontThree(): AbstractSix {
                this._sixEnd[0] = this._previousSixEnd[1];
                this._sixEnd[1] = this._previousSixEnd[3];
                this._sixEnd[2] = this._previousSixEnd[0];
                return this;
            }
        }

        /**
         * A quick six
         */
        export class Quick extends AbstractSix {
            /**
             * Transposes the front three bells depending upon the type of six
             */
            protected transposeFrontThree(): AbstractSix {
                this._sixEnd[0] = this._previousSixEnd[0];
                this._sixEnd[1] = this._previousSixEnd[1];
                this._sixEnd[2] = this._previousSixEnd[3];
                return this;
            }
        }

    }


    /**
     * A course, being a set of sixes
     */
    export class Course {
        /**
         * Course end of the previous course
         */
        protected _previousCourseEnd: Row;

        /**
         * Sixes within the course
         */
        protected _sixes: Six.AbstractSix[];

        /**
         * Constructs a plain course
         * @param {Row} previousCourseEnd - Course end of the previous course
         */
        constructor(previousCourseEnd: Row) {
            let stage: Stage = previousCourseEnd.length;

            // Set up an empty course
            this._previousCourseEnd = previousCourseEnd;
            this._sixes = [];

            // ... and extend it to the right length
            this.addSixes(stage * 2);
        }

        /**
         * Creates sixes
         * @param {number} sixes - number of sixes to create
         */
        private addSixes(sixes: number): Course {
            let index: number,
                oldLength: number = this.getLength(),
                newLength: number = oldLength + sixes,
                previousSixEnd: Row = this.getCourseEnd();

            for (index = oldLength; index < newLength; index += 1) {
                this._sixes[index] = index % 2
                    ? new Six.Quick(previousSixEnd)
                    : new Six.Slow(previousSixEnd);
                previousSixEnd = this._sixes[index].getSixEnd();
            }

            return this;
        }

        /**
         * Recalculates sixes within the course
         * @param {number} index - where to start when recalculating
         */
        private calculateSixes(index: number = 0): Course {
            let previousSixEnd: Row;

            if (index === 0) {
                previousSixEnd = this._previousCourseEnd;
            } else {
                previousSixEnd = this._sixes[index - 1].getSixEnd();
            }

            for (; index < this.getLength(); index += 1) {
                this._sixes[index].setPreviousSixEnd(previousSixEnd);
                previousSixEnd = this._sixes[index].getSixEnd();
            }

            return this;
        }

        /**
         * Read access to the previous course end
         */
        public getPreviousCourseEnd(): Row {
            return this._previousCourseEnd;
        }

        /**
         * Write access to the previous course end
         */
        public setPreviousCourseEnd(previousCourseEnd: Row): Course {
            this._previousCourseEnd = previousCourseEnd;
            this.calculateSixes();
            return this;
        }

        /**
         * Read access to the course end
         */
        public getCourseEnd(): Row {
            if (this._sixes.length) {
                return this._sixes[this._sixes.length - 1].getSixEnd();
            }

            // Handle course with zero sixes
            return this._previousCourseEnd;
        }

        /**
         * Read access to the sixes
         */
        public getSixes(): Six.AbstractSix[] {
            return this._sixes;
        }

        /**
         * Read access to the length
         */
        public getLength(): number {
            return this._sixes.length;
        }

        /**
         * Write access to the length
         */
        public setLength(sixes: number): Course {
            if ((sixes < 2) || (sixes > 60)) {
                throw new Error('Number of sixes out of range');
            }

            if (sixes > this.getLength()) {
                this.addSixes(sixes - this.getLength());
            } else {
                this._sixes = this._sixes.slice(0, sixes);
            }

            return this;
        }

        /**
         * Write access to the length: ignores out-of-range values
         */
        public safeSetLength(sixes: number): Course {
            sixes = Math.max(sixes, 2);
            sixes = Math.min(sixes, 60);
            return this.setLength(sixes);
        }

        /**
         * Through access to toggle calls
         */
        public toggleCall(six: number): Call {
            let index: number = this.indexFromSixNumber(six);
            this._sixes[index].toggleCall();
            this.calculateSixes(index);
            return this._sixes[index].getCall();
        }

        /**
         * Through read access to six ends
         */
        public getSixEnd(six: number): Row {
            let index: number = this.indexFromSixNumber(six);
            return this._sixes[index].getSixEnd();
        }

        /**
         * Through read access to calls
         */
        public getCall(six: number): Call {
            let index: number = this.indexFromSixNumber(six);
            return this._sixes[index].getCall();
        }

        /**
         * Through write access to calls
         */
        public setCall(six: number, call: Call): Course {
            let index: number = this.indexFromSixNumber(six);
            this._sixes[index].setCall(call);
            this.calculateSixes(index);
            return this;
        }

        /**
         * Converts a six number into an index and checks it's in range
         * @throws Error if it isn't in range
         */
        private indexFromSixNumber(six: number): number {
            if (six < 1 || six > this.getLength()) {
                throw new Error('Six number out of range');
            }
            return six - 1;
        }
    }


    /**
     * Objects used to render other objects
     */
    export namespace Renderer {
        export interface StringCallback {
            (sixNumber: number, sixEnd: Row, call: Call): string;
        }

        export interface Config {
            callSymbols?: string[];
            sixTemplate?: string;
            sixSeparator?: string;
            sixCallbacks?: { [id: string]: StringCallback };
            courseTemplate?: string;
        }

        export interface IRenderer {};

        export class TextRenderer implements IRenderer {
            protected _config: Config = {
                callSymbols: function (): string[] {
                    let result: string[] = [];
                    result[Call.Plain] = ' ';
                    result[Call.Bob] = '-';
                    result[Call.Single] = 's';
                    return result;
                }(),
                sixTemplate: '{call} {sixEnd}',
                sixSeparator: '\n',
                sixCallbacks: {},
                courseTemplate: '{sixes}',
            };

            constructor(config: Config = {}) {
                // TODO: override config
            }

            public render(course: Course): string {
                let six: number,
                    data: { [id: string]: string },
                    key: string,
                    sixes: string[] = [];

                for (six = 1; six <= course.getLength(); six++) {
                    // Assemble an array to build the six
                    data = {
                        sixNumber: six.toString(),
                        sixEnd: stringFromRow(course.getSixEnd(six)),
                        call: this._config.callSymbols[course.getCall(six)],
                    };

                    for (key in this._config.sixCallbacks) {
                        if (this._config.sixCallbacks.hasOwnProperty(key)) {
                            data[key] = this._config.sixCallbacks[key](
                                six,
                                course.getSixEnd(six),
                                course.getCall(six)
                            );
                        }
                    }

                    sixes.push(this.interpolate(
                        this._config.sixTemplate,
                        data
                    ));
                }

                // Assemble an array to build the course
                data = {
                    sixes: sixes.join(this._config.sixSeparator),
                    courseEnd: stringFromRow(course.getCourseEnd()),
                };

                return this.interpolate(this._config.courseTemplate, data);
            }

            private interpolate(
                template: string,
                data: { [id: string]: string }
            ): string {
                let key: string,
                    pattern: RegExp,
                    result: string = template;

                for (key in data) {
                    if (data.hasOwnProperty(key)) {
                        pattern = new RegExp('{' + key + '}', 'g');
                        result = result.replace(pattern, data[key]);
                    }
                }

                return result;
            }
        }

        export class HtmlRenderer extends TextRenderer {
            protected _config: Config = {
                callSymbols: function (): string[] {
                    let result: string[] = [];
                    result[Call.Plain] = '&nbsp;';
                    result[Call.Bob] = '-';
                    result[Call.Single] = 's';
                    return result;
                }(),
                sixTemplate: ''
                    + '{sixEnd}'
                    + '&nbsp;&nbsp;'
                    + '<span class="{cls}" onclick="c({sixNumber})">'
                    + '&nbsp;{call}&nbsp;'
                    + '</span>'
                    + '&nbsp;&nbsp;'
                    + '{sixNumber}',
                sixSeparator: '<br/>',
                sixCallbacks: {
                    cls: function (
                        sixNumber: number,
                        sixEnd: Row,
                        call: Call
                    ): string {
                        return (sixNumber) % 2 ? 'oddCall' : 'evenCall';
                    },
                },
                courseTemplate: '{sixes}',
            };
        }

        export class CompositionRenderer extends TextRenderer {
            protected _config: Config = {
                callSymbols: function (): string[] {
                    let result: string[] = [];
                    result[Call.Plain] = '';
                    result[Call.Bob] = '';
                    result[Call.Single] = 's';
                    return result;
                }(),
                sixTemplate: '{call}{sixNumber}',
                sixSeparator: ' ',
                sixCallbacks: {
                    sixNumber: function (
                        sixNumber: number,
                        sixEnd: Row,
                        call: Call
                    ): string {
                        return (call === Call.Plain)
                            ? ''
                            : sixNumber.toString();
                    },
                },
                courseTemplate: '{courseEnd}  {sixes}',
            };

            public render(course: Course): string {
                let result: string = super.render(course);
                if (course.getLength() !== (course.getCourseEnd().length * 2)) {
                    result = result
                        + ' ('
                        + course.getLength().toString()
                        + ' sixes)';
                }
                return result;
            }
        }
    }


    export class Pricker {
        stage: Stage;
        startingRow: string;
        calls: Call[];
        sixes: Six.AbstractSix[];
    }
}
