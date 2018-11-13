const gulp = require('gulp');
const typedoc = require('gulp-typedoc');
const clean = require('gulp-clean');

gulp.task('docs', ['docs:clean'], function () {
    return gulp.src([
        'packages/*/index.ts'
    ]).pipe(typedoc({
        name: 'TypeScript Standard Library',
        mode: 'file',
        out: 'api/',
        readme: 'none',
        excludePrivate: true,
        excludeNotExported: true,
        gaID: 'UA-129068725-1',
        tsconfig: './tsconfig.json'
    }));
});

gulp.task('docs:clean', function () {
    return gulp.src([
        './api'
    ], {
        read: false
    }).pipe(clean());
});

