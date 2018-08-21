var gulp = require('gulp'),
    sass = require('gulp-sass'),
    bro = require('browser-sync').create(),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer');


gulp.task('sass', function () {
    return gulp.src('develop/scss/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer(['last 50 versions', '> 1%', 'ie 8', 'ie 7']))
        .pipe(gulp.dest('develop/css'))
        .pipe(bro.reload({stream: true}));
});

gulp.task('cssMinify', ['sass'], function () {
    return gulp.src('develop/css/**/*.css')
        .pipe(cssnano({
            autoprefixer: {
                browsers: ['last 50 versions', '> 1%', 'ie 8', 'ie 7'],
                cascade: true,
                add: true
            }
        }))
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest('prodaction/css'));
});

gulp.task('img', function () {
    return gulp.src('develop/img/**/*.*')
        .pipe(cache(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ])))
        .pipe(gulp.dest('prodaction/img'));
});

gulp.task('browser', function () {
    bro.init({
        server: {
            baseDir: "develop"
        }
    });
});

gulp.task('clean', function () {
    return del.sync('prodaction/');
});

//запускать в ручную
gulp.task('cclean', function () {
    return cache.clearAll();
});

gulp.task('scripts',function () {
   gulp.src([
       'develop/libs/jquery/dist/jquery.min.js'
   ])
       .pipe(gulp.dest('develop/js'));
});

gulp.task('css-libs', function () {
//   надо дописать и включить в watch для взятия стилей библиотеки. Если понадобиться.
});

gulp.task('watch', ['browser','sass','scripts'], function () {
    gulp.watch('develop/scss/**/*.scss', ['sass']);
    gulp.watch('develop/*.html').on('change', bro.reload);
    gulp.watch('develop/js/**/*.js').on('change', bro.reload);
});

gulp.task('build', ['clean', 'img','cssMinify'], function () {


    let buildFonts = gulp.src('develop/fonts/**/*.*')
        .pipe(gulp.dest('prodaction/fonts'));


    let buildJS = gulp.src('develop/js/**/*.js')
        .pipe(gulp.dest('prodaction/js'));


    let buildHTML = gulp.src('develop/**/*.html')
        .pipe(gulp.dest('prodaction/'));

});


gulp.task('default', ['watch']);
