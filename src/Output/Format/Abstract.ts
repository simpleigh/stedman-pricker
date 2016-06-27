/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015 Leigh Simpson. All rights reserved.
 */


import { Row, stringFromRow } from '../../rows';
import { Call } from '../../stedman';


export abstract class AbstractFormat {
    /**
     * Internal buffer of data for printing
     */
    protected _buffer: string = '';

    /**
     * Empties the internal buffer
     */
    public clearBuffer(): this {
        this._buffer = '';
        return this;
    }

    /**
     * Returns the contents of the internal buffer
     */
    public getBuffer(): string {
        return this._buffer;
    }

    /**
     * Starts a line of output
     */
    public startLine(): this {
        return this;
    }

    /**
     * Ends a line of output
     */
    public abstract endLine(): this;

    /**
     * Introduces a space between columns of output
     */
    public abstract newColumn(): this;

    /**
     * Stores text to the internal buffer
     */
    public print(text: string): this {
        this._buffer = this._buffer + text;
        return this;
    }

    /**
     * Renders a row, storing to the internal buffer
     */
    public printRow(row: Row): this {
        this._buffer = this._buffer + stringFromRow(row);
        return this;
    }

    /**
     * Renders a call, storing to the internal buffer
     */
    public abstract printCall(
        call: Call,
        index: number
    ): this;
}
