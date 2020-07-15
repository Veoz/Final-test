var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var reloadd      = browserSync.reload;
var scss         = require('gulp-sass');
var cssnano      = require('gulp-cssnano');
var rename      = require('gulp-rename');


gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
    gulp.watch("app/*.html").on("change", reloadd);
    gulp.watch("app/css/*.css").on("change", reloadd);
});


gulp.task('scss', function() {
    return gulp.src('app/scss/*.scss')
        .pipe(scss())
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}))
});
gulp.task('css-libs', function() {
    return gulp.src('app/scss/libs.scss')
        .pipe(scss())
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/css'));
});


gulp.watch('scss/*.scss', gulp.parallel('scss'));
gulp.task('default', gulp.parallel('scss', 'serve', 'css-libs'));