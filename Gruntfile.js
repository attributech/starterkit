'use strict';

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  grunt.loadNpmTasks('grunt-svg2png');

  grunt.loadNpmTasks('grunt-favicons');

  // configurable paths
  var directoriesConfig = {
    src: {
      js: 'js',
      sass: 'sass',
      sassFile: 'sass/styles.scss',
      images: 'images',
      spriteFile: '../../sass/base/_sprite.scss'
    },
    dist: {
      js: 'dist/js',
      css: 'dist/css',
      cssFile: 'dist/css/styles.css',
      images: 'dist/images'
    }
  };

  grunt.initConfig({
    watch: {
      images: {
        files: 'images/*',
        // tasks: ['svg_sprite', 'notify:images']
        tasks: ['svgmin', 'notify:images']
      },
      css: {
        files: 'sass/**/*.scss',
        tasks: ['sass', 'px_to_rem', 'autoprefixer', 'notify:styles']
      },
      scripts: {
        files: ['js/**/*.js', 'bower_components/**/*.js'],
        tasks: ['webpack', 'notify:scripts']
      },
      polymer: {
        files: ['bower_components/**/*.html', 'polymer/index.html'],
        tasks: ['vulcanize']
      }
    },
    notify: {
      images: {
        options: {
          message: 'Images task complete'
        }
      },
      styles: {
        options: {
          message: 'Styles task complete'
        }
      },
      scripts: {
        options: {
          message: 'Scripts task complete'
        }
      }
    },
/*
    svg_sprite: {
      dist: {
        src: [directoriesConfig.src.images + '/*.svg'],
        dest: directoriesConfig.dist.images,
        // Target options
        options: {
          mode: {
            symbol: {
              dest: '',
              bust: false,
              sprite: 'sprite.svg',
              symbol: true,
            },
          },
        },
      },
    },
*/

    svgmin: {
      options: {
        plugins: [
          {
            removeDimensions: true
          }, {
            removeAttrs: {
              attrs: ['id']
            }
          }
        ]
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'images/',
          src: ['*.svg'],
          dest: 'dist/images/'
        }, {
          expand: true,
          cwd: '',
          src: ['logo.svg'],
          dest: 'dist/images/'
        }]
      }
    },

    svg2png: {
      all: {
        // specify files in array format with multiple src-dest mapping
        files: [
          // rasterize all SVG files in "img" and its subdirectories to "img/png"
          {src: ['favicon.svg'], dest: 'dist/images/png/'}
        ]
      }
    },

    favicons: {
      options: {
        // Task-specific options go here.
        apple: false,
        windowsTile: false
      },
      your_target: {
        // Target-specific file lists and/or options go here.
      },
      icons: {
        src: 'dist/images/png/favicon.png',
        dest: ''
      }
    },

    sass: {
      dist: {
        options: {
          style: 'expanded',
        },
        files: {
          'dist/css/styles.css': 'sass/styles.scss',
        }
      }
    },
    px_to_rem: {
      dist: {
        options: {
          base: 16,
          fallback: false,
          fallback_existing_rem: false,
          ignore: []
        },
        files: {
          'dist/css/styles.css': [directoriesConfig.dist.cssFile]
        }
      }
    },
    autoprefixer: {
      dist: {
        options: {
          browsers: ['last 2 version', '> 1%', 'ie 8']
        },
        files: {
          'dist/css/styles.css': [directoriesConfig.dist.cssFile]
        }
      }
    },
    browserSync: {
      default_options: {
        bsFiles: {
          src: [
            directoriesConfig.dist.css
          ]
        },
        options: {
          watchTask: true,
          proxy: 'STARTERKIT.ch.docker.amazee.io',
          browser: [],
          reloadOnRestart: false,
          notify: false
        }
      }
    },
    vulcanize: {
      default: {
        options: {
          inlineScripts: true,
          inlineCss: true,
          stripExcludes: false,
          stripComments: true
        },
        files: {
          'dist/polymer/build.html': 'polymer/index.html',
        },
      },
    },
    webpack: {
      test: {
        entry: './js/main.js',
        output: { path: __dirname, filename: 'dist/js/main.js' },
        module: {
          loaders: [
            {
              test: /.js?$/,
              exclude: ['bower_components', 'node_modules'],
              loader: 'babel',
              devtool: 'inline-source-map',
              query: {
                presets: ['es2015'],
                cacheDirectory: true,
                // sourceMap: true
              },
            },
          ],
        },
      },
    },
  });

  grunt.registerTask('default', [
    'svgmin',
    'svg2png',
    'favicons',
    // 'svg_sprite',
    'sass',
    'px_to_rem',
    'autoprefixer',
    'webpack',
    // 'vulcanize',
    'browserSync',
    'watch'
  ]);
};
