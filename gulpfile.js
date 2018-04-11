'use strict';

var gulp = require('gulp');
var util = require('gulp-util');
var colors = require('colors');

var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var scss = require('postcss-scss');
var autoprefixer = require('autoprefixer');
var pxtorem = require('postcss-pxtorem');
var calc = require('postcss-calc');
var sourcemaps = require('gulp-sourcemaps');

var webpack = require('gulp-webpack');
var vulcanize = require('gulp-vulcanize');
var browserSync = require('browser-sync');
var modernizr = require('gulp-modernizr');
var svgo = require('gulp-svgo');
var notify = require('gulp-notify');

var sassGlob = require('gulp-sass-glob');

// Set paths
var dist = 'dist/';
var path = {
  components: {
    css: 'components/**/*.scss',
    js: 'components/**/*.js'
  },
  css: {
    src: 'sass/**/*.scss',
    components: 'components/**/*.scss',
    dist: dist + 'css'
  },
  webpack: {
    main: 'js/main.js',
    src: 'js/**/*.js',
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

/* CSS develop task */
gulp.task('css:develop', function () {
  'use strict';

  gulp.src([path.css.src])

    // Sass Compilation
    .pipe(sassGlob({ ignorePaths: ['**/email.scss'] }))
    .pipe(sass())
    .on('error', err => notify({
      message: '\n\n🐙\nError: <%= error.message %> ',
      sound: false // deactivate sound?
    }).write(err))

    // PostCSS tasks after Sass compilation
    .pipe(postcss([
      autoprefixer({
        supports: false,
        grid: false,
        browsers: [
          '> 1%',
          'last 2 versions'
        ]
      }),
      pxtorem({
        propWhiteList: [],
        rootValue: 16
      }),
      calc
    ]))

    .pipe(gulp.dest(path.css.dist))
    .pipe(browserSync.reload({stream: true}))
    .pipe(notify({
      message: 'css: <%= file.relative %> 🚀',
      onLast: true,
    }));
});

gulp.src([path.css.src])

  // Sass Compilation
  .pipe(sourcemaps.init())
  .pipe(sassGlob({ ignorePaths: ['**/email.scss'] }))
  .pipe(sass({
    errLogToConsole: true
  }))

  // PostCSS tasks after Sass compilation
  .pipe(postcss([
    autoprefixer({
      supports: false,
      grid: false,
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
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(path.css.dist));

/* CSS production task */
gulp.task('css:production', function () {
});

/* Webpack task */
gulp.task('webpack:develop', function () {
  gulp.src(path.webpack.main)
    .pipe(webpack(webpackConfig.develop))
    .pipe(gulp.dest(path.webpack.dist))
    .pipe(notify('webpack: <%= file.relative %> 🚀'));
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

/* Browsersync task */
gulp.task('browsersync', function () {
  browserSync.init({
    watchTask: true,
    proxy: 'leniadam.ch.docker.amazee.io/',
    browser: [],
    reloadOnRestart: false,
    notify: false
  });
});


/* Watch task */
gulp.task('watch', function () {
  gulp.watch([path.components.css, path.css.src], ['css:develop']);

  gulp.watch(path.components.js, ['webpack:develop']).on('change', browserSync.reload);
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
  'svg',
];

var developTasks = [
  'css:develop',
  'webpack:develop',
  'watch',
  'browsersync',
];

var productionTasks = [
  'css:production',
  'webpack:production',
  'modernizr',
];


/* Develop task */
gulp.task('develop', defaultTasks.concat(developTasks));

/* Production task */
gulp.task('default', defaultTasks.concat(productionTasks));
