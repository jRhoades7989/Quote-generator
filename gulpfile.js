var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    concat = require('gulp-concat'),
    compass = require('gulp-compass'),
    connect = require('gulp-connect'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyHTML = require('gulp-minify-html'),
    browserify = require('gulp-browserify');

var jsSources, 
    sassSources, 
    htmlSources, 
    env, 
    sassStyle,
    outputDir;

env = process.env.NODE_ENV || 'development';

if (env === 'development') {
    outputDir = 'build/development/';
    sassStyle = 'expanded';
} else {
    outputDir = 'build/production/';
    sassStyle = 'compressed';
}

jsSources = [
    'process/scripts/jquery-3.2.1.js', 'process/scripts/scripts.js'
];

sassSources = ['process/sass/styles.scss'];

htmlSources = [outputDir + '*.html'];


gulp.task('js', function() {
    gulp.src(jsSources)
        .pipe(concat('scripts.js'))
        .pipe(browserify())
        .pipe(gulpif(env === 'production', uglify()))
        .pipe(gulp.dest(outputDir + '/js'))
        .pipe(connect.reload());
});

gulp.task('compass', function() {
    gulp.src(sassSources)
        .pipe(compass({
            css: outputDir + 'css',
            sass: 'process/sass',
            cache_location: outputDir + 'css',
            style: sassStyle,
            sourcemap: true
        }
        ))
        .on('error', gutil.log)
        .pipe(gulp.dest(outputDir + 'css'))
        .pipe(connect.reload());
});

gulp.task('html', function() {
    gulp.src('build/development/*.html')
        .pipe(gulpif(env === 'production', minifyHTML()))
        .pipe(gulpif(env === 'production', gulp.dest(outputDir)))
        .pipe(connect.reload())
        });

gulp.task('watch', function() {
    gulp.watch(jsSources, ['js']);
    gulp.watch('process/sass/*.scss', ['compass']);
    gulp.watch('build/development/*.html', ['html']);
});

gulp.task('connect', function() {
    connect.server({
        root: outputDir,
        livereload: true
        });
    });

gulp.task('default', ['js', 'compass', 'html', 'connect', 'watch']);

