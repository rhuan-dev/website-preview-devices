// gulp of course
const gulp = require('gulp');

// css plugins
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');

// js plugins
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');

// utilities
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const merge = require('merge-stream');

// browsersync
const browserSync = require('browser-sync').create();

/**
 * Compile Sass Files
 * @type {string[]}
 */
const pluginsFiles = [];
const sassFiles = [
    'sass/**/*.scss'
];
gulp.task('sass', function () {
    const pluginsStream = gulp.src(pluginsFiles);

    const sassStream = gulp.src(sassFiles)
        .pipe(plumber())
        .pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(browserSync.stream());

    return merge(pluginsStream, sassStream)
        .pipe(concat('style.css'))
        .pipe(cleanCss({level: {1: {specialComments: 0}}}))
        .pipe(gulp.dest('./assets/css/'));
});

/**
 * Compile JS Files
 */
const jsFiles = [
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/gsap/src/minified/TweenMax.min.js',
    'assets/js/functions.js'
];
gulp.task('js', function () {
    return gulp.src(jsFiles)
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('assets/js/dist/'))
        .pipe(rename('bundle.min.js'))
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('assets/js/dist/'));
});

/**
 * Browser Sync Server
 * @type {string[]}
 */
const browserSyncFiles = [
    'assets/images/**',
    'assets/js/dist/**',
    '*.php'
];
gulp.task('server', ['js', 'sass'], function () {
    browserSync.init({
        proxy: 'http://localhost/apresentacao',
        open: false,
        notify: false,
        injectChanges: true
    });

    gulp.watch(sassFiles, ['sass']);

    gulp.watch(jsFiles, ['js']);

    gulp.watch(browserSyncFiles).on('change', browserSync.reload);
});