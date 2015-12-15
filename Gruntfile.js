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
        files: ['js/**/*.js', 'js/**/*.html'],
        tasks: ['notify:scripts']
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
                  dest: directoriesConfig.dist.spriteFile
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
          require: [
            'susy',
            'breakpoint',
            'breakpoint-slicer'
          ],
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
          proxy: 'd8_9.local1.vagrant.amazee.io',
          browser: ["google chrome"],
          reloadOnRestart: false,
          notify: false
        }
      }
    }
  });

  grunt.registerTask('default', [
    'browserSync',
    'watch'
  ]);
};

