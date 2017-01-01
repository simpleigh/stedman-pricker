/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="Abstract.spec.ts" />

describe('MBD-style format', createFormatTests(
    Pricker.Output.Format.Mbd,
    [
        ['startLine', ''],
        ['endLine', '<br />\n'],
        ['newColumn', '&nbsp;&nbsp;'],
    ],
    [
        [
            Pricker.Call.Plain,
            1,
            '<span class="oddCall" onclick="c(1)">&nbsp;&nbsp;&nbsp;</span>'
        ],
        // Test changing six number
        [
            Pricker.Call.Plain,
            3,
            '<span class="oddCall" onclick="c(3)">&nbsp;&nbsp;&nbsp;</span>'
        ],
        // Test even six rather than odd six
        [
            Pricker.Call.Plain,
            2,
            '<span class="evenCall" onclick="c(2)">&nbsp;&nbsp;&nbsp;</span>'
        ],
        [
            Pricker.Call.Bob,
            1,
            '<span class="oddCall" onclick="c(1)">&nbsp;-&nbsp;</span>'
        ],
        [
            Pricker.Call.Single,
            1,
            '<span class="oddCall" onclick="c(1)">&nbsp;s&nbsp;</span>'
        ],
    ]
));
