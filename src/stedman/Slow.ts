/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import * as Templates from '../templates';
import { AbstractVisitor } from '../visitors';
import AbstractSix from './AbstractSix';
import mbd from './AbstractSix/mbd.dot';
import siril from './AbstractSix/siril.dot';
import Call from './Call';
import * as Changes from './Changes';
import SixType from './SixType';

/**
 * A slow six
 */
@Templates.makePrintable({ mbd, siril }, { Call, type: 'slow' })
class Slow extends AbstractSix {

    /**
     * Type of the six
     */
    public readonly type: SixType = SixType.Slow;

    /**
     * Notation (excluding call)
     */
    public readonly notation: string[] = ['3', '1', '3', '1', '3'];

    /* AbstractBlock methods **************************************************/

    /**
     * Receives a visitor that will be called to process each row
     */
    public accept(...visitors: AbstractVisitor[]): this {
        const row = this.initialRow;

        for (const visitor of visitors) {
            Changes.permuteCall(row, this._call);
            visitor.visit(row, this);

            Changes.permute3(row);
            visitor.visit(row, this);

            Changes.permute1(row);
            visitor.visit(row, this);

            Changes.permute3(row);
            visitor.visit(row, this);

            Changes.permute1(row);
            visitor.visit(row, this);

            visitor.visit(this._end, this);
        }

        return this;
    }

    /* AbstractSix methods ****************************************************/

    /**
     * Transposes the front three bells depending upon the type of six
     */
    protected applySixTransposition(): void {
        Changes.permute1(this._end);
    }

}

export default Slow;