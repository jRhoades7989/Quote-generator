var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    concat = require('gulp-concat'),
    compass = require('gulp-compass'),
    browserify = require('gulp-browserify');

var jsSources = [
    'process/scripts/scripts.js'
    ];

var sassSources = ['process/sass/styles.scss'];

gulp.task('js', function() {
    gulp.src(jsSources)
        .pipe(concat('scripts.js'))
        .pipe(browserify())
        .pipe(gulp.dest('build/development/js'))
        });

gulp.task('compass', function() {
    gulp.src(sassSources)
        .pipe(compass({
            sass: 'process/sass',
            cache_location: 'build/development/css',
            style: 'expanded'
            }
        ))
        .on('error', gutil.log)
        .pipe(gulp.dest('build/development/css'))
        });

 gulp.task('default', ['js', 'compass']);
