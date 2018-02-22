/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="../Dom/metrics.ts" />
/// <reference path="../Stage.ts" />
/// <reference path="../Templates.ts" />

namespace Pricker {

    /**
     * Prickers
     * Sadly for tslint, these will shadow the top-level namespace until I can
     * think of a better name.
     */
    // tslint:disable-next-line:no-shadowed-variable
    export namespace Pricker {

        export abstract class AbstractPricker {

            /**
             * Constructor
             */
            constructor(
                protected _iframe?: HTMLIFrameElement,
            ) {
                // NOOP
            }

            /**
             * Event handler for window.onload
             */
            public abstract onLoad(): void;

            /**
             * Resizes the parent iframe if one exists
             * May be overridden; default implementation uses elements that are
             * immediate children of the body element as follows:
             *  - width: sum of all elements' widths and margins
             *  - height: maximum of all elements' heights and margins
             */
            protected resize(): void {
                if (!this._iframe) {
                    return;
                }

                const theDoc = this._iframe.contentWindow.document;
                const elements = theDoc.body.children;
                let width = 0;
                let height = 0;

                // tslint:disable-next-line:prefer-for-of
                for (let i = 0; i < elements.length; i = i + 1) {
                    const element = elements[i] as HTMLElement;
                    width = width + Dom.getWidth(element);
                    height = Math.max(height, Dom.getHeight(element));
                }

                this._iframe.width = width + 'px';
                this._iframe.height = height + 'px';
            }

            /**
             * Wraps document.getElementById and adds type information
             */
            protected getEl<T extends HTMLElement>(id: string): T {
                const theDoc = this._iframe
                    ? this._iframe.contentWindow.document
                    : document;

                // Ignore risk elements may be null when using our own templates
                return theDoc.getElementById(id) as T;
            }

        }

    }

}
