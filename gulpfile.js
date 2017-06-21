var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    concat = require('gulp-concat'),
    compass = require('gulp-compass'),
    connect = require('gulp-connect'),
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
};

jsSources = [
    'process/scripts/scripts.js'
];

sassSources = ['process/sass/styles.scss'];

htmlSources = [outputDir + '*.html'];


gulp.task('js', function() {
    gulp.src(jsSources)
        .pipe(concat('scripts.js'))
        .pipe(browserify())
        .pipe(gulp.dest(outputDir + '/js'))
        .pipe(connect.reload())
});

gulp.task('compass', function() {
    gulp.src(sassSources)
        .pipe(compass({
            sass: 'process/sass',
            cache_location: outputDir + 'css',
            style: sassStyle
        }
        ))
        .on('error', gutil.log)
        .pipe(gulp.dest(outputDir + 'css'))
        .pipe(connect.reload())
});

gulp.task('html', function() {
    gulp.src(htmlSources)
        .pipe(connect.reload())
        });

gulp.task('watch', function() {
    gulp.watch(jsSources, ['js']);
    gulp.watch('process/sass/*.scss', ['compass']);
    gulp.watch(htmlSources, ['html']);
});

gulp.task('connect', function() {
    connect.server({
        root: outputDir,
        livereload: true
        });
    });

gulp.task('default', ['js', 'compass', 'html', 'connect', 'watch']);

