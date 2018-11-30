'use strict';

const gulp = require('gulp');

const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
const cssnano = require('cssnano');
var cssImport = require('postcss-import');
const sourcemaps = require('gulp-sourcemaps');

const webpack = require('webpack-stream');
const browserSync = require('browser-sync');
const modernizr = require('gulp-modernizr');
const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');
const notify = require('gulp-notify');

const sassGlob = require('gulp-sass-glob');

const fractal = require('./fractal.js');
const logger = fractal.cli.console; // keep a reference to the fractal CLI console utility

// Set paths
const dist = 'dist/';
const path = {
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
    dist: dist + 'images',
  },
  favicons: {
    src: 'favicon.svg',
    dist: dist + 'icons'
  },
  modernizr: {
    dist: dist + 'js'
  }
};

const postCssDefaultConfig = [
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
];

/* CSS develop task */
function cssDevelop () {
  'use strict';

  return gulp.src([path.css.src])
    .pipe(sassGlob({ ignorePaths: ['**/email.scss'] }))
    .pipe(sass())
    .on('error', err => notify({
      message: '\n\n🐙\nError: <%= error.message %> ',
      sound: true
    }).write(err))

    // PostCSS tasks after Sass compilation
    .pipe(postcss(postCssDefaultConfig))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.css.dist))
    .pipe(browserSync.reload({stream: true}))
    .pipe(notify({
      message: 'css: <%= file.relative %> 🚀',
      onLast: true,
    }));
}

/* CSS production task */
function cssProduction () {
  const postCssProductionConfig = postCssDefaultConfig;
  postCssProductionConfig.push(
      cssnano({
        preset: ['default', {
          calc: false,
        }],
      })
  );

  postCssProductionConfig.unshift(
      cssImport({ root: './sass' })
  );

  return gulp.src([path.css.src])
  .pipe(sourcemaps.init())
  .pipe(sassGlob({ignorePaths: ['**/email.scss']}))
  .pipe(sass({
    errLogToConsole: true
  }))
  .pipe(postcss(postCssProductionConfig))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(path.css.dist));
}

/* Webpack task */
function webpackDevelop () {
  return gulp.src(path.webpack.main)
    .pipe(webpack(require('./webpack.develop.js')))
    .pipe(gulp.dest(path.webpack.dist))
    .pipe(notify('webpack: <%= file.relative %> 🚀'));
}

function webpackProduction () {
  return gulp.src(path.webpack.main)
    .pipe(webpack(require('./webpack.production.js')))
    .pipe(gulp.dest(path.webpack.dist));
}

/* SVG task */
function svg () {

  const svgSpriteConfig = {
    mode: {
      symbol: { // symbol mode to build the SVG
        render: {
          css: false, // CSS output option for icon sizing
          scss: false // SCSS output option for icon sizing
        },
        dest: 'sprite', // destination folder
        prefix: '.svg--%s', // BEM-style prefix if styles rendered
        sprite: 'sprite.svg', //generated sprite name
        example: true // Build a sample page, please!
      },

    },
    shape: {
      transform: [],
    }
  };

  return gulp.src(path.svg.src)
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
      .pipe(gulp.dest(path.svg.dist))
      .pipe(svgSprite(svgSpriteConfig))
      .pipe(gulp.dest(path.svg.dist));
}

/* Browsersync task */
function browsersync () {
  browserSync.init({
    watchTask: true,
    proxy: 'PROJECTDOMAIN.docker.amazee.io/',
    browser: [],
    reloadOnRestart: false,
    notify: false
  });
}

// BrowserSync Reload
function browserSyncReload(done) {
  browserSync.reload();
  done();
}

// Watch files
function watchFiles() {
  gulp.watch([path.components.css, path.css.src], gulp.series([cssDevelop]));
  gulp.watch(path.components.js, gulp.series([webpackDevelop], browserSyncReload));
  gulp.watch(path.webpack.src, gulp.series([webpackDevelop], browserSyncReload));
  gulp.watch(path.svg.src, gulp.series([svg]));
}

/* Modernizr task */
function modernizer () {
  return gulp.src(path.webpack.src)
    .pipe(modernizr({
      'options': [
        "setClasses",
      ],
      'tests': ['touchevents'],
    }))
    .pipe(gulp.dest(path.modernizr.dist))
}

/*
 * Start the Fractal server
 *
 * In this example we are passing the option 'sync: true' which means that it will
 * use BrowserSync to watch for changes to the filesystem and refresh the browser automatically.
 * Obviously this is completely optional!
 *
 * This task will also log any errors to the console.
 */

function fractalStart () {
  fractal.web.set('server.syncOptions', {
    ui: {
      port: 29237 // random port number to fix https://github.com/frctl/fractal/issues/87
    }
  });
  const server = fractal.web.server({
    sync: true
  });
  server.on('error', err => logger.error(err.message));
  return server.start().then(() => {
    logger.success(`Fractal server is now running at ${server.url}`);
  });
}

/*
 * Run a static export of the project web UI.
 *
 * This task will report on progress using the 'progress' event emitted by the
 * builder instance, and log any errors to the terminal.
 *
 * The build destination will be the directory specified in the 'builder.dest'
 * configuration option set above.
 */

function fractalBuild () {
  const builder = fractal.web.builder();
  builder.on('progress', (completed, total) => logger.update(`Exported ${completed} of ${total} items`, 'info'));
  builder.on('error', err => logger.error(err.message));
  return builder.build().then(() => {
    logger.success('Fractal build completed!');
  });
}

const defaultTasks = [
  svg,
];

const developTasks = [
  cssDevelop,
  webpackDevelop,
  fractalStart,
  browsersync,
  watchFiles,
];

const productionTasks = [
  cssProduction,
  webpackProduction,
  //modernizer,
  fractalBuild,
];

/* Develop task */
gulp.task('develop', gulp.parallel(defaultTasks.concat(developTasks)));

/* Production task */
gulp.task('default', gulp.parallel(defaultTasks.concat(productionTasks)));
