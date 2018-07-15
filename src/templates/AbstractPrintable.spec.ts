/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import * as Templates from '.';
import { Context } from './types';

describe('Printable implementation', () => {

    const templates = {
        'templateOne': jasmine.createSpy().and.returnValue('one'),
        'templateTwo': jasmine.createSpy().and.returnValue('two'),
    };

    @Templates.makePrintable(templates, { 'compile': 'compile-time context' })
    class Printable implements Templates.Interface {
        public print: Templates.Print;
    }

    let printable: Printable;

    beforeEach(() => {
        templates.templateOne.calls.reset();
        templates.templateTwo.calls.reset();
        printable = new Printable();
    });

    const getLastContext = () =>
        templates.templateOne.calls.mostRecent().args[0];

    it('calls the correct template', () => {
        printable.print('templateOne');
        expect(templates.templateOne).toHaveBeenCalled();
        expect(templates.templateTwo).not.toHaveBeenCalled();
    });

    it('returns the template result', () => {
        expect(printable.print('templateTwo')).toBe('two');
    });

    it('passes itself to templates', () => {
        printable.print('templateOne');
        expect(getLastContext().object).toBe(printable);
    });

    it('passes compile-time context to templates', () => {
        printable.print('templateOne');
        expect(getLastContext().compile).toBe('compile-time context');
    });

    it('passes run-time context to templates', () => {
        printable.print('templateOne', { 'run': 'run-time context' });
        expect(getLastContext().run).toBe('run-time context');
    });

    it('overrides compile-time context with run-time context', () => {
        printable.print('templateOne', { 'compile': 'run-time context' });
        expect(getLastContext().compile).toBe('run-time context');
    });

    it('never overrides the object itself', () => {
        printable.print('templateOne', { 'object': 'run-time context' });
        expect(getLastContext().object).toBe(printable);
    });

    it('leaves the passed context unchanged', () => {
        const context: Context = { };
        printable.print('templateTwo');
        expect(context).toEqual({ });
    });

});
