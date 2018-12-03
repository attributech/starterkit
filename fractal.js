const pkg = require('./package.json');
const fractal = require('@frctl/fractal').create();
const twigAdapter = require('@wondrousllc/fractal-twig-drupal-adapter');
const twig = twigAdapter({
  handlePrefix: '@components',
  importContext: true
});

const paths = {
  build: `${__dirname}/styleguide`,
  docs: `${__dirname}/docs`,
  components: `${__dirname}/components`,
  static: `${__dirname}/dist`,
};

fractal.set('project.title', pkg.name);
fractal.set('project.version', pkg.version);
fractal.set('project.author', pkg.author);

fractal.components.engine(twig);
fractal.components.set('default.preview', '@preview');
fractal.components.set('ext', '.twig');
fractal.components.set('path', paths.components);

fractal.components.set('resources', {
  scss: {
    label: 'SCSS',
    match: ['**/*.scss']
  },
  css: {
    label: 'CSS',
    match: ['**/*.css']
  },
  other: {
    label: 'Other Assets',
    match: ['**/*', '!**/*.scss', '!**.css']
  }
});

fractal.docs.set('path', paths.docs);

fractal.web.set('static.path', paths.static);
fractal.web.set('static.mount', 'themes/now/dist');
fractal.web.set('builder.dest', paths.build);

module.exports = fractal;
