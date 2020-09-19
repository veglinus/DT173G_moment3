const {src, dest, watch, series, parallel} = require("gulp");
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
//const cleanCSS = require('gulp-clean-css');
const imagemin = require("gulp-imagemin");
const del = require("del");

const sass = require('gulp-sass'); 
sass.compiler = require('node-sass');

const files = {
    html: "src/**/*.html",
    css: "src/**/*.css",
    sass: "src/sass/*.scss",
    js: "src/**/*.js",
    imgs: "src/**/*.jpg"
}

// Kopierar över HTML filer
function copyhtml() {
    return src(files.html)
        .pipe(dest('pub'))
        .pipe(browserSync.stream())
}

// Minifiera och sammanslår JS
function minifyJS() {
    return src(files.js)
        .pipe(concat("main.js"))
        .pipe(uglify())
        .pipe(dest('pub/js'))
        .pipe(browserSync.stream())
}

// Minifiera och sammanslå CSS
/*
function minifyCSS() {
    return src(files.css)
    .pipe(concat("styles.css"))
    .pipe(cleanCSS())
    .pipe(dest('pub/css'))
    .pipe(browserSync.stream())
}*/

// Minifiera bilder, sänker kvalitén på dem
function minifyIMGS() {
    return src(files.imgs)
    .pipe(imagemin([
        imagemin.mozjpeg({quality: 50, progressive: true}),
        imagemin.optipng({optimizationLevel: 2})
    ]))
    .pipe(dest('pub'))
    .pipe(browserSync.stream())
}

// Tar bort pub mappen
function clean() {
    return del(["pub"]);
}


// https://elearn20.miun.se/moodle/mod/resource/view.php?id=626612
function sassTask() {
    return src("src/sass/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass()).on("error", sass.logError)
    .pipe(dest("pub/css"))
    // .pipe(sourcemaps.write())
    .pipe(browserSync.stream());
}

// Watchtask som kollar efter förändringar
function watchTask() {
    browserSync.init({
        server: {
            baseDir: "./pub"
        }
    });

    watch([files.imgs], minifyIMGS);
    watch([files.html], copyhtml);
    watch([files.js], minifyJS);
    //watch([files.css], minifyCSS);
    watch([files.sass], sassTask);
}
// Default task
exports.default = series(
    clean,
    parallel(copyhtml, minifyJS, minifyIMGS, sassTask),
    watchTask
)

exports.clean = clean;
exports.sassTask = sassTask;
exports.copyhtml = copyhtml;
exports.minifyJS = minifyJS;
//exports.minifyCSS = minifyCSS;
exports.minifyIMGS = minifyIMGS;