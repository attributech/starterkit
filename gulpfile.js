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

const fractal = require('./fractal.js');
const logger = fractal.cli.console; // keep a reference to the fractal CLI console utility

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

    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.css.dist))
    .pipe(browserSync.reload({stream: true}))
    .pipe(notify({
      message: 'css: <%= file.relative %> 🚀',
      onLast: true,
    }));
});

/* CSS production task */
gulp.task('css:production', function () {
  gulp.src([path.css.src])

  // Sass Compilation
  .pipe(sourcemaps.init())
  .pipe(sassGlob({ignorePaths: ['**/email.scss']}))
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
    proxy: 'DRUPAL-PROJECT-DOMAIN.docker.amazee.io/',
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

/*
 * Start the Fractal server
 *
 * In this example we are passing the option 'sync: true' which means that it will
 * use BrowserSync to watch for changes to the filesystem and refresh the browser automatically.
 * Obviously this is completely optional!
 *
 * This task will also log any errors to the console.
 */

gulp.task('fractal:start', function () {
  const server = fractal.web.server({
    sync: true
  });
  server.on('error', err => logger.error(err.message));
  return server.start().then(() => {
    logger.success(`Fractal server is now running at ${server.url}`);
  });
});

/*
 * Run a static export of the project web UI.
 *
 * This task will report on progress using the 'progress' event emitted by the
 * builder instance, and log any errors to the terminal.
 *
 * The build destination will be the directory specified in the 'builder.dest'
 * configuration option set above.
 */

gulp.task('fractal:build', function () {
  const builder = fractal.web.builder();
  builder.on('progress', (completed, total) => logger.update(`Exported ${completed} of ${total} items`, 'info'));
  builder.on('error', err => logger.error(err.message));
  return builder.build().then(() => {
    logger.success('Fractal build completed!');
  });
});

var defaultTasks = [
  'svg',
  'fractal:build',
];

var developTasks = [
  'css:develop',
  'webpack:develop',
  'watch',
  'browsersync',
  'fractal:start',
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
