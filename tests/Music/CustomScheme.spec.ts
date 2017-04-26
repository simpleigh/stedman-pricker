/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="AbstractScheme.spec.ts" />

describe('Custom music scheme', function () {

    testAbstractSchemeImplementation(
        function () {
            const scheme: Pricker.Music.CustomScheme =
                    new Pricker.Music.CustomScheme(Pricker.Stage.Cinques);
            scheme.addMatcher(new Pricker.Music.Pattern('2314567890E'));
            return scheme;
        },
        'Custom scheme',
    );

});
