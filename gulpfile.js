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
  svgo = require('gulp-svgo'),

  notify = require('gulp-notify');

// Set paths
var dist = 'dist/';
var path = {
  css: {
    src: 'sass/**/*.scss',
    dist: dist + 'css'
  },
  webpack: {
    main: 'js/main.js',
    src: 'js/**/*.js',
    dist: dist + 'js'
  },
  polyFills: {
    src: 'js/polyfills/*.js',
    dist: dist + 'polyfills'
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

/* CSS develop task */
gulp.task('css:develop', function () {
  gulp.src([path.css.src])

  // Sass Compilation
    .pipe(sass())
    .on('error', err => notify({
      message: '\n\n🐙\nError: <%= error.message %> ',
      sound: false // deactivate sound?
    }).write(err))

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
    .pipe(browserSync.stream())
    .pipe(notify('Styles complete 🚀'));
});

/* CSS production task */
gulp.task('css:production', function () {
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
  gulp.src(path.webpack.main)
    .pipe(webpack(webpackConfig.develop))
    .pipe(gulp.dest(path.webpack.dist))
    .pipe(notify('Webpack task complete🚀'));
});

gulp.task('webpack:production', function () {
  gulp.src(path.webpack.main)
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

gulp.task('copyPolyFills', function () {
  gulp.src(path.polyFills.src)
    .pipe(gulp.dest(path.polyFills.dist));
});

/* Browsersync task */
gulp.task('browsersync', function () {
  browserSync.init({
    watchTask: true,
    proxy: 'kulturspital.ch.docker.amazee.io/',
    browser: [],
    reloadOnRestart: false,
    notify: false
  });
});


/* Watch task */
gulp.task('watch', function () {
  gulp.watch(path.css.src, ['css:develop']);
  gulp.watch(path.polyFills.src, ['copyPolyFills']);
  gulp.watch(path.webpack.src, ['webpack:develop']).on('change', browserSync.reload);
  gulp.watch(path.vulcanize.src, ['vulcanize']).on('change', browserSync.reload);
  gulp.watch(path.svg.src, ['svg']).on('change', browserSync.reload);
});

/* Modernizr task */
gulp.task('modernizr', function () {
  gulp.src(path.webpack.src)
    .pipe(modernizr({
      'options': [
        "setClasses",
      ],
      'tests': ['touchevents'],
    }))
    .pipe(gulp.dest(path.modernizr.dist))
});

var defaultTasks = [
  'vulcanize',
  'svg',
];

var productionTasks = [
  'css:production',
  'webpack:production',
  'modernizr',
  'copyPolyFills',
];

var developTasks = [
  'css:develop',
  'webpack:develop',
  'watch',
  'browsersync',
  'copyPolyFills',
];

/* Develop task */
gulp.task('develop', defaultTasks.concat(developTasks));

/* Production task */
gulp.task('default', defaultTasks.concat(productionTasks));
