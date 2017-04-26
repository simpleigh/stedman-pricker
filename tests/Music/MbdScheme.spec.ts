/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="AbstractScheme.spec.ts" />

describe('Mbd music scheme', function () {

    testAbstractSchemeImplementation(
        function () {
            return new Pricker.Music.MbdScheme(Pricker.Stage.Cinques);
        },
        'MBD scheme',
    );

});
