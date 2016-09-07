'use strict';

// Require all modules
var gulp = require('gulp'),
  util = require('gulp-util'),
  //fs            = require('fs'),
  colors = require('colors'),
  // CSS
  sass = require('gulp-sass'),
  postcss = require('gulp-postcss'),
  scss = require('postcss-scss'),
  autoprefixer = require('autoprefixer'),
  pxtorem = require('postcss-pxtorem'),
  calc = require('postcss-calc'),
  // JS
  webpack = require('gulp-webpack'),
  // Polymer
  vulcanize = require('gulp-vulcanize'),
  // Sync
  browserSync = require('browser-sync'),
  // Modernizr
  modernizr = require('gulp-modernizr'),
  // SVG
  svgo = require('gulp-svgo');

// Set paths
var dist = 'dist/';
var path = {
  css: {
    src: 'sass/**/*.scss',
    dist: dist + 'css'
  },
  webpack: {
    src: 'js/main.js',
    dist: dist + 'js'
  },
  vulcanize: {
    src: 'polymer/index.html',
    dist: dist + 'polymer'
  },
  svg: {
    src: 'images/**/*.svg',
    dist: dist + 'images'
  },
  favicons: {
    src: 'favicon.svg',
    dist: dist + 'icons'
  },
  modernizr: {
    dist: dist + 'js'
  }
};

var webpackConfig = require('./webpack.config.js');

/* CSS task */
gulp.task('css', function () {
  gulp.src([path.css.src])

  // Sass Compilation
    .pipe(sass({
      errLogToConsole: true
    }))

    // PostCSS tasks after Sass compilation
    .pipe(postcss([
      autoprefixer({
        browsers: [
          '> 1%',
          'last 2 versions'
        ]
      }),
      pxtorem({
        propWhiteList: [],
        rootValue: 16,
      }),
      calc
    ]))

    .pipe(gulp.dest(path.css.dist))
    .pipe(browserSync.stream());
});

/* Polymer task */
gulp.task('vulcanize', function () {
  gulp.src(path.vulcanize.src)
    .pipe(vulcanize())
    .pipe(gulp.dest(path.vulcanize.dist));
});

/* Favicon task */
gulp.task('favicons', function () {
  // @TODO: gulp-favicons is shit. Create our own Gulp plugin.
  gulp.src(path.favicons.src)
    .pipe(gulp.dest(path.favicons.dist));
});

/* Polymer task */
gulp.task('vulcanize', function () {
  gulp.src(path.vulcanize.src)
    .pipe(vulcanize())
    .pipe(gulp.dest(path.vulcanize.dist));
});

/* Webpack task */
gulp.task('webpack:develop', function () {
  gulp.src(path.webpack.src)
    .pipe(webpack(webpackConfig.develop))
    .pipe(gulp.dest(path.webpack.dist));
});

gulp.task('webpack:production', function () {
  gulp.src(path.webpack.src)
    .pipe(webpack(webpackConfig.production))
    .pipe(gulp.dest(path.webpack.dist));
});

/* SVG task */
gulp.task('svg', function () {
  gulp.src(path.svg.src)
    .pipe(svgo({
      plugins: [
        {
          removeDimensions: true
        }, {
          removeAttrs: {
            attrs: ['id']
          }
        }
      ]
    }))
    .pipe(gulp.dest(path.svg.dist));
});

/* Browsersync task */
gulp.task('browsersync', function () {
  browserSync.init({
    watchTask: true,
    proxy: 'fischer-architekten.ch.docker.amazee.io',
    browser: [],
    reloadOnRestart: false,
    notify: false
  });
});


/* Watch task */
gulp.task('watch', function () {
  gulp.watch(path.css.src, ['css']);
  gulp.watch(path.webpack.src, ['webpack']).on('change', browserSync.reload);
  gulp.watch(path.vulcanize.src, ['vulcanize']).on('change', browserSync.reload);
  gulp.watch(path.svg.src, ['svg']).on('change', browserSync.reload);
});

/* Modernizr task */
gulp.task('modernizr', function() {
  gulp.src(path.webpack.src)
    .pipe(modernizr({
      'tests' : ['touchevents'],
    }))
    .pipe(gulp.dest(path.modernizr.dist))
});

var defaultTasks = [
  'css',
  'vulcanize',
  'svg',
];

var productionTasks = [
  'webpack:production',
  'modernizr',
];

var developTasks = [
  'webpack:develop',
  'watch',
  'browsersync',
];

/* Develop task */
gulp.task('develop', defaultTasks.concat(developTasks));

/* Production task */
gulp.task('default', defaultTasks.concat(productionTasks));
