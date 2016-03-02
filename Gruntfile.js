'use strict';

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

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
      images: 'dist/css'
    }
  };

  grunt.initConfig({
    watch: {
      images: {
        files: 'images/*',
        tasks: ['svg_sprite', 'notify:images']
      },
      css: {
        files: 'sass/**/*.scss',
        tasks: ['sass', 'px_to_rem', 'autoprefixer', 'notify:styles']
      },
      scripts: {
        files: ['js/**/*.js', 'js/**/*.html', 'bower_components/**/*.js'],
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
    svg_sprite: {
      dist: {
        src: [directoriesConfig.src.images + '/*.svg'],
        dest: directoriesConfig.dist.images,

        // Target options
        options: {
          mode: {
            view: {
              dest: '',
              bust: false,
              sprite: 'sprite.svg',
              render: {
                scss: {
                  dest: '../../sass/base/_sprite.scss'
                }
              }
            }
          },
          shape: {
            spacing: {
              //padding: 100
            }
          }
        }
      }
    },
    sass: {
      dist: {
        options: {

          style: 'expanded'
        },
        files: {
          'dist/css/styles.css': 'sass/styles.scss'
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
          proxy: 'd8_10.local1.vagrant.amazee.io',
          browser: ["google chrome"],
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
          'dist/polymer/build/build.html': 'polymer/index.html'
        },
      },
    },
    webpack: {
      test: {
        entry: './js/script.js',
        output: { path: __dirname, filename: 'dist/js/script.js' },
        module: {
          loaders: [
            {
              test: /.js?$/,
              loader: 'babel-loader',
              exclude: /node_modules/,
              query: {
                presets: ['es2015']
              }
            }
          ]
        }
      }
    }
  });

  grunt.registerTask('default', [
    'browserSync',
    'watch'
  ]);
};
