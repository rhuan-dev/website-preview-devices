// gulp
const {src, dest, parallel, series, watch} = require('gulp');

// css plugins
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sassGlob = require('gulp-sass-glob');
const cleanCSS = require('gulp-clean-css');

// images
const imagemin = require("gulp-imagemin");


// js plugins
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');

// utilities
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const merge = require('merge-stream');
const browserSync = require('browser-sync').create();

// general variables
const proxy = 'http://localhost/apresentacao';

/**
 * Browser Sync reload
 */
function browserSyncReload(done) {
    browserSync.reload();
    done();
}

/**
 Compile CSS
 */
const sassNodePlugins = [
    'node_modules/owl.carousel/dist/assets/owl.carousel.min.css'
];

const sassFiles = [
    'sass/**/*.scss'
];

function css() {
    // nodep lugins
    // const pluginsStream = src(sassNodePlugins);

    //sass files to merge
    const sassStream = src(sassFiles)
        .pipe(plumber())
        .pipe(sassGlob())
        .pipe(sass.sync({outputStyle: 'nested'}).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(browserSync.stream());

    return merge(sassStream)
        .pipe(concat('style.css'))
        .pipe(cleanCSS({
            level: {
                1: {
                    specialComments: 1
                }
            }
        }))
        .pipe(dest('assets/css'));
}

/**
 * Compile JS
 */
const jsFiles = [
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/gsap/src/minified/TweenMax.min.js',
    'assets/js/functions.js'
];

function js() {
    return src(jsFiles)
        .pipe(concat('bundle.js'))
        .pipe(dest('assets/js/dist'))
        .pipe(rename('bundle.min.js'))
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(uglify())
        .pipe(dest('assets/js/dist'))
        .pipe(browserSync.stream());
}

/**
 * Image optimize
 */
const imagesFiles = [
    "assets/images/**/*"
];

function images() {
    return src(imagesFiles)
        .pipe(
            imagemin([
                imagemin.gifsicle({interlaced: true}),
                imagemin.jpegtran({progressive: true}),
                imagemin.optipng({optimizationLevel: 5}),
                imagemin.svgo({
                    plugins: [
                        {
                            removeViewBox: false,
                            collapseGroups: true
                        }
                    ]
                })
            ])
        )
        .pipe(dest("assets/images/dist"));
}

/**
 * Browser sync
 */
function browserSyncServer(done) {
    browserSync.init({
        proxy: proxy,
        open: false,
        notify: false,
        injectChanges: true
    });

    done();
}

/**
 * Watch files
 */
const filesToWatch = [
    'assets/images/**',
    'assets/js/dist/**',
    '*.php'
];


function watchFiles() {
    watch(sassFiles, {usePolling: true}, css);

    watch(jsFiles, {usePolling: true}, js);

    watch(filesToWatch, series(browserSyncReload));
}

/**
 * Complex task
 * @type {function(): *}
 */
const server = parallel(browserSyncServer, series(js, css, watchFiles));
const build = series(js, css, images);

/**
 * Exports tasks
 * @type {function(): *}
 */
exports.css = css;
exports.js = js;
exports.images = images;
exports.build = build;
exports.server = server;
exports.default = server;