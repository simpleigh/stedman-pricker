/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-17 Leigh Simpson. All rights reserved.
 */

/*global: require*/

'use strict';

var del = require('del'),
    fs = require('fs'),
    gulp = require('gulp'),
    karma = require('karma'),
    merge = require('merge2'),
    path = require('path'),
    plugins = require('gulp-load-plugins')();

gulp.task('default', ['test']);

var tsProject = plugins.typescript.createProject('tsconfig.json');

gulp.task('build', function () {
    var tsResult = tsProject.src()
            .pipe(plugins.tslint({formatter: 'verbose'}))
            .pipe(plugins.tslint.report({summarizeFailureOutput: true}))
            .pipe(plugins.sourcemaps.init())
            .pipe(tsProject()),
        templates = gulp.src('src/_templates/**/*.dot')
            .pipe(plugins.dotPrecompiler({
                dictionary: 'Pricker.Templates',
                varname: 'context',
            })),
        header = fs.readFileSync('header.js', 'utf8');

    return merge([
        merge(tsResult.js, templates)
            .pipe(plugins.concat('stedman-pricker.js'))
            .pipe(plugins.header(header))
            .pipe(plugins.sourcemaps.write())
            .pipe(gulp.dest('./dist'))
            .pipe(plugins.uglify({ output: { preamble: header } }))
            .pipe(plugins.rename({ extname: '.min.js' }))
            .pipe(gulp.dest('./dist')),
        tsResult.dts
            .pipe(gulp.dest('.'))
    ]);
});

gulp.task('build-tests', ['build'], function () {
    var specs,
        declarations,
        tsResult;

    specs = gulp.src(['tests/**/*.ts'])
        .pipe(plugins.tslint({formatter: 'verbose'}))
        .pipe(plugins.tslint.report({summarizeFailureOutput: true}));

    declarations = gulp.src('dist/stedman-pricker.d.ts');

    tsResult = merge([specs, declarations])
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.typescript({
            outFile: 'dist/tests.js'
        }));

    return tsResult.js
        .pipe(plugins.sourcemaps.write())
        .pipe(gulp.dest('.'));
});

gulp.task('test', ['build', 'build-tests'], function (done) {
    new karma.Server({
        configFile: path.join(__dirname, 'karma.conf.js'),
        browsers: ['PhantomJS']
    }, done).start();
});

gulp.task('test-browsers', ['build', 'build-tests'], function (done) {
    new karma.Server({
        configFile: path.join(__dirname, 'karma.conf.js')
    }, done).start();
});

gulp.task('watch', ['default'], function () {
    gulp.watch('src/**/*.ts', ['default']);
    gulp.watch('tests/**/*.ts', ['test']);
});

gulp.task('docs', function () {
    tsProject.src()
        .pipe(plugins.typedoc({
            out: 'docs/',
            name: 'Free Stedman Pricker',
            mode: 'file',
        }));
});

gulp.task('clean', function () {
    del('dist');
});
