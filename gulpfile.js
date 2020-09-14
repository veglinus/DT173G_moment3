const {src, dest, watch, series, parallel} = require("gulp");
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();

const sass = require('gulp-sass'); 
sass.compiler = require('node-sass');

const files = {
    html: "src/**/*.html",
    css: "src/**/*.css",
    sass: "src/sass/*.scss",
    js: "src/**/*.js",
    imgs: "src/imgs/*"
}
// Kopierar över HTML filer
function copyhtml() {
    return src(files.html)
        .pipe(dest('pub'))
}
// Minifiera och sammanslår JS
function minifyJS() {
    return src(files.js)
        //.pipe(concat("main.js"))
        //.pipe(uglify())
        .pipe(dest('pub/js')
        )
}
// Minifiera och sammanslå CSS
/*
function minifyCSS() {
    return src(files.css)
    .pipe(concat("styles.css"))
    .pipe(cleanCSS())
    .pipe(dest('pub/css')
    )
}*/


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
    watch(files.html).on("change", browserSync.reload);
    watch([files.html, files.js, files.css, files.sass, files.imgs], parallel(sassTask, copyhtml, minifyJS));
}
// Default task
exports.default = series(
    parallel(sassTask, copyhtml, minifyJS),
    watchTask)