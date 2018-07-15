/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import { Context, Printable, Templates } from './types';

/**
 * Internal implementation of print functionality.
 */
abstract class AbstractPrintable implements Printable {

    /**
     * Renders the object with a template.
     * Takes the name of the template and a [[Context]], adding the object
     * instance to the context before executing the template.
     */
    public print(name: string, context: Context = { }): string {
        return this.templates[name]({
            ...context,
            'object': this,
        });
    }

    /**
     * Collection of templates used by a particular class.
     */
    public abstract readonly templates: Templates;

}

export default AbstractPrintable;